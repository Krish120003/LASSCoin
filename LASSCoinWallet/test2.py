import KeyManager
from icecream import ic

k = KeyManager.load_key("private.key")
ic(k)