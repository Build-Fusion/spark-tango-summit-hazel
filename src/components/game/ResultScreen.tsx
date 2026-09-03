import { RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatOvers, matchResult } from "@/lib/game/rules";
import { useGame } from "@/lib/game/store";
import { playUi, unlockAudio } from "@/lib/game/audio";
import { cn } from "@/lib/utils";
import type { Innings } from "@/lib/game/types";

export function ResultScreen() {
  const players = useGame((s) => s.players);
  const first = useGame((s) => s.innings[0]);
  const second = useGame((s) => s.innings[1]);
  const newMatch = useGame((s) => s.newMatch);
  const result =
    first && second && second.complete ? matchResult(first, second, players) : null;

  if (!result || !first || !second) return null;

  return (
    <main className="mx-auto flex min-h-[calc(100dvh-4.5rem)] w-full max-w-lg flex-col justify-center px-5 py-8">
      <div className="stagger-in flex flex-col gap-8 text-center">
        <div>
          <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-surface-2 text-accent">
            <Trophy className="size-5" />
          </div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted">Match over</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-fg">
            {result.headline}
          </h1>
          <p className="mt-2 text-muted">{result.detail}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <InningsCard name={players[0]} innings={first} winner={result.winner === 0} />
          <InningsCard name={players[1]} innings={second} winner={result.winner === 1} />
        </div>

        <BallLog label={players[0]} balls={first.balls} />
        <BallLog label={players[1]} balls={second.balls} />

        <Button
          size="lg"
          className="w-full"
          onClick={() => {
            newMatch();
            unlockAudio();
            playUi();
          }}
        >
          <RotateCcw className="size-4" />
          New match
        </Button>
      </div>
    </main>
  );
}

function InningsCard({
  name,
  innings,
  winner,
}: {
  name: string;
  innings: Innings;
  winner: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4 text-left",
        winner ? "border-accent/40 bg-surface-2" : "border-border bg-surface",
      )}
    >
      <p className="truncate text-xs uppercase tracking-wide text-muted">{name}</p>
      <p className="mt-1 font-display text-3xl font-semibold tabular-nums">{innings.runs}</p>
      <p className="mt-1 text-xs text-muted">
        {formatOvers(innings.balls.length)} ov
        {innings.out ? " · out" : " · not out"}
      </p>
    </div>
  );
}

function BallLog({
  label,
  balls,
}: {
  label: string;
  balls: Innings["balls"];
}) {
  return (
    <div className="text-left">
      <p className="mb-2 text-xs uppercase tracking-wide text-muted">{label} · ball by ball</p>
      <div className="flex flex-wrap gap-1.5">
        {balls.map((b, i) => (
          <span
            key={`${b.page}-${i}`}
            className={cn(
              "grid size-8 place-items-center rounded-sm text-xs font-medium tabular-nums",
              b.isOut
                ? "bg-out/20 text-out"
                : b.isFour || b.isSix
                  ? "bg-four/20 text-fg"
                  : "bg-surface-2 text-fg",
            )}
            title={`Page ${b.page}`}
          >
            {b.isOut ? "W" : b.runs}
          </span>
        ))}
      </div>
    </div>
  );
}
