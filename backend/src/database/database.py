from sqlmodel import create_engine, Session, SQLModel
from ..config import settings
import os

# Use SQLite for development, PostgreSQL for production
DATABASE_URL = settings.database_url

# Create engine
engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    """Create database tables"""
    SQLModel.metadata.create_all(engine)

def get_session():
    """Get database session"""
    with Session(engine) as session:
        yield session