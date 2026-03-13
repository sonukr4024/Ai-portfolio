"use client";

interface Props {
  visible: boolean;
  onClick: () => void;
}

export default function ScrollToBottom({ visible, onClick }: Props) {
  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 flex items-center gap-1.5 text-[11px] text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-all shadow-xl cursor-pointer animate-fade-in"
      title="Scroll to bottom"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      New messages
    </button>
  );
}
