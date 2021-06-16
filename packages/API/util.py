from db import PendingTransaction, Transaction
from hashlib import sha256


def get_max_height(db):
    return db.query(PendingTransaction).count() + db.query(Transaction).count()


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


def get_hash(block_data):
    h = sha256()
    h.update(block_data)
    return h.hexdigest()


def check_hash(block_data, difficulty=1):
    hash = get_hash(block_data)
    return hash.startswith("0" * difficulty)


def get_prev_hash(db):
    latest_t = db.query(Transaction).order_by(Transaction.height.desc()).first()
    data = build_binary_block_data(
        {
            "target": latest_t.target,
            "uuid": latest_t.uuid,
            "signature": latest_t.signature,
            "value": latest_t.value,
            "height": latest_t.height,
            "sender": latest_t.sender,
            "time": int(latest_t.time.timestamp()),
            "prev_hash": latest_t.prev_hash,
            "miner": latest_t.miner,
            "nonce": latest_t.nonce,
        }
    )
    print("PREV HASH DATA IS: " + data.decode("utf-8"))
    return get_hash(data)
