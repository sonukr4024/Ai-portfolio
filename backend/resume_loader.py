import logging
from pathlib import Path

logger = logging.getLogger(__name__)


def load_resume(file_path: Path) -> str:
    suffix = file_path.suffix.lower()
    if suffix == ".txt":
        return _load_text(file_path)
    elif suffix == ".pdf":
        return _load_pdf(file_path)
    else:
        raise ValueError(f"Unsupported file format: {suffix}")


def _load_text(file_path: Path) -> str:
    logger.info(f"Loading text resume from {file_path}")
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()


def _load_pdf(file_path: Path) -> str:
    logger.info(f"Loading PDF resume from {file_path}")
    import PyPDF2
    text = ""
    with open(file_path, "rb") as f:
        reader = PyPDF2.PdfReader(f)
        for page in reader.pages:
            text += page.extract_text() + "\n"
    return text


def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        if chunk.strip():
            chunks.append(chunk.strip())
        start += chunk_size - overlap
    logger.info(f"Created {len(chunks)} chunks from resume")
    return chunks
