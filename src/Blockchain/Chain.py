from .TransactionBlock import TransactionBlock


def clamp(x, MAX, MIN):
    return min(MAX, max(x, MIN))


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
        return chain

    def add_block(self, block):
        assert isinstance(block, TransactionBlock)
        assert block.height == len(self.blocks)
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

    def create_transaction(ctx):
        # TO-DO
        pass


if __name__ == "__main__":
    x = BlockChain.create(1)
    print(x.__dict__)
    print(TransactionBlock)
