from Crypto.PublicKey import RSA
from Crypto.Signature import pkcs1_15
from Crypto.Hash import SHA256

import os
import base64


def generate(nbits):
    """
    Simple wrapper to generate an RSA key.
    """
    return RSA.generate(nbits)


def save_key(key, path):
    """
    Saves the private key as a binary file.
    """
    with open(os.path.join(path, "private.key"), "wb") as f:
        f.write(key.export_key(pkcs=8))


def load_key(path):
    """
    Loads a private key from a binary file.
    """
    try:
        with open(path, "rb") as f:
            # Import File
            key = RSA.import_key(f.read())
    except:
        # Error
        raise Exception("Invalid Key or File Not Found")
    return key


def encode(data):
    """
    Encode binary data into a string
    using base64 encoding.
    """
    return base64.b64encode(data).decode("utf-8")


def decode(data):
    """
    Decode a string to binary data
    using base64 encoding.
    """
    return base64.b64decode(data)


def sign(priv_key, message):
    """
    Sign a message with the private key.
    """
    hash = SHA256.new(message.encode("utf-8"))
    signer = pkcs1_15.new(priv_key)
    signature = signer.sign(hash)
    return encode(signature)


def verify(public_key, message, signature):
    """
    Verify a message's integrity using a signature.
    """
    if type(public_key) == str:
        public_key = RSA.import_key(_parse_public_key(public_key))

    verifier = pkcs1_15.new(public_key)
    hash = SHA256.new(message.encode("utf-8"))
    try:
        verifier.verify(hash, decode(signature))
        return True
    except (ValueError, TypeError):
        return False


def _parse_public_key(line):
    y = [line[i : i + 64] for i in range(0, len(line), 64)]
    return "\n".join(["-----BEGIN PUBLIC KEY-----", *y, "-----END PUBLIC KEY-----"])
