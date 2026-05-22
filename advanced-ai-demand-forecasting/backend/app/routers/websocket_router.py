from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.utils.websocket_manager import manager

router = APIRouter(
    prefix="/ws",
    tags=["WebSocket"]
)


@router.websocket("/dashboard")
async def dashboard_websocket(websocket: WebSocket):
    await manager.connect(websocket)

    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)