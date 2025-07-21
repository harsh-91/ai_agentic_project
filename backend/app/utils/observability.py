# app/utils/observability.py

import time
import psutil

_METRICS = {"start_time": time.time()}

def get_uptime_seconds():
    return int(time.time() - _METRICS["start_time"])

def system_metrics():
    return {
        "uptime_seconds": get_uptime_seconds(),
        "cpu_percent": psutil.cpu_percent(interval=0.1),
        "memory_percent": psutil.virtual_memory().percent,
    }

def trace_event(event: str, detail: dict = None):
    logger = __import__("app.utils.logging", fromlist=["get_logger"]).get_logger("trace")
    logger.info(f"TRACE [{event}] {detail or ''}")
