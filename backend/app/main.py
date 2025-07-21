import logging
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s %(name)s %(message)s',
    handlers=[
        logging.FileHandler("app.log"),   # <<<<< THIS ADDS FILE LOGGING
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("ai-agent_app")
app = FastAPI()

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"REQ: {request.method} {request.url} headers={dict(request.headers)}")
    try:
        response = await call_next(request)
    except Exception as ex:
        logger.error(f"EXC: {request.method} {request.url} {ex}")
        return JSONResponse(status_code=500, content={"detail": "Internal error"})
    logger.info(f"RESP: {request.method} {request.url} code={response.status_code}")
    return response

@app.post("/audit/log-fe")
async def audit_log_fe(log: dict):
    logger.info(f"FRONTEND_LOG {log}")
    return {"ok": True}

# PUT logger.info/logger.error everywhere users register, login, upload, etc.
