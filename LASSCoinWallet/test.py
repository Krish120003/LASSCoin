import KeyManager
from icecream import ic
import os

key = KeyManager.generate(1024)
#KeyManager.save_key(key, os.getcwd())
signature = KeyManager.sign(key,"hello")

# to verify
ic(KeyManager.verify(key.publickey(), "hello", signature))
ic(KeyManager.verify(key.publickey(), "hello1", signature))