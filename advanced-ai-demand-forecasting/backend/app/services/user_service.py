from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user_schema import UserUpdateRequest


def get_all_users_service(db: Session):
    return db.query(User).order_by(User.id.desc()).all()


def get_user_by_id_service(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return user


def update_user_service(db: Session, user_id: int, data: UserUpdateRequest):
    user = get_user_by_id_service(db, user_id)

    allowed_roles = ["Super Admin", "Analyst", "Viewer"]

    if data.full_name is not None:
        user.full_name = data.full_name

    if data.role is not None:
        if data.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid role"
            )
        user.role = data.role

    if data.is_active is not None:
        user.is_active = data.is_active

    db.commit()
    db.refresh(user)

    return user


def delete_user_service(db: Session, user_id: int):
    user = get_user_by_id_service(db, user_id)

    db.delete(user)
    db.commit()

    return {"message": "User deleted successfully"}