import logging
import sys
import threading
from contextlib import asynccontextmanager

from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from config import HOST, PORT, FRONTEND_URL, LOG_LEVEL
from rag_pipeline import initialize_rag, reload_resume, ask

rag_ready = threading.Event()

logging.basicConfig(
    level=getattr(logging, LOG_LEVEL),
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
logger = logging.getLogger(__name__)


def _init_rag_background():
    try:
        initialize_rag()
        rag_ready.set()
        logger.info("RAG pipeline ready")
    except Exception as e:
        logger.error(f"RAG init failed: {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting AI Resume Assistant...")
    threading.Thread(target=_init_rag_background, daemon=True).start()
    logger.info("Server accepting connections (RAG loading in background)")
    yield
    logger.info("Shutting down")


app = FastAPI(
    title="AI Portfolio Assistant - Sonu Kumar",
    description="RAG-powered AI assistant for Sonu Kumar's portfolio",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://*.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AskResponse(BaseModel):
    question: str
    answer: str
    sources: list[str]


@app.get("/ask", response_model=AskResponse)
async def ask_question(q: str = Query(..., min_length=1, description="Your question")):
    if not rag_ready.is_set():
        raise HTTPException(status_code=503, detail="AI model is still loading. Please try again in a moment.")
    logger.info(f"Query: {q}")
    try:
        result = ask(q)
        return AskResponse(**result)
    except Exception as e:
        logger.error(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to process your question.")


@app.post("/reload-resume")
async def reload():
    try:
        reload_resume()
        return {"status": "ok", "message": "Resume reloaded and embeddings rebuilt."}
    except Exception as e:
        logger.error(f"Reload error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health():
    return {"status": "ok", "service": "ai-portfolio-assistant"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=HOST, port=PORT, reload=True)
