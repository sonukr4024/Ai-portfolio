"use client";

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-slide-left">
      <div className="w-8 h-8 rounded-xl bg-white border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] shrink-0 shadow-sm animate-breathe">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-[10px] font-medium text-[var(--color-accent)] mb-1 px-0.5">AI Assistant</span>
        <div className="bg-white border border-[var(--color-border)] rounded-2xl rounded-tl-md px-5 py-3.5 shadow-sm shimmer">
          <div className="flex gap-1.5 items-center h-5">
            <span className="typing-dot w-2 h-2 rounded-full bg-[var(--color-accent)]" />
            <span className="typing-dot w-2 h-2 rounded-full bg-[var(--color-accent-2)]" />
            <span className="typing-dot w-2 h-2 rounded-full bg-[var(--color-gradient-3)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
