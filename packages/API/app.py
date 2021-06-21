from fastapi import FastAPI, Depends, Response, status, Request
from fastapi.middleware.cors import CORSMiddleware

import uvicorn

from sqlalchemy.orm import Session

import datetime
from typing import Optional

from models import (
    CreateTransactionContext,
    MinedTransactionData,
    AddressContext,
)
from db import get_db, Base, engine, Transaction, PendingTransaction
import util

app = FastAPI(
    title="LASSCoin Backend",
    version="a1.0",
    description="API Backend to process LASSCoin transactions.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if not engine.has_table(Transaction.__tablename__) and not engine.has_table(
    PendingTransaction.__tablename__
):
    Base.metadata.create_all(bind=engine)
    db = next(get_db())
    db.add(
        PendingTransaction(
            height=0,
            uuid="GENESIS",
            sender="GENESIS",
            target="GENESIS",
            value=0,
            signature="GENESIS",
        )
    )
    db.commit()


@app.get("/api/transactions/", status_code=200)
async def get_transactions(
    next: Optional[str] = None,
    db: Session = Depends(get_db),
    response: Response = Response,
):
    if next:
        start_point = db.query(Transaction).filter_by(uuid=next).first()
        if not start_point:
            response.status_code = status.HTTP_404_NOT_FOUND
            return {"message": "Invalid 'next' param"}
        transactions = (
            db.query(Transaction)
            .filter(Transaction.height < start_point.height)
            .order_by(Transaction.height.desc())
            .all()[:10]
        )
    else:
        transactions = (
            db.query(Transaction).order_by(Transaction.height.desc()).all()[:10]
        )
    next = transactions[-1].uuid

    return {
        "data": [util.serialize_transaction(t) for t in transactions],
        "next": next,
    }


@app.post("/api/transactions/", status_code=202)
def create_transaction(
    data: CreateTransactionContext,
    db: Session = Depends(get_db),
    response: Response = Response,
):
    if util.get_balance(db, data.sender) < data.value:
        response.status_code = status.HTTP_403_FORBIDDEN
        return {"message": "Not enough balance."}
    height = util.get_max_height(db)
    db.add(
        PendingTransaction(
            height=height,
            sender=data.sender,
            target=data.target,
            value=data.value,
            signature=data.signature,
            uuid=data.uuid,
        )
    )
    db.commit()
    return {"message": "created, in queue"}


@app.get("/api/transactions/balance/", status_code=200)
def account_balance(data: AddressContext, db: Session = Depends(get_db)):
    try:
        balance = util.get_balance(db, data.address)
    except Exception as e:
        print(e)
        return {"balance": "N/A"}
    return {"balance": balance}


@app.get("/api/transactions/height/")
def chain_height(db: Session = Depends(get_db)):
    return {"height": db.query(Transaction).count()}


@app.get("/api/transactions/pending/")
def pending_blocks(db: Session = Depends(get_db)):
    return {"pending": db.query(PendingTransaction).count()}


@app.get("/api/miner/")
def miner_block_request(db: Session = Depends(get_db)):
    """
    Returns the oldest pending transaction to be mined.
    """
    current_transaction = (
        db.query(PendingTransaction).order_by(PendingTransaction.time).first()
    )
    if current_transaction == None:
        return {"message": "No pending transactions."}
    data = util.serialize_transaction(current_transaction)
    # Add prev hash if genesis block
    if data["height"] == 0:
        data["prev_hash"] = "GENESIS"
    else:
        data["prev_hash"] = util.get_prev_hash(db)
    return data


@app.get("/api/miner/difficulty/")
def difficulty():
    return 4


@app.post("/api/miner/", status_code=200)
def miner_block_mined(
    data: MinedTransactionData,
    db: Session = Depends(get_db),
    response: Response = Response,
):
    """
    Endpoint for miners to submit verified transactions.
    """
    # Check if this transaction is the latest in the queue.
    current_transaction = (
        db.query(PendingTransaction).order_by(PendingTransaction.time).first()
    )
    if (
        not current_transaction.uuid == data.uuid
        or not current_transaction.signature == data.signature
    ):
        response.status_code = status.HTTP_403_FORBIDDEN
        return {"message": "false submission"}

    # Move transaction to confirmed db
    db.add(
        Transaction(
            height=data.height,
            uuid=data.uuid,
            sender=data.sender,
            target=data.target,
            value=data.value,
            signature=data.signature,
            time=datetime.datetime.fromtimestamp(data.time),
            miner=data.miner,
            nonce=data.nonce,
            prev_hash=data.prev_hash,
        )
    )

    db.delete(current_transaction)
    db.commit()

    return data


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=5000, reload=True)
