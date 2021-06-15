from db import PendingTransaction  # , Transactions


def get_max_height(db):
    return db.query(PendingTransaction).count()  # + db.query(Transactions)


def serialize_transaction(data):
    x = data.__dict__
    x.pop("_sa_instance_state")
    x["time"] = int(x["time"].timestamp())
    return x
