from fastapi import FastAPI, Depends
import uvicorn

from sqlalchemy.orm import Session

from models import CreateTransactionContext
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
    return util.serialize_transaction(current_transaction)


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=5000, reload=True)
