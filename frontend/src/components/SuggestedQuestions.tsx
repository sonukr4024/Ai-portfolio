"use client";

const suggestions = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    ),
    text: "Who is Sonu Kumar?",
    sub: "Background & overview",
    color: "from-purple-500/10 to-indigo-500/10",
    borderColor: "hover:border-purple-300",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    ),
    text: "What technologies does Sonu specialize in?",
    sub: "Tech stack & tools",
    color: "from-blue-500/10 to-cyan-500/10",
    borderColor: "hover:border-blue-300",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
    ),
    text: "What backend projects has Sonu built?",
    sub: "Projects & architecture",
    color: "from-emerald-500/10 to-teal-500/10",
    borderColor: "hover:border-emerald-300",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
    text: "Describe Sonu's work experience.",
    sub: "Career & roles",
    color: "from-orange-500/10 to-amber-500/10",
    borderColor: "hover:border-orange-300",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    ),
    text: "What problems has Sonu solved?",
    sub: "Impact & achievements",
    color: "from-pink-500/10 to-rose-500/10",
    borderColor: "hover:border-pink-300",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
    ),
    text: "What certifications does Sonu have?",
    sub: "Credentials & awards",
    color: "from-violet-500/10 to-purple-500/10",
    borderColor: "hover:border-violet-300",
  },
];

interface Props {
  onSelect: (question: string) => void;
}

export default function SuggestedQuestions({ onSelect }: Props) {
  return (
    <div className="flex flex-col items-center gap-8 py-12 sm:py-20 px-4 animate-fade-in-up">
      {/* Avatar with animated rings */}
      <div className="relative animate-float">
        {/* Pulsing rings */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--color-gradient-1)] via-[var(--color-gradient-2)] to-[var(--color-gradient-3)] blur-2xl opacity-30 animate-breathe" />
        <div className="absolute -inset-3 rounded-3xl border-2 border-[var(--color-accent)]/20 animate-ring-pulse" />
        <div className="absolute -inset-6 rounded-3xl border border-[var(--color-accent)]/10 animate-ring-pulse" style={{ animationDelay: "0.5s" }} />

        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-gradient-1)] via-[var(--color-gradient-2)] to-[var(--color-gradient-3)] flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-[var(--color-accent)]/20">
          SK
        </div>
      </div>

      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold gradient-text tracking-tight">
          Ask AI about Sonu Kumar
        </h2>
        <p className="text-[var(--color-muted)] text-sm max-w-md leading-relaxed mx-auto">
          I can answer questions about Sonu&apos;s experience, skills,
          projects, and achievements from his portfolio.
        </p>
      </div>

      {/* Suggestion cards with stagger animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl mt-2 stagger-children">
        {suggestions.map((q, i) => (
          <button
            key={q.text}
            onClick={() => onSelect(q.text)}
            className={`group text-left px-4 py-4 rounded-xl border border-[var(--color-border)] bg-gradient-to-br ${q.color} hover:bg-[var(--color-surface)] ${q.borderColor} text-sm transition-all duration-300 cursor-pointer hover-lift animate-slide-up opacity-0`}
            style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "forwards" }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-all duration-300 group-hover:scale-110">
                {q.icon}
              </div>
              <div>
                <div className="text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors font-medium">
                  {q.text}
                </div>
                <div className="text-[11px] text-[var(--color-muted)] mt-0.5">{q.sub}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
