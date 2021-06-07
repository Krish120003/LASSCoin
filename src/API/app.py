from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

class Test(BaseModel):
    name: str

@app.post("/api/transactions/")
def create_transaction(x: Test):
    print(x)
    return {}

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=5000, reload=True)