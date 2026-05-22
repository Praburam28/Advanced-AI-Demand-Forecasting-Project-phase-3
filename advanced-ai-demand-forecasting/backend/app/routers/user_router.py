from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.user_schema import UserResponse, UserUpdateRequest
from app.services.user_service import (
    get_all_users_service,
    get_user_by_id_service,
    update_user_service,
    delete_user_service
)
from app.utils.permissions import require_roles

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/", response_model=list[UserResponse])
def get_all_users(
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin"]))
):
    return get_all_users_service(db)


@router.get("/{user_id}", response_model=UserResponse)
def get_user_by_id(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin"]))
):
    return get_user_by_id_service(db, user_id)


@router.put("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int,
    data: UserUpdateRequest,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin"]))
):
    return update_user_service(db, user_id, data)


@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin"]))
):
    return delete_user_service(db, user_id)