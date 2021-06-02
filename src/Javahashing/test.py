from hashlib import sha256
import time
DIFFICULTY = 16
PREFIX = "0"*DIFFICULTY

previoushash = "0000047810ddbee0ae74f89fc09791ce0fd5ed4cf0926934790f545b32f8f592"
bn = "5"
nonce = 0

        
t=time.time()
for i in range(2**32):

    x = bn + previoushash + str(nonce)
    h = sha256()
    h.update(x.encode('utf-8'))
    y = h.hexdigest()
    if i % 50000 == 0:
        print(f"{nonce} | {y} | {time.time() - t:.2f}s", end="\r")
    if y.startswith(PREFIX):
        print(f"\nFound at nonce {nonce} with hash {y} in {time.time() - t}s")
        break
    nonce += 1