from fastapi import FastAPI, Depends
import uvicorn

from sqlalchemy.orm import Session

from models import CreateTransactionContext
from db import get_db, PendingTransaction, Base, engine
import util


app = FastAPI(
    title="LASSCoin Backend",
    version="a1.0",
    description="API Backend to process LASSCoin transactions.",
)

Base.metadata.create_all(bind=engine)


@app.post("/api/transactions/")
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


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=5000, reload=True)
