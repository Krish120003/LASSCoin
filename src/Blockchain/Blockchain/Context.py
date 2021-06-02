from KeyManager import verify


class Context:
    def __init__(self, sender, target, amount, sign):
        self.sender = sender
        self.target = target
        self.amount = amount
        self.signature = sign

        self._ctx = {"sender": sender, "target": target, "amount": amount}

    def verify(self):
        if not verify(self.sender, str(self._ctx), self.signature):
            raise Exception(
                "Invalid Block Context. This block may be a forged block with malicious intent."
            )
