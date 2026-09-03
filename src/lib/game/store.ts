import { create } from "zustand";
import {
  applyBall,
  chaseComplete,
  emptyInnings,
  loadSavedNames,
  makeBall,
  randomPage,
  saveNames,
} from "./rules";
import type { Ball, BallPhase, GameState, Innings } from "./types";

interface GameActions {
  setName: (index: 0 | 1, value: string) => void;
  startMatch: () => void;
  turnPage: () => void;
  setBallPhase: (ballPhase: BallPhase) => void;
  commitBall: () => void;
  beginChase: () => void;
  newMatch: () => void;
  toggleMute: () => void;
}

export type GameStore = GameState & GameActions;

function cleanName(value: string, fallback: string): string {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed.slice(0, 18) : fallback;
}

const initial = (): Pick<
  GameState,
  "players" | "phase" | "ballPhase" | "currentInnings" | "innings" | "pendingBall" | "muted"
> => ({
  players: ["Player 1", "Player 2"],
  phase: "setup",
  ballPhase: "idle",
  currentInnings: 0,
  innings: [null, null],
  pendingBall: null,
  muted: false,
});

export const useGame = create<GameStore>((set, get) => ({
  ...initial(),

  setName: (index, value) => {
    const players = [...get().players] as [string, string];
    players[index] = value;
    set({ players });
  },

  startMatch: () => {
    const raw = get().players;
    const players: [string, string] = [
      cleanName(raw[0], "Player 1"),
      cleanName(raw[1], "Player 2"),
    ];
    saveNames(players);
    set({
      players,
      phase: "batting",
      ballPhase: "idle",
      currentInnings: 0,
      innings: [emptyInnings(0), null],
      pendingBall: null,
    });
  },

  turnPage: () => {
    const { phase, ballPhase, currentInnings, innings } = get();
    if (phase !== "batting" || ballPhase !== "idle") return;
    const inn = innings[currentInnings];
    if (!inn || inn.complete) return;
    const pendingBall = makeBall(randomPage(), inn.balls.length);
    set({ ballPhase: "flipping", pendingBall });
  },

  setBallPhase: (ballPhase) => set({ ballPhase }),

  commitBall: () => {
    const { pendingBall, currentInnings, innings, phase } = get();
    if (!pendingBall || phase !== "batting") {
      set({ ballPhase: "idle" });
      return;
    }
    const current = innings[currentInnings];
    if (!current) {
      set({ ballPhase: "idle", pendingBall: null });
      return;
    }
    let next = applyBall(current, pendingBall);
    if (currentInnings === 1) {
      const first = innings[0];
      if (first && chaseComplete(first, next)) {
        next = { ...next, complete: true };
      }
    }
    const nextInnings: [Innings | null, Innings | null] = [...innings];
    nextInnings[currentInnings] = next;

    if (!next.complete) {
      set({
        innings: nextInnings,
        pendingBall: null,
        ballPhase: "idle",
      });
      return;
    }

    if (currentInnings === 0) {
      set({
        innings: nextInnings,
        pendingBall: null,
        ballPhase: "idle",
        phase: "inningsBreak",
      });
      return;
    }

    set({
      innings: nextInnings,
      pendingBall: null,
      ballPhase: "idle",
      phase: "result",
    });
  },

  beginChase: () => {
    if (get().phase !== "inningsBreak") return;
    set({
      phase: "batting",
      currentInnings: 1,
      innings: [get().innings[0], emptyInnings(1)],
      ballPhase: "idle",
      pendingBall: null,
    });
  },

  newMatch: () => {
    const players = get().players;
    set({ ...initial(), players, muted: get().muted });
  },

  toggleMute: () => set({ muted: !get().muted }),
}));

export function hydrateNames() {
  const names = loadSavedNames();
  useGame.setState({ players: names });
}

export function selectCurrentInnings(s: GameStore): Innings | null {
  return s.innings[s.currentInnings];
}

export function selectBatterName(s: GameStore): string {
  return s.players[s.currentInnings];
}

export type { Ball, BallPhase };
