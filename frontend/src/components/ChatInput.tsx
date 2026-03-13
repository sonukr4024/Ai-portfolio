"use client";

import { useState, useRef } from "react";

interface Props {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  return (
    <div className="border-t border-[var(--color-border)] glass p-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end gap-2.5">
          <div className="flex-1 relative group">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about Sonu Kumar..."
              disabled={disabled}
              rows={1}
              className="w-full resize-none bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-foreground)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)]/50 focus:bg-[var(--color-surface-2)] transition-all duration-200 disabled:opacity-40"
              data-testid="chat-input"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={disabled || !input.trim()}
            className="h-[46px] w-[46px] rounded-xl bg-gradient-to-r from-[var(--color-gradient-1)] to-[var(--color-gradient-2)] text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed shrink-0 cursor-pointer flex items-center justify-center hover:shadow-lg hover:shadow-[var(--color-accent-glow)] hover:scale-105 active:scale-95"
            data-testid="send-button"
            title="Send message"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
          </button>
        </div>
        <p className="text-[10px] text-[var(--color-muted)]/50 mt-2 text-center">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
