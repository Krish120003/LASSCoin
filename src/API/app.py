from fastapi import FastAPI
import uvicorn

from .models import CreateTransactionContext

app = FastAPI()

@app.post("/api/transactions/")
def create_transaction(x: CreateTransactionContext):
    print(x)
    return {}

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=5000, reload=True)