from fastapi import APIRouter
import time
import psutil

router = APIRouter()

@router.get("/metrics")
async def metrics():
    # Basic example metrics; extend with real Prometheus integration as needed.
    cpu = psutil.cpu_percent(interval=0.1)
    mem = psutil.virtual_memory().percent
    return {
        "uptime_seconds": int(time.time() - psutil.boot_time()),
        "cpu_percent": cpu,
        "memory_percent": mem
    }

@router.get("/logs")
async def get_logs(lines: int = 50):
    try:
        with open("app.log", "r") as f:
            # Return last N lines of log file
            log_lines = f.readlines()[-lines:]
        return {"log_tail": log_lines}
    except FileNotFoundError:
        return {"log_tail": []}

@router.get("/traces")
async def traces():
    # Placeholder for distributed traces. Integrate with OpenTelemetry backend.
    return {
        "traces": [
            {"id": "trace1", "span": "UserRegistered", "status": "ok"},
            {"id": "trace2", "span": "ChatStarted", "status": "ok"}
        ]
    }

@router.get("/healthz")
async def healthz():
    return {"status": "ok"}
