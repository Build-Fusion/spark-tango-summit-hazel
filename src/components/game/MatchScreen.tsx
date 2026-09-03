import { commentary, formatOvers, strikeRate } from "@/lib/game/rules";
import { TOTAL_BALLS, type Ball, type Innings } from "@/lib/game/types";
import { selectBatterName, selectCurrentInnings, useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { Book } from "@/components/game/Book";
import { Pitch } from "@/components/game/Pitch";
import { cn } from "@/lib/utils";
import { playUi, unlockAudio } from "@/lib/game/audio";

export function MatchScreen() {
  const phase = useGame((s) => s.phase);
  const ballPhase = useGame((s) => s.ballPhase);
  const pending = useGame((s) => s.pendingBall);
  const innings = useGame((s) => s.innings);
  const current = useGame(selectCurrentInnings);
  const batter = useGame(selectBatterName);
  const players = useGame((s) => s.players);
  const currentInnings = useGame((s) => s.currentInnings);
  const turnPage = useGame((s) => s.turnPage);
  const beginChase = useGame((s) => s.beginChase);

  const first = innings[0];
  const chasing = currentInnings === 1 && first;
  const target = chasing ? first.runs + 1 : null;
  const ballsLeft = current ? TOTAL_BALLS - current.balls.length : TOTAL_BALLS;
  const need = chasing && current ? Math.max(0, (target ?? 0) - current.runs) : null;
  const lastCommitted = current?.balls[current.balls.length - 1] ?? null;
  const displayBall = pending ?? lastCommitted;
  const line =
    ballPhase === "shot" && pending
      ? commentary(pending, batter)
      : ballPhase === "idle" && lastCommitted
        ? commentary(lastCommitted, batter)
        : ballPhase === "idle"
          ? `${batter} to face.`
          : null;

  const overBalls = ballsThisOver(current?.balls ?? [], pending);

  function onTurn() {
    unlockAudio();
    turnPage();
  }

  return (
    <main className="mx-auto flex min-h-[calc(100dvh-4.5rem)] w-full max-w-6xl flex-col gap-4 px-4 pb-8 md:gap-6 md:px-6">
      <div className="grid gap-4 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:items-start lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <ScoreCard
          batter={batter}
          current={current}
          players={players}
          innings={innings}
          chasing={Boolean(chasing)}
          target={target}
          need={need}
          ballsLeft={ballsLeft}
        />

        <div className="flex flex-col gap-4">
          <Pitch phase={ballPhase} ball={displayBall} />
          <p
            className="min-h-10 text-center font-display text-base italic text-fg/90 md:text-lg"
            aria-live="polite"
          >
            {line}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-5 rounded-xl border border-border bg-surface px-4 py-5 md:px-6">
        <OverStrip balls={overBalls} pending={ballPhase !== "idle" ? pending : null} />
        <Book
          phase={ballPhase}
          ball={pending}
          onTurn={onTurn}
          disabled={phase !== "batting" || ballPhase !== "idle"}
        />
        <Button
          size="lg"
          className="w-full max-w-sm"
          onClick={onTurn}
          disabled={phase !== "batting" || ballPhase !== "idle"}
        >
          Turn the page
        </Button>
      </div>

      {phase === "inningsBreak" && first ? (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-bg/70 p-4 sm:items-center">
          <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
              Innings break
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
              {players[0]} {first.runs}
              {first.out ? "" : "*"}
            </h2>
            <p className="mt-2 text-muted">
              {formatOvers(first.balls.length)} overs
              {first.out ? " · all out" : " · not out"}. {players[1]} needs {first.runs + 1} from{" "}
              {TOTAL_BALLS} balls.
            </p>
            <Button
              className="mt-6 w-full"
              size="lg"
              onClick={() => {
                beginChase();
                unlockAudio();
                playUi();
              }}
            >
              {players[1]} to bat
            </Button>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function ballsThisOver(balls: Ball[], pending: Ball | null): Ball[] {
  const over =
    pending?.over ??
    (balls.length === 0 ? 0 : balls[balls.length - 1]!.over);
  return balls.filter((b) => b.over === over);
}

function ScoreCard({
  batter,
  current,
  players,
  innings,
  chasing,
  target,
  need,
  ballsLeft,
}: {
  batter: string;
  current: Innings | null;
  players: [string, string];
  innings: [Innings | null, Innings | null];
  chasing: boolean;
  target: number | null;
  need: number | null;
  ballsLeft: number;
}) {
  const runs = current?.runs ?? 0;
  const faced = current?.balls.length ?? 0;
  const first = innings[0];
  const second = innings[1];

  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Now batting</p>
      <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-fg">{batter}</h2>
      <p
        key={runs}
        className="score-pop mt-1 font-display text-6xl font-semibold leading-none tracking-tight tabular-nums"
      >
        {runs}
        {current?.out ? (
          <span className="ml-2 align-top text-2xl text-out">out</span>
        ) : (
          <span className="ml-1 align-top text-2xl text-muted">*</span>
        )}
      </p>
      <p className="mt-3 text-sm text-muted tabular-nums">
        {formatOvers(faced)} ov · {faced} {faced === 1 ? "ball" : "balls"} · SR{" "}
        {strikeRate(runs, faced)}
      </p>

      {chasing && target !== null && need !== null ? (
        <p className="mt-4 rounded-md bg-surface-2 px-3 py-2 text-sm text-fg">
          Need {need} from {ballsLeft}
          <span className="text-muted"> · target {target}</span>
        </p>
      ) : (
        <p className="mt-4 text-sm text-muted">First innings · five overs or one wicket</p>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
        <MiniScore name={players[0]} innings={first} active={batter === players[0]} />
        <MiniScore name={players[1]} innings={second} active={batter === players[1]} />
      </div>
    </section>
  );
}

function MiniScore({
  name,
  innings,
  active,
}: {
  name: string;
  innings: Innings | null;
  active: boolean;
}) {
  return (
    <div>
      <p className={cn("truncate text-xs uppercase tracking-wide", active ? "text-fg" : "text-muted")}>
        {name}
      </p>
      <p className="mt-1 font-display text-xl tabular-nums">
        {innings ? (
          <>
            {innings.runs}
            <span className="text-sm text-muted">
              {" "}
              {innings.out ? "all out" : innings.complete ? "not out" : ""}
            </span>
          </>
        ) : (
          <span className="text-muted">—</span>
        )}
      </p>
    </div>
  );
}

function OverStrip({ balls, pending }: { balls: Ball[]; pending: Ball | null }) {
  const slots = Array.from({ length: 6 }, (_, i) => balls[i] ?? null);
  return (
    <div className="flex w-full max-w-sm items-center justify-center gap-2" aria-label="This over">
      {slots.map((ball, i) => {
        const isPending = Boolean(pending) && balls.length === i;
        const shown = isPending ? pending : ball;
        return (
          <span
            key={i}
            className={cn(
              "grid size-10 place-items-center rounded-full border text-sm font-medium tabular-nums",
              shown?.isOut
                ? "border-out bg-out/15 text-out"
                : shown?.isFour || shown?.isSix
                  ? "border-four bg-four/15 text-fg"
                  : shown
                    ? "border-border bg-surface-2 text-fg"
                    : "border-border/70 text-subtle",
            )}
          >
            {shown ? (shown.isOut ? "W" : shown.runs) : "·"}
          </span>
        );
      })}
    </div>
  );
}
