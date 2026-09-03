import { useState } from "react";
import { BookOpen, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGame } from "@/lib/game/store";
import { playUi, unlockAudio } from "@/lib/game/audio";

export function TitleScreen() {
  const players = useGame((s) => s.players);
  const setName = useGame((s) => s.setName);
  const startMatch = useGame((s) => s.startMatch);
  const [howTo, setHowTo] = useState(false);

  function start() {
    startMatch();
    unlockAudio();
    playUi();
  }

  return (
    <main className="relative mx-auto flex min-h-[calc(100dvh-4.5rem)] w-full max-w-lg flex-col justify-center px-5 py-6">
      <div className="stagger-in flex flex-col gap-8">
        <header className="text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-muted">
            Two players · five overs
          </p>
          <h1 className="font-display text-[clamp(2.6rem,12vw,4.4rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-fg">
            Book
            <span className="block italic font-medium text-accent">Cricket</span>
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-pretty text-muted">
            Flip a page. The last digit is your runs. Land on eight and you are out.
          </p>
        </header>

        <form
          className="rounded-xl border border-border bg-surface p-5"
          onSubmit={(e) => {
            e.preventDefault();
            start();
          }}
        >
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="p1">Batter one</Label>
              <Input
                id="p1"
                autoComplete="nickname"
                maxLength={18}
                value={players[0]}
                onChange={(e) => setName(0, e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="p2">Batter two</Label>
              <Input
                id="p2"
                autoComplete="nickname"
                maxLength={18}
                value={players[1]}
                onChange={(e) => setName(1, e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="mt-1 w-full">
              <Play className="size-4" />
              Start match
            </Button>
          </div>
        </form>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 text-sm text-muted transition-colors duration-150 hover:text-fg"
          onClick={() => {
            playUi();
            setHowTo((v) => !v);
          }}
        >
          <BookOpen className="size-4" />
          {howTo ? "Hide rules" : "How to play"}
        </button>

        {howTo ? (
          <ol className="grid gap-3 rounded-lg border border-border bg-surface-2 p-5 text-sm text-muted">
            <li>
              <span className="font-medium text-fg">1. </span>
              Each player bats five overs (30 balls) or until dismissed.
            </li>
            <li>
              <span className="font-medium text-fg">2. </span>
              Turn the book. The last digit of the page is the runs from that ball.
            </li>
            <li>
              <span className="font-medium text-fg">3. </span>
              Eight is bowled. Four is a boundary. Six clears the rope. Zero is a dot.
            </li>
            <li>
              <span className="font-medium text-fg">4. </span>
              Player two chases player one’s total. Highest score wins.
            </li>
          </ol>
        ) : null}
      </div>
    </main>
  );
}
