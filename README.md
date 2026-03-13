# AI Portfolio Assistant — Sonu Kumar

A production-quality AI-powered portfolio assistant that lets visitors chat with an AI to learn about Sonu Kumar's experience, skills, projects, and achievements.

Built with **RAG (Retrieval Augmented Generation)** pipeline using FAISS + Claude AI.

---

## Architecture

```
┌─────────────┐     GET /ask?q=     ┌──────────────────────────────────┐
│   Frontend   │ ──────────────────> │           Backend (FastAPI)       │
│  (Next.js)   │ <──────────────── │                                    │
│  Vercel      │    JSON response   │  1. Receive question               │
└─────────────┘                     │  2. Embed query (SentenceTransf.)  │
                                    │  3. Search FAISS vector store      │
                                    │  4. Retrieve relevant chunks       │
                                    │  5. Send context + query to Claude │
                                    │  6. Return answer + sources        │
                                    │           Render.com               │
                                    └──────────────────────────────────┘
```

## RAG Workflow

1. **Load** — Resume loaded from `data/resume.txt` (or PDF)
2. **Chunk** — Text split into 500-char overlapping chunks
3. **Embed** — Chunks embedded using `all-MiniLM-L6-v2` (SentenceTransformers)
4. **Index** — Embeddings stored in FAISS (Inner Product similarity)
5. **Search** — User query embedded and matched against FAISS index
6. **Generate** — Top-K relevant chunks + question sent to Claude API
7. **Guard** — If similarity score < threshold, returns fallback message

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | Python, FastAPI |
| AI/LLM | Anthropic Claude API |
| Vector DB | FAISS |
| Embeddings | SentenceTransformers (all-MiniLM-L6-v2) |
| Testing | Playwright |
| Deployment | Render (backend), Vercel (frontend) |

---

## Project Structure

```
ai-resume-assistant/
├── backend/
│   ├── main.py              # FastAPI server + endpoints
│   ├── rag_pipeline.py       # RAG orchestration + caching
│   ├── resume_loader.py      # PDF/text loader + chunking
│   ├── vector_store.py       # FAISS index + similarity search
│   ├── claude_client.py      # Claude API integration
│   ├── config.py             # Configuration
│   ├── requirements.txt
│   ├── Dockerfile
│   └── render.yaml
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx      # Main page
│   │   │   ├── layout.tsx    # Root layout
│   │   │   └── globals.css   # Dark theme styles
│   │   └── components/
│   │       ├── ChatWindow.tsx        # Main chat logic
│   │       ├── MessageBubble.tsx     # User/AI message bubbles
│   │       ├── ChatInput.tsx         # Input + send button
│   │       ├── SuggestedQuestions.tsx # Example prompts
│   │       └── TypingIndicator.tsx   # Loading animation
│   ├── Dockerfile
│   ├── next.config.ts
│   └── package.json
├── data/
│   └── resume.txt
├── tests/
│   ├── e2e.spec.ts           # Playwright tests
│   └── playwright.config.ts
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Local Development

### Prerequisites
- Python 3.11+
- Node.js 18+
- Anthropic API key

### 1. Clone and configure

```bash
git clone https://github.com/YOUR_USERNAME/ai-resume-assistant.git
cd ai-resume-assistant
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

### 2. Start Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

Backend runs at `http://localhost:8000`

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

### 4. Run with Docker (Alternative)

```bash
docker-compose up --build
```

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | Yes |
| `PORT` | Backend port (default: 8000) | No |
| `FRONTEND_URL` | Frontend URL for CORS | No |
| `NEXT_PUBLIC_API_URL` | Backend API URL for frontend | Yes (frontend) |
| `LOG_LEVEL` | Logging level (default: INFO) | No |

---

## API Reference

### Ask Question

```
GET /ask?q=What technologies does Sonu specialize in?
```

**Response:**
```json
{
  "question": "What technologies does Sonu specialize in?",
  "answer": "Sonu Kumar specializes in a wide range of technologies...",
  "sources": ["Programming Languages: Python, Java...", "..."]
}
```

### Reload Resume

```
POST /reload-resume
```

**Response:**
```json
{
  "status": "ok",
  "message": "Resume reloaded and embeddings rebuilt."
}
```

### Health Check

```
GET /health
```

---

## Deployment

### Backend → Render.com

1. Push code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Root Directory:** `backend`
   - **Runtime:** Python
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variable: `ANTHROPIC_API_KEY`
6. Add environment variable: `FRONTEND_URL` = your Vercel URL (after deploying frontend)
7. Deploy — note the URL (e.g., `https://ai-portfolio-api.onrender.com`)

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. Settings:
   - **Root Directory:** `frontend`
   - **Framework:** Next.js (auto-detected)
4. Add environment variable: `NEXT_PUBLIC_API_URL` = your Render backend URL
5. Deploy

### Post-Deployment

- Update Render's `FRONTEND_URL` env var with your Vercel URL
- Test: Visit your Vercel URL and ask a question

---

## Playwright Testing

```bash
cd tests
npm init -y
npm install -D @playwright/test
npx playwright install chromium

# Run tests (ensure frontend + backend are running)
npx playwright test --config=playwright.config.ts
```

---

## Guardrails

- AI answers **only** from resume data
- Similarity threshold filters irrelevant results
- Out-of-scope questions return: *"The information is not available in Sonu Kumar's portfolio data."*
- All queries are logged with timestamps
- LRU cache prevents redundant API calls

---

## Example Questions

- "Who is Sonu Kumar?"
- "What technologies does Sonu specialize in?"
- "What backend projects has Sonu built?"
- "Describe Sonu's work experience."
- "What problems has Sonu solved in his projects?"
- "What certifications does Sonu have?"

---

## License

MIT
