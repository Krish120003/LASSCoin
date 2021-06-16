from util import check_hash, build_binary_block_data
from pydantic import BaseModel, validator
from KeyManager import verify

from db import get_db, PendingTransaction


class CreateTransactionContext(BaseModel):
    sender: str
    target: str
    value: float
    uuid: str
    signature: str

    @validator("uuid")
    def verify_uniqueness(cls, v, values):
        db = next(get_db())
        res = db.query(PendingTransaction).filter_by(uuid=v).all()
        if res:
            raise ValueError("Transaction Exists")
        return v

    @validator("signature")
    def verify_legitamicy(cls, v, values):
        msg = f'{values.get("uuid")}|{values.get("sender")}|{values.get("target")}|{values.get("value"):.15f}'
        if not verify(values.get("sender"), msg, v):
            raise ValueError("Invalid Signature")
        return v


class MinedTransactionData(BaseModel):
    uuid: str
    height: int
    time: int

    sender: str
    target: str
    value: float
    signature: str

    prev_hash: str
    miner: str

    nonce: int

    @validator("nonce")
    def verify_nonce(cls, v, values):
        values["nonce"] = v
        if not check_hash(build_binary_block_data(values)):
            raise ValueError("Invalid block hash.")
        return v
