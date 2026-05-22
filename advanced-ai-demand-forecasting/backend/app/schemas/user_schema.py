from pydantic import BaseModel, EmailStr


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    is_active: bool

    class Config:
        from_attributes = True


class UserUpdateRequest(BaseModel):
    full_name: str | None = None
    role: str | None = None
    is_active: bool | None = None