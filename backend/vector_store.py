import logging
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss

from config import EMBEDDING_MODEL, TOP_K_RESULTS, SIMILARITY_THRESHOLD

logger = logging.getLogger(__name__)


class VectorStore:
    def __init__(self):
        logger.info(f"Loading embedding model: {EMBEDDING_MODEL}")
        self.model = SentenceTransformer(EMBEDDING_MODEL)
        self.index = None
        self.chunks: list[str] = []

    def build_index(self, chunks: list[str]):
        self.chunks = chunks
        logger.info(f"Generating embeddings for {len(chunks)} chunks")
        embeddings = self.model.encode(chunks, normalize_embeddings=True)
        embeddings = np.array(embeddings, dtype="float32")
        dimension = embeddings.shape[1]
        self.index = faiss.IndexFlatIP(dimension)
        self.index.add(embeddings)
        logger.info(f"FAISS index built: {self.index.ntotal} vectors, dim={dimension}")

    def search(self, query: str, top_k: int = TOP_K_RESULTS) -> list[dict]:
        if self.index is None:
            raise RuntimeError("Vector store not initialized")
        query_emb = self.model.encode([query], normalize_embeddings=True)
        query_emb = np.array(query_emb, dtype="float32")
        scores, indices = self.index.search(query_emb, top_k)
        results = []
        for score, idx in zip(scores[0], indices[0]):
            if idx < len(self.chunks) and score >= SIMILARITY_THRESHOLD:
                results.append({"text": self.chunks[idx], "score": float(score)})
        logger.info(f"Search '{query[:50]}' -> {len(results)} results (best={scores[0][0]:.3f})")
        return results


vector_store = VectorStore()
