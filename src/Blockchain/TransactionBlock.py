import arrow
from hashlib import sha256


class TransactionBlock:
    def __init__(
        self, height, previous_hash, sender_address, target_address, value, signature
    ):
        self.nonce = 0
        self.timestamp = arrow.now().timestamp

        self.height = height
        self.previous_hash = previous_hash

        self.sender_address = sender_address
        self.target_address = target_address
        self.transaction_value = value
        self.signature = signature

        self.verify_signature()

    def create_context(self):
        pass

    def verify_signature(self):
        pass

    def hash(self):
        pass
