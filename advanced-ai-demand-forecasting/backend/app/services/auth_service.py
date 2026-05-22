from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth_schema import RegisterRequest, LoginRequest
from app.utils.security import hash_password, verify_password
from app.utils.jwt_handler import create_access_token


def register_user(data: RegisterRequest, db: Session):
    existing_user = db.query(User).filter(User.email == data.email).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    allowed_roles = ["Super Admin", "Analyst", "Viewer"]

    if data.role not in allowed_roles:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid role"
        )

    user = User(
        full_name=data.full_name,
        email=data.email,
        password=hash_password(data.password),
        role=data.role
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def login_user(data: LoginRequest, db: Session):
    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if not verify_password(data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "sub": user.email,
            "role": user.role
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role,
        "full_name": user.full_name
    }