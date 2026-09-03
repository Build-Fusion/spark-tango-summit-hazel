export const OVERS_PER_INNINGS = 5;
export const BALLS_PER_OVER = 6;
export const TOTAL_BALLS = OVERS_PER_INNINGS * BALLS_PER_OVER;
export const OUT_DIGIT = 8;

export type Phase = "setup" | "batting" | "inningsBreak" | "result";
export type BallPhase = "idle" | "flipping" | "revealing" | "shot";

export interface Ball {
  over: number;
  ball: number;
  page: number;
  digit: number;
  runs: number;
  isOut: boolean;
  isFour: boolean;
  isSix: boolean;
}

export interface Innings {
  playerIndex: 0 | 1;
  balls: Ball[];
  runs: number;
  out: boolean;
  complete: boolean;
}

export interface MatchResult {
  winner: 0 | 1 | "tie";
  headline: string;
  detail: string;
}

export interface GameState {
  players: [string, string];
  phase: Phase;
  ballPhase: BallPhase;
  currentInnings: 0 | 1;
  innings: [Innings | null, Innings | null];
  pendingBall: Ball | null;
  muted: boolean;
}
