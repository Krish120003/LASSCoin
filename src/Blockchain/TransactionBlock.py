import datetime
from hashlib import sha256
from ... import KeyManager

print(KeyManager.sign)

class TransactionBlock:
    def __init__(self, height, previous_hash, sender_address, target_address, value, signature):
        pass

    def verify_signature(self):
        pass

    def hash(self):
        pass
