import logging
import anthropic
from config import ANTHROPIC_API_KEY, CLAUDE_MODEL, MAX_TOKENS

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are Sonu Kumar's AI Portfolio Assistant. You answer questions about Sonu Kumar using ONLY the provided resume/portfolio context.

STRICT RULES:
1. ONLY use the provided context to answer. Never use outside knowledge.
2. If the question cannot be answered from the context, respond EXACTLY with:
   "The information is not available in Sonu Kumar's portfolio data."
3. Never hallucinate or fabricate information.
4. Be professional, concise, and helpful.
5. Use bullet points and clear formatting when listing items.
6. For "who is" questions, provide a professional summary.
7. Always refer to Sonu in third person.
"""


def get_client() -> anthropic.Anthropic:
    if not ANTHROPIC_API_KEY:
        raise ValueError("ANTHROPIC_API_KEY environment variable is not set")
    return anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)


def generate_answer(question: str, resume_text: str) -> str:
    if not resume_text:
        return "The information is not available in Sonu Kumar's portfolio data."

    user_message = f"""Portfolio Context:
{resume_text}

---
Question: {question}

Answer using ONLY the portfolio context above. If the answer is not in the context, say exactly: "The information is not available in Sonu Kumar's portfolio data."
"""

    try:
        client = get_client()
        response = client.messages.create(
            model=CLAUDE_MODEL,
            max_tokens=MAX_TOKENS,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_message}],
        )
        answer = response.content[0].text
        logger.info(f"Generated answer: {len(answer)} chars")
        return answer
    except anthropic.AuthenticationError:
        logger.error("Invalid ANTHROPIC_API_KEY")
        return "Error: Invalid API key. Please configure ANTHROPIC_API_KEY."
    except Exception as e:
        logger.error(f"Claude API error: {e}")
        return "Error generating response. Please try again."
