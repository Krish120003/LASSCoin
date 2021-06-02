import datetime
from hashlib import sha256
import time


class Block:
    def __init__(self, number, previous_hash, data):
        self.nonce = 0
        self.timestamp = datetime.datetime.now()
        self.number = number
        self.data = data
        self.previous_hash = previous_hash
        self.next_block = None

    def hash(self):
        h = sha256()
        h.update(
            str(self.nonce).encode('utf-8') +
            str(self.number).encode('utf-8') +
            str(self.timestamp).encode('utf-8') +
            str(self.previous_hash).encode('utf-8') +
            str(self.data).encode('utf-8')
        )
        return h.hexdigest()

    def __str__(self):
        output = "+"*40 + "\n"
        output += "+" + " "*38 + "+"  "\n"
        output += "+" + f"Block #{self.number}".center(38, " ") + "+" + "\n"
        output += "+" + f"Nonce #{self.nonce}".center(38, " ") + "+" + "\n"
        output += "+" + \
            f"Timestamp {self.timestamp.timestamp()}".center(38,
                                                             " ") + "+" + "\n"
        output += "+" + " "*38 + "+"  "\n"
        output += "+"*40 + "\n"
        output += "+" + " "*38 + "+"  "\n"
        output += "+" + "Data".center(38, " ") + "+" + "\n"
        output += "+" + " "*38 + "+"  "\n"
        try:
            to_add_to_output = str(self.data)
        except Exception:
            to_add_to_output = str(type(self.data))

        chunks = [to_add_to_output[i:i+36]
                  for i in range(0, len(to_add_to_output), 36)]

        for item in chunks:
            output += "+" + item.center(38, " ") + "+" + "\n"

        output += "+" + " "*38 + "+"  "\n"
        output += "+"*40 + "\n"
        return output


class BlockChain:

    def __init__(self, intensity=15, verbose=True, starts=[0, 0, 0, 0, 0, 0, 0]):
        # Set some static limits
        self.difference = intensity
        self.max_nonce = 2**32
        self.target = 2 ** (256 - self.difference)

        self.origin = Block(0, 0x0, "Origin")
        self.current_block = self.origin

        self.verbose = verbose

        self.starts = starts

    def add_data(self, data):
        """
        Parameters
        ----------
        data : any object
            the data used to create the next block
        """
        temp_block = Block(
            self.current_block.number + 1,
            self.current_block.hash(),
            data)

        self.current_block.next_block = temp_block
        self.current_block = self.current_block.next_block

        starting_time = time.perf_counter()
        for i in range(self.starts[self.current_block.number - 1]-1, self.max_nonce):
            if int(self.current_block.hash(), 16) < self.target:
                break
            else:
                self.current_block.nonce = i
            if self.verbose:
                print(f"Block #{self.current_block.number} | Nonce {str(self.current_block.nonce).ljust(7)} | Hash {self.current_block.hash()} | Time {int((time.perf_counter() - starting_time))} seconds", end="\r")

        return self.current_block.nonce

    def set_verbose(self, value):
        self.verbose = value


if __name__ == "__main__":

    import arrow

    starts = [0, 0, 0, 0, 0, 0, 0]

    chain = BlockChain(17, True, starts)
    starts[0] = chain.add_data("Hello")
    starts[1] = chain.add_data("This is a random string")

    # Add random data here
    starts[2] = chain.add_data(False)
    starts[3] = chain.add_data(1.0001)
    starts[4] = chain.add_data(arrow.now())
    starts[5] = chain.add_data(
        ['Car', 'Bad', 'Box', 'Num', 'Key', 'Val', 'Ray', 'Cpp', 'San'])
    starts[6] = chain.add_data({
        "brand": "Ford",
        "model": "Mustang",
        "year": 1964
    })

    if True:
        print("Printing Blockchain in 10 seconds...")
        time.sleep(10)
        cursor = chain.origin
        while cursor:
            print(cursor)
            cursor = cursor.next_block
            time.sleep(2)
