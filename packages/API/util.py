from db import PendingTransaction, # Transactions


def get_max_height(db):
    return db.query(PendingTransaction).count()  # + db.query(Transactions)
