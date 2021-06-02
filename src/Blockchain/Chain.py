def clamp(x, MAX, MIN):
    return min(MAX, max(x, MIN))


class BlockChain:
    def __init__(self, difficulty):
        self.difficulty = difficulty

        # Constants
        self.max_nonce = 2 ** 32
        self.target = "0" * self.difficulty
        pass

    def create(difficulty=1):
        chain = BlockChain(clamp(difficulty, 31, 1))
        return chain


if __name__ == "__main__":
    x = BlockChain.create(1)
    print(x.__dict__)
