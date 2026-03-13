"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import MessageBubble, { Message } from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import SuggestedQuestions from "./SuggestedQuestions";
import ScrollToBottom from "./ScrollToBottom";
import AnimatedBackground from "./AnimatedBackground";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function getTimestamp(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100);
  };

  const clearChat = () => setMessages([]);

  const sendMessage = async (text: string) => {
    const userMsg: Message = { role: "user", content: text, timestamp: getTimestamp() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/ask?q=${encodeURIComponent(text)}`);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const aiMsg: Message = {
        role: "ai",
        content: data.answer,
        timestamp: getTimestamp(),
        sources: data.sources,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errMsg: Message = {
        role: "ai",
        content: "Sorry, I couldn't reach the server. Please check if the backend is running.",
        timestamp: getTimestamp(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const msgCount = messages.length;

  return (
    <div className="flex flex-col h-screen">
      <AnimatedBackground />
      {/* Header */}
      <header className="border-b border-[var(--color-border)] glass px-4 py-3 z-10 relative">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-gradient-1)] to-[var(--color-gradient-2)] flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-[var(--color-accent-glow)]">
                SK
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--color-success)] border-2 border-[var(--color-background)]" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-[var(--color-foreground)] flex items-center gap-2">
                Sonu Kumar
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-semibold tracking-wider uppercase bg-[var(--color-accent-glow)] text-[var(--color-accent)] border border-[var(--color-accent)]/20">
                  AI Assistant
                </span>
              </h1>
              <p className="text-[11px] text-[var(--color-muted)]">
                Portfolio Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {msgCount > 0 && (
              <>
                <span className="text-[11px] text-[var(--color-muted)] tabular-nums px-2 py-1 rounded-md bg-[var(--color-surface-2)]">
                  {msgCount} msg{msgCount > 1 ? "s" : ""}
                </span>
                <button
                  onClick={clearChat}
                  className="p-2 rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-muted)] hover:text-red-400 transition-colors cursor-pointer"
                  title="Clear chat"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="relative flex-1">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="absolute inset-0 overflow-y-auto px-4 py-6 chat-scroll"
          data-testid="chat-messages"
        >
          <div className="max-w-3xl mx-auto flex flex-col gap-5">
            {messages.length === 0 && !loading ? (
              <SuggestedQuestions onSelect={sendMessage} />
            ) : (
              <>
                {messages.map((msg, i) => (
                  <MessageBubble key={i} message={msg} />
                ))}
                {loading && <TypingIndicator />}
              </>
            )}
          </div>
        </div>
        <ScrollToBottom visible={showScrollBtn} onClick={scrollToBottom} />
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}
