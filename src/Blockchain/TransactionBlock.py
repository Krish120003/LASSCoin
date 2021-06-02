import arrow
from hashlib import sha256
from .Context import Context


class TransactionBlock:
    """
    A class used to for represent
    transactions as blocks in blockchains

    ...

    Attributes
    ----------
    nonce : int

    timestamp : arrow datetime object
        Stores the timestamp of the block

    height : int
        Stores the height of the block

    context : Context
        Stores the transaction context

    previous_hash : str
        Stores the previous hash of the block

    Methods
    -------
    hash()
        hashes the block

    export_block()
        exports the block to a dict
    """

    def __init__(
        self,
        height,
        previous_hash,
        sender_address,
        target_address,
        value,
        signature,
        nonce=None,
        timestamp=None,
    ):
        self.nonce = nonce if nonce else 0
        self.timestamp = arrow.get(timestamp) if timestamp else arrow.now()

        self.height = height
        self.previous_hash = previous_hash

        self.context = Context(sender_address, target_address, value, signature)

        # self.context.verify()

    def hash(self):
        h = sha256()
        h.update(str(self.export_block()).encode("utf-8"))
        return h.hexdigest()

    def export_block(self):
        # Transaction Info
        context = dict(self.context.__dict__)  # wrap in dict for deep copy
        context.pop("_ctx")
        # Block Info
        data = {
            "nonce": self.nonce,
            "timestamp": int(self.timestamp.timestamp()),
            "height": self.height,
            "previous_hash": self.previous_hash,
        } | context
        return data


def load_block(data):
    try:
        block = TransactionBlock(
            data["height"],
            data["previous_hash"],
            data["sender"],
            data["target"],
            data["amount"],
            data["signature"],
            data["nonce"],
            data["timestamp"],
        )
    except KeyError:
        raise Exception("Incomplete Block Data.")
