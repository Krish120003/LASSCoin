import arrow
from hashlib import sha256
from .Context import Context


class TransactionBlock:
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
        pass

    def export_block(self):
        # Transaction Info
        context = self.context.__dict__
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
