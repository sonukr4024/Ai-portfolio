import os
from pathlib import Path

# API Keys
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
BACKEND_DIR = Path(__file__).resolve().parent

# Check multiple data locations (Render deploys from backend/ root)
_data_candidates = [
    BASE_DIR / "data",           # Local dev: project-root/data/
    BACKEND_DIR / "data",        # Render: backend/data/
    Path("/data"),               # Docker volume
]
DATA_DIR = next((d for d in _data_candidates if d.exists()), BASE_DIR / "data")
RESUME_PATH = DATA_DIR / "resume.txt"

# RAG Settings
CHUNK_SIZE = 500
CHUNK_OVERLAP = 50
SIMILARITY_THRESHOLD = 0.05
TOP_K_RESULTS = 5

# Claude Settings
CLAUDE_MODEL = "claude-sonnet-4-20250514"
MAX_TOKENS = 1024

# Server
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# Cache
CACHE_TTL = 3600
MAX_CACHE_SIZE = 200

# Logging
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
