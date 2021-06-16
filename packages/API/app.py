from fastapi import FastAPI, Depends, Response, status
import uvicorn

from sqlalchemy.orm import Session

import datetime

from models import CreateTransactionContext, MinedTransactionData
from db import get_db, Base, engine, Transaction, PendingTransaction
import util

app = FastAPI(
    title="LASSCoin Backend",
    version="a1.0",
    description="API Backend to process LASSCoin transactions.",
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


@app.post("/api/transactions/", status_code=202)
def create_transaction(data: CreateTransactionContext, db: Session = Depends(get_db)):
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


@app.get("/api/miner/")
def miner_block_request(db: Session = Depends(get_db)):
    """
    Returns the oldest pending transaction to be mined.
    """
    current_transaction = (
        db.query(PendingTransaction).order_by(PendingTransaction.time).first()
    )
    data = util.serialize_transaction(current_transaction)
    # Add prev hash if genesis block
    if data["height"] == 0:
        data["prev_hash"] = "GENESIS"
    return data


@app.post("/api/miner/", status_code=200)
def miner_block_mined(
    data: MinedTransactionData,
    db: Session = Depends(get_db),
    response: Response = Response,
):
    """
    Endpoint for miners to submit verified transactions.
    """
    print(data)
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
            time=datetime.datetime.utcfromtimestamp(data.time),
            miner=data.miner,
            nonce=data.nonce,
            prev_hash=data.prev_hash,
        )
    )

    db.delete(current_transaction)
    db.commit()

    return data


@app.get("/api/miner/difficulty")
def difficulty():
    return 5


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=5000, reload=True)
