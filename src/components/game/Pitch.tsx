import { cn } from "@/lib/utils";
import type { Ball, BallPhase } from "@/lib/game/types";

interface PitchProps {
  phase: BallPhase;
  ball: Ball | null;
}

export function Pitch({ phase, ball }: PitchProps) {
  const shot = ball?.digit ?? -1;
  const showBurst = phase === "shot" && ball;
  const shaking = phase === "shot" && (ball?.isOut || ball?.isSix);

  return (
    <div
      className={cn("pitch-wrap border border-border", shaking && "is-shaking")}
      data-phase={phase}
      data-shot={shot}
      aria-hidden="true"
    >
      <svg className="pitch-svg" viewBox="0 0 640 360" role="img">
        <defs>
          <linearGradient id="bc-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b2420" />
            <stop offset="1" stopColor="#24352b" />
          </linearGradient>
          <linearGradient id="bc-field" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3a6b4a" />
            <stop offset="1" stopColor="#234a34" />
          </linearGradient>
          <pattern id="bc-grass" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M0 12 L12 0" stroke="#1e3d2a" strokeWidth="0.6" opacity="0.35" />
          </pattern>
        </defs>

        <rect width="640" height="360" fill="url(#bc-sky)" />
        <rect x="0" y="78" width="640" height="282" fill="url(#bc-field)" />
        <rect x="0" y="78" width="640" height="282" fill="url(#bc-grass)" />

        <g opacity="0.55">
          <rect x="24" y="18" width="592" height="62" rx="4" fill="#161c18" />
          <rect x="40" y="28" width="70" height="36" rx="2" fill="#1e2621" />
          <rect x="130" y="28" width="90" height="36" rx="2" fill="#1e2621" />
          <rect x="240" y="22" width="160" height="48" rx="3" fill="#202824" />
          <rect x="420" y="28" width="90" height="36" rx="2" fill="#1e2621" />
          <rect x="530" y="28" width="70" height="36" rx="2" fill="#1e2621" />
        </g>

        <ellipse cx="320" cy="232" rx="292" ry="118" fill="#2f5c3e" />
        <ellipse cx="320" cy="232" rx="292" ry="118" fill="url(#bc-grass)" opacity="0.5" />

        <rect x="168" y="196" width="304" height="52" rx="4" fill="#cbb892" />
        <rect x="176" y="202" width="288" height="40" rx="3" fill="#d8c49a" />
        <line x1="214" y1="202" x2="214" y2="242" stroke="#b89d6e" strokeWidth="1.5" />
        <line x1="426" y1="202" x2="426" y2="242" stroke="#b89d6e" strokeWidth="1.5" />
        <line x1="176" y1="222" x2="464" y2="222" stroke="#c4ae80" strokeWidth="0.8" opacity="0.7" />

        <g className="bowler-group" transform="translate(186 188)">
          <ellipse cx="8" cy="46" rx="10" ry="4" fill="#1e3d2a" opacity="0.35" />
          <g className="bowler-body">
            <circle cx="8" cy="4" r="6" fill="#d4b896" />
            <rect x="1" y="10" width="14" height="18" rx="3" fill="#f2eee4" />
            <rect x="2" y="28" width="5" height="16" rx="2" fill="#f2eee4" />
            <rect x="9" y="28" width="5" height="16" rx="2" fill="#f2eee4" />
            <g className="bowling-arm">
              <rect x="12" y="10" width="4" height="16" rx="2" fill="#f2eee4" />
            </g>
          </g>
        </g>

        <g transform="translate(478 176)">
          <g className="batsman-body">
            <ellipse cx="10" cy="58" rx="12" ry="4" fill="#1e3d2a" opacity="0.35" />
            <ellipse cx="10" cy="-2" rx="8" ry="4" fill="#1a221c" />
            <circle cx="10" cy="6" r="7" fill="#d4b896" />
            <rect x="2" y="13" width="16" height="20" rx="4" fill="#f2eee4" />
            <rect x="1" y="33" width="7" height="20" rx="2" fill="#efe8d6" />
            <rect x="12" y="33" width="7" height="20" rx="2" fill="#efe8d6" />
            <g className="bat">
              <rect x="16" y="8" width="5" height="34" rx="1.5" fill="#b08968" />
              <rect x="16.5" y="4" width="4" height="8" rx="1" fill="#d4b896" />
            </g>
          </g>
        </g>

        <g transform="translate(528 198)">
          <g className="stump stump-a">
            <rect x="0" y="8" width="3.2" height="28" rx="1" fill="#efe8d6" />
          </g>
          <g className="stump stump-b">
            <rect x="6" y="8" width="3.2" height="28" rx="1" fill="#efe8d6" />
          </g>
          <g className="stump stump-c">
            <rect x="12" y="8" width="3.2" height="28" rx="1" fill="#efe8d6" />
          </g>
          <rect className="bail" x="0" y="6" width="8" height="2" rx="1" fill="#cbb892" />
          <rect className="bail" x="7" y="6" width="8" height="2" rx="1" fill="#cbb892" />
        </g>

        <g transform="translate(196 204)">
          <rect x="0" y="8" width="3" height="24" rx="1" fill="#efe8d6" opacity="0.7" />
          <rect x="5" y="8" width="3" height="24" rx="1" fill="#efe8d6" opacity="0.7" />
          <rect x="10" y="8" width="3" height="24" rx="1" fill="#efe8d6" opacity="0.7" />
        </g>

        <g className="cricket-ball" transform="translate(198 198)">
          <circle r="5" fill="#b33a2b" />
          <path d="M-3 -1 Q0 2 3 -1" fill="none" stroke="#f2eee4" strokeWidth="0.7" />
        </g>

        <g opacity="0.7">
          <circle cx="96" cy="168" r="4" fill="#f2eee4" />
          <circle cx="548" cy="150" r="4" fill="#f2eee4" />
          <circle cx="320" cy="128" r="4" fill="#f2eee4" />
          <circle cx="80" cy="268" r="4" fill="#f2eee4" />
          <circle cx="560" cy="276" r="4" fill="#f2eee4" />
        </g>
      </svg>

      {showBurst && ball ? (
        <div
          className={cn(
            "run-burst",
            ball.isOut && "is-out",
            (ball.isFour || ball.isSix) && "is-boundary",
          )}
        >
          {ball.isOut ? "OUT" : ball.digit === 0 ? "DOT" : ball.digit}
        </div>
      ) : null}
    </div>
  );
}
