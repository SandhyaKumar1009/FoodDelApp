# Cache Layer - Simple in-memory cache (Redis simulation)
# In production, use actual Redis client
import time
from typing import Any, Optional

# Simple in-memory cache store
_cache_store = {}


def cache_get(key: str) -> Optional[Any]:
    """
    Get value from cache
    Returns None if key doesn't exist or has expired
    """
    if key not in _cache_store:
        return None
    
    entry = _cache_store[key]
    
    # Check if expired
    if entry['expires_at'] and time.time() > entry['expires_at']:
        del _cache_store[key]
        return None
    
    return entry['value']


def cache_set(key: str, value: Any, ttl: int = 300):
    """
    Set value in cache with TTL (time to live) in seconds
    If ttl is 0 or None is passed as value, delete the key
    """
    if value is None or ttl == 0:
        if key in _cache_store:
            del _cache_store[key]
        return
    
    expires_at = time.time() + ttl if ttl > 0 else None
    
    _cache_store[key] = {
        'value': value,
        'expires_at': expires_at
    }


def cache_clear():
    """Clear all cache entries"""
    _cache_store.clear()


# Production Redis implementation (commented out):
"""
import redis
import json
import os

redis_client = redis.from_url(os.getenv('REDIS_URL', 'redis://localhost:6379/0'))

def cache_get(key: str) -> Optional[Any]:
    value = redis_client.get(key)
    if value:
        return json.loads(value)
    return None

def cache_set(key: str, value: Any, ttl: int = 300):
    if value is None:
        redis_client.delete(key)
    else:
        redis_client.setex(key, ttl, json.dumps(value))

def cache_clear():
    redis_client.flushdb()
"""
