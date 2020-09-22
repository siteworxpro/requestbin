import os

DEBUG = True if os.environ.get('DEBUG', '') is '1' else False
REALM = os.environ.get('REALM', 'local')

PORT_NUMBER = os.environ.get('PORT', 8000)
ROOT_URL = os.environ.get('ROOT_URL', 'http://localhost:8000')

ENABLE_CORS = True if os.environ.get('ENABLE_CORS', '1') is '1' else False
CORS_ORIGINS = os.environ.get('CORS_ORIGINS', '*')

FLASK_SESSION_SECRET_KEY = os.environ.get("SESSION_SECRET_KEY", "N1BKhJLnBqLpexOZdklsfDKFJDKFadsfs9a3r324YB7B73AglRmrHMDQ9RhXz35")

REDIS_HOST = os.environ.get('REDIS_HOST', '')
REDIS_PORT = int(os.environ.get('REDIS_PORT', 6379))
REDIS_PASSWORD = os.environ.get('REDIS_PASSWORD', None)
REDIS_DB = os.environ.get('REDIS_DB', 9)
REDIS_PREFIX = os.environ.get('REDIS_PREFIX', 'request_bin')

BIN_TTL = 48*3600
STORAGE_BACKEND = "requestbin.storage.memory.MemoryStorage" if REDIS_HOST is '' else "requestbin.storage.redis.RedisStorage"
MAX_RAW_SIZE = int(os.environ.get('MAX_RAW_SIZE', 1024*10))
IGNORE_HEADERS = []
MAX_REQUESTS = 20
CLEANUP_INTERVAL = 3600

BUGSNAG_KEY = ""
