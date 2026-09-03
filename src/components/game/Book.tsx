import { useEffect, useState } from "react";
import type { Ball, BallPhase } from "@/lib/game/types";
import { cn } from "@/lib/utils";

const SNIPPETS = [
  "The wicket kept low on a worn strip, and the close fielders crept in.",
  "A late cut, a shout from square leg, the ball racing away to the rope.",
  "He opened the book, found a number, and the innings changed in a digit.",
];

interface BookProps {
  phase: BallPhase;
  ball: Ball | null;
  onTurn: () => void;
  disabled: boolean;
}

export function Book({ phase, ball, onTurn, disabled }: BookProps) {
  const [flicker, setFlicker] = useState(247);
  const page = phase === "flipping" ? flicker : (ball?.page ?? flicker);
  const digit = page % 10;
  const head = String(page).slice(0, -1);
  const snippet = SNIPPETS[page % SNIPPETS.length]!;
  const interactive = !disabled && phase === "idle";

  useEffect(() => {
    if (phase !== "flipping") return;
    const id = window.setInterval(() => {
      setFlicker(21 + Math.floor(Math.random() * 478));
    }, 42);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (ball?.page) setFlicker(ball.page);
  }, [ball?.page]);

  return (
    <div className="book-stage flex flex-col items-center gap-4" data-phase={phase}>
      <button
        type="button"
        onClick={onTurn}
        disabled={!interactive}
        aria-label="Tap the book"
        className={cn(
          "book-3d appearance-none border-0 bg-transparent p-0 text-left",
          interactive && "cursor-pointer",
          !interactive && "cursor-default",
        )}
      >
        <div className="book-spine" />
        <div className="book-left" />
        <div className="book-page p1" />
        <div className="book-page p2" />
        <div className="book-page p3 flex flex-col">
          <p className="font-display text-xs tracking-widest text-leather/80 uppercase">
            A Cricket Companion
          </p>
          <p className="mt-2 line-clamp-3 text-xs leading-4 text-leather/55">{snippet}</p>
          <div className="mt-auto">
            <p className="text-xs uppercase tracking-widest text-leather/50">Page</p>
            <p className="font-display text-4xl font-semibold leading-none tracking-tight text-accent-fg tabular-nums">
              {head}
              <span className={cn("digit-hit", digit === 8 && "is-out")}>{digit}</span>
            </p>
          </div>
        </div>
        <div className="book-cover flex flex-col items-center justify-center px-5 text-center">
          <p className="font-display text-xs tracking-widest text-fg/70 uppercase">Match book</p>
          <p className="mt-3 font-display text-2xl font-semibold leading-none text-fg">
            Book
            <span className="block italic font-medium">Cricket</span>
          </p>
        </div>
      </button>

      <div className="min-h-12 text-center">
        {phase === "idle" ? (
          <p className="text-sm text-muted">Tap the book to turn a page</p>
        ) : null}
        {phase === "flipping" ? (
          <p className="text-sm text-muted">Finding a page…</p>
        ) : null}
        {phase === "revealing" && ball ? (
          <p className="font-display text-lg text-fg">
            {ball.isOut ? (
              <>
                Last digit <span className="text-out">8</span> — out
              </>
            ) : (
              <>
                Last digit {ball.digit} — {ball.runs} {ball.runs === 1 ? "run" : "runs"}
              </>
            )}
          </p>
        ) : null}
        {phase === "shot" && ball ? (
          <p className="text-sm text-muted">Page {ball.page}</p>
        ) : null}
      </div>
    </div>
  );
}
