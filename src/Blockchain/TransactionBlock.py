import arrow
from hashlib import sha256
from . import Context


class TransactionBlock:
    def __init__(
        self, height, previous_hash, sender_address, target_address, value, signature
    ):
        self.nonce = 0
        self.timestamp = arrow.now().timestamp

        self.height = height
        self.previous_hash = previous_hash

        self.context = Context(sender_address, target_address, value, signature)

        self.context.verify()

    def create_context(self):
        pass

    def hash(self):
        pass
