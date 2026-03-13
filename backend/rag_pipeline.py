import logging
from pathlib import Path
from collections import OrderedDict

from resume_loader import load_resume
from claude_client import generate_answer
from config import RESUME_PATH, MAX_CACHE_SIZE

logger = logging.getLogger(__name__)

# Store resume text in memory
_resume_text: str = ""


class QueryCache:
    def __init__(self, max_size: int = MAX_CACHE_SIZE):
        self._cache: OrderedDict[str, dict] = OrderedDict()
        self._max_size = max_size

    def get(self, key: str):
        if key in self._cache:
            self._cache.move_to_end(key)
            logger.info(f"Cache hit: '{key[:50]}'")
            return self._cache[key]
        return None

    def put(self, key: str, value: dict):
        self._cache[key] = value
        if len(self._cache) > self._max_size:
            self._cache.popitem(last=False)

    def clear(self):
        self._cache.clear()


cache = QueryCache()


def initialize_rag(resume_path: Path = RESUME_PATH):
    global _resume_text
    logger.info("Loading resume...")
    _resume_text = load_resume(resume_path)
    logger.info(f"Resume loaded: {len(_resume_text)} chars")


def reload_resume(resume_path: Path = RESUME_PATH):
    logger.info("Reloading resume...")
    cache.clear()
    initialize_rag(resume_path)
    logger.info("Resume reloaded successfully")


def ask(question: str) -> dict:
    normalized = question.strip().lower()
    cached = cache.get(normalized)
    if cached:
        return cached

    answer = generate_answer(question, _resume_text)

    response = {"question": question, "answer": answer, "sources": []}
    cache.put(normalized, response)
    return response
