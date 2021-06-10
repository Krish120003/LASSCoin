from fastapi import FastAPI, Depends
import uvicorn

from sqlalchemy.orm import Session

from .models import CreateTransactionContext
from .db import get_db, PendingTransaction, Base, engine

height = 0

app = FastAPI(title="LASSCoin Backend", version="a1.0", description="API Backend to process LASSCoin transactions.")
Base.metadata.create_all(bind=engine)

@app.post("/api/transactions/")
def create_transaction(data: CreateTransactionContext, db: Session = Depends(get_db)):
    global height
    db.add(PendingTransaction(height=height, sender=data.sender, target=data.target, value=data.value, signature=data.signature))
    height += 1
    db.commit()

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=5000, reload=True)
