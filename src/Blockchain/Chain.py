from .TransactionBlock import TransactionBlock

from hashlib import sha256
import arrow


def clamp(x, MAX, MIN):
    return min(MAX, max(x, MIN))


class GenesisBlock:
    def __init__(self):
        self.height = 0
        self.timestamp = arrow.now()

    def hash(self):
        h = sha256()
        h.update(str(self.__dict__).encode("utf-8"))
        return h.hexdigest()


class BlockChain:
    def __init__(self, difficulty):
        self.difficulty = difficulty

        # Constants
        self.max_nonce = 2 ** 32
        self.target = "0" * self.difficulty
        self.blocks = []
        pass

    def create(difficulty=1):
        chain = BlockChain(clamp(difficulty, 63, 1))
        # Create genesis block
        chain.blocks.append(GenesisBlock())
        return chain

    def add_block(self, block, miner=None):
        assert isinstance(block, TransactionBlock)
        assert block.height == len(self.blocks)
        block.miner = miner
        self.blocks.sort(key=lambda block: block.height)
        for i in range(self.max_nonce):
            # Hash Block
            hash = block.hash()
            if hash.startswith(self.target):
                # Nonce found
                self.blocks.append(block)
                return

            # Increase Nonce
            block.nonce += 1

        raise Exception("No valid block nonce found.")

    def create_transaction(self, ctx):
        block = TransactionBlock(
            len(self.blocks),
            self.blocks[-1].hash(),
            ctx.sender,
            ctx.target,
            ctx.amount,
            ctx.signature,
        )
        return block
