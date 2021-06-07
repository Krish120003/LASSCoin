from fastapi import FastAPI
import uvicorn

from .models import CreateTransactionContext

app = FastAPI(title="LASSCoin Backend", version="a1.0", description="API Backend to process LASSCoin transactions.")

@app.post("/api/transactions/")
def create_transaction(x: CreateTransactionContext):
    print(x)
    return dict(x)

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=5000, reload=True)