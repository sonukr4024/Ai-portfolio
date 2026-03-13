"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Subtle dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(108,92,231,0.15) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Floating orb 1 - top right - PURPLE */}
      <div
        className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full animate-orb-1"
        style={{ background: "radial-gradient(circle, rgba(108,92,231,0.12) 0%, transparent 70%)" }}
      />

      {/* Floating orb 2 - bottom left - LAVENDER */}
      <div
        className="absolute -bottom-36 -left-36 w-[650px] h-[650px] rounded-full animate-orb-2"
        style={{ background: "radial-gradient(circle, rgba(162,155,254,0.15) 0%, transparent 70%)" }}
      />

      {/* Floating orb 3 - center - PINK */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full animate-orb-3"
        style={{ background: "radial-gradient(circle, rgba(253,121,168,0.08) 0%, transparent 70%)" }}
      />

      {/* Floating orb 4 - mid right - TEAL */}
      <div
        className="absolute top-2/3 -right-16 w-[400px] h-[400px] rounded-full animate-orb-4"
        style={{ background: "radial-gradient(circle, rgba(0,184,148,0.08) 0%, transparent 70%)" }}
      />

      {/* Decorative spinning ring */}
      <div className="absolute top-20 right-20 w-32 h-32 animate-spin-slow opacity-[0.06]">
        <div className="w-full h-full rounded-full border-2 border-dashed border-[var(--color-accent)]" />
      </div>

      {/* Another decorative ring */}
      <div className="absolute bottom-32 left-16 w-24 h-24 animate-spin-slow opacity-[0.05]" style={{ animationDirection: "reverse", animationDuration: "30s" }}>
        <div className="w-full h-full rounded-full border-2 border-dashed border-[var(--color-gradient-3)]" />
      </div>

      {/* Particles - floating dots */}
      <div className="absolute inset-0">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
        <div className="particle particle-4" />
        <div className="particle particle-5" />
        <div className="particle particle-6" />
        <div className="particle particle-7" />
        <div className="particle particle-8" />
      </div>

      {/* Soft radial fade at edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(248,249,252,0.7)_100%)]" />
    </div>
  );
}
