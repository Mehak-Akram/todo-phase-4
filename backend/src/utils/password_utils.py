from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a hashed password"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash a plain password, truncating if longer than 72 bytes for bcrypt compatibility"""
    # Bcrypt has a 72-byte password length limit
    if len(password.encode('utf-8')) > 72:
        password = password[:72]  # Truncate to 72 characters

    return pwd_context.hash(password)