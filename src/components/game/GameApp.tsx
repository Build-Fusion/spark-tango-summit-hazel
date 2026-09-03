"use client";

import { useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { TitleScreen } from "@/components/game/TitleScreen";
import { MatchScreen } from "@/components/game/MatchScreen";
import { ResultScreen } from "@/components/game/ResultScreen";
import { hydrateNames, useGame } from "@/lib/game/store";
import { playForBall, playPageFlip, setMuted, unlockAudio } from "@/lib/game/audio";
import { Button } from "@/components/ui/button";

const TIMING = {
  flipping: 1050,
  revealing: 900,
  shot: 1550,
} as const;

const REDUCED = {
  flipping: 180,
  revealing: 280,
  shot: 360,
} as const;

export function GameApp() {
  const phase = useGame((s) => s.phase);
  const ballPhase = useGame((s) => s.ballPhase);
  const deliveryKey = useGame((s) => {
    if (!s.pendingBall) return null;
    const faced = s.innings[s.currentInnings]?.balls.length ?? 0;
    return `${s.currentInnings}-${faced}-${s.pendingBall.page}`;
  });
  const muted = useGame((s) => s.muted);
  const setBallPhase = useGame((s) => s.setBallPhase);
  const commitBall = useGame((s) => s.commitBall);
  const turnPage = useGame((s) => s.turnPage);
  const toggleMute = useGame((s) => s.toggleMute);

  useEffect(() => {
    hydrateNames();
  }, []);

  useEffect(() => {
    setMuted(muted);
  }, [muted]);

  useEffect(() => {
    if (!deliveryKey) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = reduced ? REDUCED : TIMING;
    const timers: number[] = [];
    let cancelled = false;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    void (async () => {
      playPageFlip();
      await wait(t.flipping);
      if (cancelled) return;
      setBallPhase("revealing");
      await wait(t.revealing);
      if (cancelled) return;
      const pending = useGame.getState().pendingBall;
      setBallPhase("shot");
      if (pending) {
        playForBall(pending.isOut, pending.isFour, pending.isSix, pending.runs);
        if (pending.isOut) navigator.vibrate?.(40);
        else if (pending.isSix || pending.isFour) navigator.vibrate?.([12, 24, 12]);
      }
      await wait(t.shot);
      if (cancelled) return;
      commitBall();
    })();

    return () => {
      cancelled = true;
      for (const id of timers) window.clearTimeout(id);
    };
  }, [deliveryKey, setBallPhase, commitBall]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code !== "Space" && e.code !== "Enter") return;
      const s = useGame.getState();
      if (s.phase !== "batting" || s.ballPhase !== "idle") return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
      unlockAudio();
      turnPage();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [turnPage]);

  return (
    <div className="relative min-h-dvh bg-bg text-fg" data-game-phase={phase} data-ball-phase={ballPhase}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, color-mix(in oklab, var(--color-pitch) 18%, transparent), transparent 52%)",
        }}
      />
      <div className="relative">
        <header className="flex items-center justify-between px-4 pt-4 md:px-6">
          <p className="font-display text-sm tracking-wide text-muted">
            {phase === "setup" ? "" : "Book Cricket"}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="size-11"
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={() => {
              unlockAudio();
              toggleMute();
            }}
          >
            {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
          </Button>
        </header>
        {phase === "setup" ? <TitleScreen /> : null}
        {phase === "batting" || phase === "inningsBreak" ? <MatchScreen /> : null}
        {phase === "result" ? <ResultScreen /> : null}
      </div>
    </div>
  );
}
