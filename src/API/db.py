from datetime import datetime
import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from sqlalchemy import Column, Integer, String, Float, DateTime

SQLALCHEMY_DATABASE_URI = os.getenv("DB_CONN")

engine = create_engine(SQLALCHEMY_DATABASE_URI)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class PendingTransaction(Base):
    __tablename__ = "PendingTransactions"

    height = Column(Integer, primary_key=True,  nullable=False, unique=True)

    sender = Column(String, nullable=False)
    target = Column(String, nullable=False)
    value = Column(Float, nullable=False)
    signature = Column(String, nullable=False)

    time = Column(DateTime, nullable=False, unique=False, default=datetime.utcnow)

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()