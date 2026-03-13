"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.4) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating orb 1 - top right - PURPLE */}
      <div
        className="absolute -top-20 -right-20 w-[550px] h-[550px] rounded-full animate-orb-1"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)" }}
      />

      {/* Floating orb 2 - bottom left - INDIGO */}
      <div
        className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full animate-orb-2"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }}
      />

      {/* Floating orb 3 - center - PINK */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full animate-orb-3"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)" }}
      />

      {/* Floating orb 4 - mid left - BLUE */}
      <div
        className="absolute top-1/4 -left-16 w-[350px] h-[350px] rounded-full animate-orb-1"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)", animationDelay: "5s", animationDuration: "22s" }}
      />

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

      {/* Soft vignette - not too dark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(9,9,11,0.6)_100%)]" />
    </div>
  );
}
