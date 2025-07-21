# app/utils/logging.py

import logging
import sys

def configure_logging(log_level=logging.INFO, log_file=None):
    handlers = [logging.StreamHandler(sys.stdout)]
    if log_file is not None:
        handlers.append(logging.FileHandler(log_file))
    logging.basicConfig(
        level=log_level,
        format="[%(asctime)s] [%(levelname)s] %(name)s: %(message)s",
        handlers=handlers
    )

def get_logger(name=None):
    return logging.getLogger(name)
