from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class TransactionBlock(db.Model):
    __tablename__ = "blocks"

    # Data for Server/Database
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # Block data
    nonce = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.Integer, nullable=False)
    height = db.Column(db.Integer, nullable=False)

    previous_hash = db.Column(db.String(64), nullable=False)
    sender_address = db.Column(db.String(64), nullable=False)
    target_address = db.Column(db.String(64), nullable=False)
    signature = db.Column(db.String(), nullable=False)

    transaction_amount = db.Column(db.Float(), nullable=False)
