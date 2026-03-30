"use client";
import { useEffect, useState } from "react";

const DEADLINE_UTC = "2026-03-31T19:00:59Z";
const CAMPAIGN_HOURS = 24;

export default function OfferRunner() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const end = new Date(DEADLINE_UTC).getTime();
    const start = end - CAMPAIGN_HOURS * 60 * 60 * 1000;

    const update = () => {
      const now = Date.now();
      const remaining = Math.max(end - now, 0);
      setTimeLeft(remaining);
      setProgress(
        Math.min(Math.max(((now - start) / (end - start)) * 100, 0), 100)
      );
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  const totalSeconds = Math.floor(timeLeft / 1000);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  const isUrgent = timeLeft > 0 && timeLeft < 2 * 60 * 60 * 1000;
  const isExpired = timeLeft === 0;

  if (isExpired) {
    // return (
    //   <div className="fixed top-0 left-0 w-full z-50 bg-slate-950 text-center py-2 text-sm text-slate-500">
    //     Offer expired
    //   </div>
    // );
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div
        className="border-b"
        style={{
          background: "rgba(8,14,26,0.92)",
          backdropFilter: "blur(12px)",
          borderColor: isUrgent
            ? "rgba(239,68,68,0.25)"
            : "rgba(249,115,22,0.2)",
        }}
      >
        {/* 🔥 SINGLE LINE */}
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-center gap-4 text-sm sm:text-base whitespace-nowrap overflow-hidden">

          {/* Offer */}
          <span className="text-orange-400">🔥</span>
          <span className="font-semibold text-slate-100">
            ₹400 OFF Lifetime Access (JAVA)
          </span>

          {/* Code */}
          <span
            className="font-mono font-bold text-xs px-2 py-1 rounded-md"
            style={{
              background: "rgba(249,115,22,0.12)",
              border: "1px solid rgba(249,115,22,0.3)",
              color: "#f97316",
            }}
          >
            MAR400
          </span>

          {/* Divider */}
          <span className="text-slate-600">|</span>

          {/* ⏳ TIMER (HERO) */}
          <span
            className={`font-mono font-bold tracking-wider text-base sm:text-lg ${
              isUrgent ? "text-red-500 animate-pulse" : "text-white"
            }`}
          >
            {pad(hrs)}h:{pad(mins)}m:{pad(secs)}s
          </span>

          <span className="text-slate-500 text-xs sm:text-sm">left</span>

          {/* CTA */}
          <a
            href="https://interview.lldcoding.com/buy-course/course2"
            className="ml-2 px-3 py-1 rounded-md text-xs font-semibold transition-all"
            style={{
              background: isUrgent
                ? "rgba(239,68,68,0.15)"
                : "rgba(249,115,22,0.15)",
              border: `1px solid ${
                isUrgent
                  ? "rgba(239,68,68,0.35)"
                  : "rgba(249,115,22,0.35)"
              }`,
              color: isUrgent ? "#f87171" : "#f97316",
            }}
          >
            Claim →
          </a>
        </div>

        {/* Progress bar */}
        <div style={{ height: "2px", background: "rgba(255,255,255,0.05)" }}>
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: isUrgent
                ? "linear-gradient(90deg, #ef4444, #dc2626)"
                : "linear-gradient(90deg, #f97316, #ea580c)",
              transition: "width 1s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}