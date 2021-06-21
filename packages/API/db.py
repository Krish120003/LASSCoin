from datetime import datetime
import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from sqlalchemy import Column, Integer, String, Float, DateTime

SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

engine = create_engine(SQLALCHEMY_DATABASE_URI)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class PendingTransaction(Base):
    __tablename__ = "PendingTransactions"

    height = Column(Integer, nullable=False, unique=True)
    uuid = Column(String, primary_key=True, nullable=False, unique=True)

    sender = Column(String, nullable=False)
    target = Column(String, nullable=False)
    value = Column(Float, nullable=False)
    signature = Column(String, nullable=False)

    time = Column(DateTime, nullable=False, unique=False, default=datetime.utcnow)


class Transaction(Base):
    __tablename__ = "Transactions"

    height = Column(Integer, nullable=False, unique=True)
    uuid = Column(String, primary_key=True, nullable=False, unique=True)

    sender = Column(String, nullable=False)
    target = Column(String, nullable=False)
    value = Column(Float, nullable=False)
    signature = Column(String, nullable=False)

    time = Column(DateTime, nullable=False, unique=False)

    miner = Column(String, nullable=False, unique=False)
    nonce = Column(Integer, nullable=False, unique=False)
    prev_hash = Column(String, nullable=False, unique=True)


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
