from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.auth_schema import RegisterRequest, LoginRequest, TokenResponse
from app.schemas.user_schema import UserResponse
from app.services.auth_service import register_user, login_user
from app.dependencies import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register", response_model=UserResponse)
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    return register_user(data, db)


@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    return login_user(data, db)


@router.post("/login-json", response_model=TokenResponse)
def login_json(data: LoginRequest, db: Session = Depends(get_db)):
    return login_user(data, db)


@router.post("/token", response_model=TokenResponse)
def login_for_swagger(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    data = LoginRequest(
        email=form_data.username,
        password=form_data.password
    )

    return login_user(data, db)


@router.get("/me", response_model=UserResponse)
def get_me(current_user=Depends(get_current_user)):
    return current_user