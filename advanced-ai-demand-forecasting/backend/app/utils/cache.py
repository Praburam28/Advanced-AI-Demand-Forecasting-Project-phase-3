import os
import time
import json
import redis
from dotenv import load_dotenv

load_dotenv()

memory_cache = {}

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_DB = int(os.getenv("REDIS_DB", 0))
CACHE_TTL_SECONDS = int(os.getenv("CACHE_TTL_SECONDS", 60))

try:
    redis_client = redis.Redis(
        host=REDIS_HOST,
        port=REDIS_PORT,
        db=REDIS_DB,
        decode_responses=True
    )
    redis_client.ping()
    REDIS_AVAILABLE = True
except Exception:
    redis_client = None
    REDIS_AVAILABLE = False


def set_cache(key: str, value, ttl: int = CACHE_TTL_SECONDS):
    if REDIS_AVAILABLE:
        redis_client.setex(
            key,
            ttl,
            json.dumps(value, default=str)
        )
        return

    memory_cache[key] = {
        "value": value,
        "expires_at": time.time() + ttl
    }


def get_cache(key: str):
    if REDIS_AVAILABLE:
        data = redis_client.get(key)
        if data:
            return json.loads(data)
        return None

    item = memory_cache.get(key)

    if not item:
        return None

    if time.time() > item["expires_at"]:
        del memory_cache[key]
        return None

    return item["value"]


def clear_cache(key: str | None = None):
    if REDIS_AVAILABLE:
        if key:
            redis_client.delete(key)
        else:
            redis_client.flushdb()
        return

    if key:
        memory_cache.pop(key, None)
    else:
        memory_cache.clear()