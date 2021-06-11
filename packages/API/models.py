from pydantic import BaseModel, validator
from KeyManager import verify


class CreateTransactionContext(BaseModel):
    sender: str
    target: str
    value: float
    signature: str
    uuid: str

    @validator("signature")
    def verify_legitamicy(cls, v, values):
        msg = f'{values.get("uuid")}|{values.get("sender")}|{values.get("target")}|{values.get("value"):.15f}'
        if not verify(values.get("sender"), msg, v):
            raise ValueError("Invalid Signature")
        return v
