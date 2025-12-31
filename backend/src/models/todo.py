from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime
import uuid
from .user import User

class TodoBase(SQLModel):
    content: str
    completed: bool = False
    user_id: uuid.UUID = Field(foreign_key="user.id")

class Todo(TodoBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    content: str = Field(nullable=False)
    completed: bool = Field(default=False)
    user_id: uuid.UUID = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship to user
    user: User = Relationship(back_populates="todos")

class TodoCreate(SQLModel):
    content: str
    completed: bool = False

class TodoRead(TodoBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

class TodoUpdate(SQLModel):
    content: Optional[str] = None
    completed: Optional[bool] = None