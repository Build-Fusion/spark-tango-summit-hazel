import {
  BALLS_PER_OVER,
  OUT_DIGIT,
  TOTAL_BALLS,
  type Ball,
  type Innings,
  type MatchResult,
} from "./types";

export function randomPage(): number {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return 21 + (buf[0]! % 478);
}

export function pageToDigit(page: number): number {
  return page % 10;
}

export function digitToOutcome(digit: number): { runs: number; isOut: boolean } {
  if (digit === OUT_DIGIT) return { runs: 0, isOut: true };
  return { runs: digit, isOut: false };
}

export function makeBall(page: number, ballsFaced: number): Ball {
  const digit = pageToDigit(page);
  const { runs, isOut } = digitToOutcome(digit);
  return {
    over: Math.floor(ballsFaced / BALLS_PER_OVER),
    ball: ballsFaced % BALLS_PER_OVER,
    page,
    digit,
    runs,
    isOut,
    isFour: !isOut && digit === 4,
    isSix: !isOut && digit === 6,
  };
}

export function emptyInnings(playerIndex: 0 | 1): Innings {
  return {
    playerIndex,
    balls: [],
    runs: 0,
    out: false,
    complete: false,
  };
}

export function formatOvers(ballsFaced: number): string {
  const ov = Math.floor(ballsFaced / BALLS_PER_OVER);
  const b = ballsFaced % BALLS_PER_OVER;
  return `${ov}.${b}`;
}

export function strikeRate(runs: number, ballsFaced: number): number {
  if (ballsFaced === 0) return 0;
  return Math.round((runs / ballsFaced) * 100);
}

export function applyBall(innings: Innings, ball: Ball): Innings {
  const balls = [...innings.balls, ball];
  const runs = innings.runs + ball.runs;
  const out = innings.out || ball.isOut;
  const complete = out || balls.length >= TOTAL_BALLS;
  return { ...innings, balls, runs, out, complete };
}

export function chaseComplete(first: Innings, second: Innings): boolean {
  return second.runs > first.runs;
}

export function matchResult(
  first: Innings,
  second: Innings,
  names: [string, string],
): MatchResult {
  const remaining = TOTAL_BALLS - second.balls.length;
  if (second.runs > first.runs) {
    const ballWord = remaining === 1 ? "ball" : "balls";
    return {
      winner: 1,
      headline: `${names[1]} wins`,
      detail: `Chased ${first.runs + 1} with ${remaining} ${ballWord} remaining.`,
    };
  }
  if (second.runs === first.runs) {
    return {
      winner: "tie",
      headline: "Match tied",
      detail: `Both sides finished on ${first.runs}.`,
    };
  }
  const margin = first.runs - second.runs;
  const runWord = margin === 1 ? "run" : "runs";
  return {
    winner: 0,
    headline: `${names[0]} wins`,
    detail: `Defended ${first.runs} by ${margin} ${runWord}.`,
  };
}

export function commentary(ball: Ball, batter: string): string {
  if (ball.isOut) return `${batter} is bowled. The last digit was eight.`;
  switch (ball.digit) {
    case 0:
      return "Played back to the bowler. Dot ball.";
    case 1:
      return "Tucked off the pads. One run.";
    case 2:
      return "Worked into the gap. Two runs.";
    case 3:
      return "Quick running between the wickets. Three.";
    case 4:
      return "Cracked through the covers. Four.";
    case 5:
      return "Overthrows in the deep. Five.";
    case 6:
      return "Up and over the rope. Six.";
    case 7:
      return "A scramble in the outfield. Seven.";
    case 9:
      return "Chaos in the field. Nine runs.";
    default:
      return `${ball.runs} ${ball.runs === 1 ? "run" : "runs"} from page ${ball.page}.`;
  }
}

export const NAMES_KEY = "book-cricket:v1:names";

export function loadSavedNames(): [string, string] {
  try {
    const raw = localStorage.getItem(NAMES_KEY);
    if (!raw) return ["Player 1", "Player 2"];
    const parsed = JSON.parse(raw) as unknown;
    if (
      Array.isArray(parsed) &&
      parsed.length === 2 &&
      typeof parsed[0] === "string" &&
      typeof parsed[1] === "string"
    ) {
      return [parsed[0], parsed[1]];
    }
  } catch {
    /* ignore */
  }
  return ["Player 1", "Player 2"];
}

export function saveNames(names: [string, string]) {
  try {
    localStorage.setItem(NAMES_KEY, JSON.stringify(names));
  } catch {
    /* ignore */
  }
}
