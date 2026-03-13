"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export interface Message {
  role: "user" | "ai";
  content: string;
  timestamp: string;
  sources?: string[];
}

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);
  const [showSources, setShowSources] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex items-start gap-3 ${isUser ? "animate-slide-right flex-row-reverse" : "animate-slide-left"}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-semibold shrink-0 transition-transform duration-300 hover:scale-110 ${
          isUser
            ? "bg-gradient-to-br from-[var(--color-user-bubble)] to-[var(--color-user-bubble-end)] text-white shadow-lg shadow-purple-500/15"
            : "bg-white border border-[var(--color-border)] text-[var(--color-accent)] shadow-sm"
        }`}
      >
        {isUser ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
        )}
      </div>

      {/* Content */}
      <div className={`max-w-[80%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        {/* Label */}
        <span className={`text-[10px] font-medium mb-1 px-0.5 ${isUser ? "text-[var(--color-muted)]" : "text-[var(--color-accent)]"}`}>
          {isUser ? "You" : "AI Assistant"}
        </span>

        {/* Bubble */}
        <div
          className={`group relative px-4 py-3 rounded-2xl text-[13.5px] leading-relaxed transition-shadow duration-300 ${
            isUser
              ? "bg-gradient-to-br from-[var(--color-user-bubble)] to-[var(--color-user-bubble-end)] text-white rounded-tr-md shadow-lg shadow-purple-500/15 hover:shadow-xl hover:shadow-purple-500/20"
              : "bg-white border border-[var(--color-border)] text-[var(--color-foreground)] rounded-tl-md shadow-sm hover:shadow-md"
          }`}
        >
          {isUser ? (
            <span className="whitespace-pre-wrap">{message.content}</span>
          ) : (
            <div className="ai-markdown">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}

          {/* Actions for AI messages */}
          {!isUser && (
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[var(--color-border)]/50 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              <button
                onClick={handleCopy}
                className="text-[11px] text-[var(--color-muted)] hover:text-[var(--color-accent)] flex items-center gap-1 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-[var(--color-success)]">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Sources */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-1.5 w-full">
            <button
              onClick={() => setShowSources(!showSources)}
              className="text-[11px] text-[var(--color-muted)] hover:text-[var(--color-accent)] flex items-center gap-1 transition-all duration-200 cursor-pointer hover:translate-x-0.5"
            >
              <svg className={`w-3 h-3 transition-transform duration-300 ${showSources ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              View {message.sources.length} source{message.sources.length > 1 ? "s" : ""} used
            </button>
            {showSources && (
              <div className="mt-1.5 space-y-1 stagger-children">
                {message.sources.map((src, i) => (
                  <div key={i} className="text-[11px] text-[var(--color-muted)] bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg px-3 py-2 line-clamp-2 animate-pop-in opacity-0" style={{ animationDelay: `${i * 0.05}s`, animationFillMode: "forwards" }}>
                    {src}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-[var(--color-muted)]/60 mt-1 px-0.5">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}
