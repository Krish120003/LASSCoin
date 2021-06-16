from db import PendingTransaction  # , Transactions
from hashlib import sha256


def get_max_height(db):
    return db.query(PendingTransaction).count()  # + db.query(Transactions)


def serialize_transaction(data):
    x = data.__dict__
    x.pop("_sa_instance_state")
    x["time"] = int(x["time"].timestamp())
    return x


def build_binary_block_data(data):
    res = ""
    res += str(data["nonce"])
    res += str(data["height"])
    res += str(data["time"])
    res += str(data["uuid"])
    res += str(data["value"])
    res += str(data["sender"])
    res += str(data["target"])
    res += str(data["prev_hash"])
    res += str(data["miner"])
    res += str(data["signature"])
    return res.encode("utf-8")


def check_hash(block_data, difficulty=5):
    h = sha256()
    h.update(block_data)
    hash = h.hexdigest()
    return hash.startswith("0" * difficulty)
