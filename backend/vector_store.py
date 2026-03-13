import logging
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from config import TOP_K_RESULTS, SIMILARITY_THRESHOLD

logger = logging.getLogger(__name__)


class VectorStore:
    def __init__(self):
        self.vectorizer = None
        self.tfidf_matrix = None
        self.chunks: list[str] = []

    def build_index(self, chunks: list[str]):
        self.chunks = chunks
        logger.info(f"Building TF-IDF index for {len(chunks)} chunks")
        self.vectorizer = TfidfVectorizer(
            stop_words="english",
            max_features=5000,
            ngram_range=(1, 2),
            sublinear_tf=True,
        )
        self.tfidf_matrix = self.vectorizer.fit_transform(chunks)
        logger.info(f"TF-IDF index built: {self.tfidf_matrix.shape[0]} vectors, dim={self.tfidf_matrix.shape[1]}")

    def search(self, query: str, top_k: int = TOP_K_RESULTS) -> list[dict]:
        if self.vectorizer is None or self.tfidf_matrix is None:
            raise RuntimeError("Vector store not initialized")
        query_vec = self.vectorizer.transform([query])
        scores = cosine_similarity(query_vec, self.tfidf_matrix).flatten()
        top_indices = np.argsort(scores)[::-1][:top_k]
        results = []
        for idx in top_indices:
            if scores[idx] >= SIMILARITY_THRESHOLD:
                results.append({"text": self.chunks[idx], "score": float(scores[idx])})
        logger.info(f"Search '{query[:50]}' -> {len(results)} results (best={scores[top_indices[0]]:.3f})")
        return results


vector_store = VectorStore()
