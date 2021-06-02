from .TransactionBlock import TransactionBlock
from .Chain import BlockChain
from .Context import Context

import pickle


def save_chain_to_file(chain, path):
    pickle.dump(chain, open(path, "wb"))


def load_chain_from_file(path):
    chain = pickle.load(open(path, "rb"))
    return chain
