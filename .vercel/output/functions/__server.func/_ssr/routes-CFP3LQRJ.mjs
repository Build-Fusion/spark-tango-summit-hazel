import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as RotateCcw, n as Volume2, o as Play, r as Trophy, s as BookOpen, t as VolumeX } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CFP3LQRJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-[background-color,color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent/90",
			secondary: "bg-surface-2 text-fg border border-border hover:bg-surface",
			ghost: "text-muted hover:text-fg hover:bg-surface-2",
			outline: "border border-border bg-transparent text-fg hover:bg-surface-2"
		},
		size: {
			default: "h-11 rounded-md px-5",
			sm: "h-9 rounded-sm px-3 text-xs",
			lg: "h-12 rounded-lg px-6 text-base",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Input({ className, type = "text", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md border border-border bg-surface px-3 text-base text-fg", "placeholder:text-subtle shadow-none transition-[border-color,box-shadow] duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40", "disabled:cursor-not-allowed disabled:opacity-50", className),
		suppressHydrationWarning: true,
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-xs font-medium uppercase tracking-[0.16em] text-muted", className),
		...props
	});
}
function randomPage() {
	const buf = /* @__PURE__ */ new Uint32Array(1);
	crypto.getRandomValues(buf);
	return 21 + buf[0] % 478;
}
function pageToDigit(page) {
	return page % 10;
}
function digitToOutcome(digit) {
	if (digit === 8) return {
		runs: 0,
		isOut: true
	};
	return {
		runs: digit,
		isOut: false
	};
}
function makeBall(page, ballsFaced) {
	const digit = pageToDigit(page);
	const { runs, isOut } = digitToOutcome(digit);
	return {
		over: Math.floor(ballsFaced / 6),
		ball: ballsFaced % 6,
		page,
		digit,
		runs,
		isOut,
		isFour: !isOut && digit === 4,
		isSix: !isOut && digit === 6
	};
}
function emptyInnings(playerIndex) {
	return {
		playerIndex,
		balls: [],
		runs: 0,
		out: false,
		complete: false
	};
}
function formatOvers(ballsFaced) {
	return `${Math.floor(ballsFaced / 6)}.${ballsFaced % 6}`;
}
function strikeRate(runs, ballsFaced) {
	if (ballsFaced === 0) return 0;
	return Math.round(runs / ballsFaced * 100);
}
function applyBall(innings, ball) {
	const balls = [...innings.balls, ball];
	const runs = innings.runs + ball.runs;
	const out = innings.out || ball.isOut;
	const complete = out || balls.length >= 30;
	return {
		...innings,
		balls,
		runs,
		out,
		complete
	};
}
function chaseComplete(first, second) {
	return second.runs > first.runs;
}
function matchResult(first, second, names) {
	const remaining = 30 - second.balls.length;
	if (second.runs > first.runs) {
		const ballWord = remaining === 1 ? "ball" : "balls";
		return {
			winner: 1,
			headline: `${names[1]} wins`,
			detail: `Chased ${first.runs + 1} with ${remaining} ${ballWord} remaining.`
		};
	}
	if (second.runs === first.runs) return {
		winner: "tie",
		headline: "Match tied",
		detail: `Both sides finished on ${first.runs}.`
	};
	const margin = first.runs - second.runs;
	const runWord = margin === 1 ? "run" : "runs";
	return {
		winner: 0,
		headline: `${names[0]} wins`,
		detail: `Defended ${first.runs} by ${margin} ${runWord}.`
	};
}
function commentary(ball, batter) {
	if (ball.isOut) return `${batter} is bowled. The last digit was eight.`;
	switch (ball.digit) {
		case 0: return "Played back to the bowler. Dot ball.";
		case 1: return "Tucked off the pads. One run.";
		case 2: return "Worked into the gap. Two runs.";
		case 3: return "Quick running between the wickets. Three.";
		case 4: return "Cracked through the covers. Four.";
		case 5: return "Overthrows in the deep. Five.";
		case 6: return "Up and over the rope. Six.";
		case 7: return "A scramble in the outfield. Seven.";
		case 9: return "Chaos in the field. Nine runs.";
		default: return `${ball.runs} ${ball.runs === 1 ? "run" : "runs"} from page ${ball.page}.`;
	}
}
var NAMES_KEY = "book-cricket:v1:names";
function loadSavedNames() {
	try {
		const raw = localStorage.getItem(NAMES_KEY);
		if (!raw) return ["Player 1", "Player 2"];
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed) && parsed.length === 2 && typeof parsed[0] === "string" && typeof parsed[1] === "string") return [parsed[0], parsed[1]];
	} catch {}
	return ["Player 1", "Player 2"];
}
function saveNames(names) {
	try {
		localStorage.setItem(NAMES_KEY, JSON.stringify(names));
	} catch {}
}
function cleanName(value, fallback) {
	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed.slice(0, 18) : fallback;
}
var initial = () => ({
	players: ["Player 1", "Player 2"],
	phase: "setup",
	ballPhase: "idle",
	currentInnings: 0,
	innings: [null, null],
	pendingBall: null,
	muted: false
});
var useGame = create((set, get) => ({
	...initial(),
	setName: (index, value) => {
		const players = [...get().players];
		players[index] = value;
		set({ players });
	},
	startMatch: () => {
		const raw = get().players;
		const players = [cleanName(raw[0], "Player 1"), cleanName(raw[1], "Player 2")];
		saveNames(players);
		set({
			players,
			phase: "batting",
			ballPhase: "idle",
			currentInnings: 0,
			innings: [emptyInnings(0), null],
			pendingBall: null
		});
	},
	turnPage: () => {
		const { phase, ballPhase, currentInnings, innings } = get();
		if (phase !== "batting" || ballPhase !== "idle") return;
		const inn = innings[currentInnings];
		if (!inn || inn.complete) return;
		set({
			ballPhase: "flipping",
			pendingBall: makeBall(randomPage(), inn.balls.length)
		});
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
			set({
				ballPhase: "idle",
				pendingBall: null
			});
			return;
		}
		let next = applyBall(current, pendingBall);
		if (currentInnings === 1) {
			const first = innings[0];
			if (first && chaseComplete(first, next)) next = {
				...next,
				complete: true
			};
		}
		const nextInnings = [...innings];
		nextInnings[currentInnings] = next;
		if (!next.complete) {
			set({
				innings: nextInnings,
				pendingBall: null,
				ballPhase: "idle"
			});
			return;
		}
		if (currentInnings === 0) {
			set({
				innings: nextInnings,
				pendingBall: null,
				ballPhase: "idle",
				phase: "inningsBreak"
			});
			return;
		}
		set({
			innings: nextInnings,
			pendingBall: null,
			ballPhase: "idle",
			phase: "result"
		});
	},
	beginChase: () => {
		if (get().phase !== "inningsBreak") return;
		set({
			phase: "batting",
			currentInnings: 1,
			innings: [get().innings[0], emptyInnings(1)],
			ballPhase: "idle",
			pendingBall: null
		});
	},
	newMatch: () => {
		const players = get().players;
		set({
			...initial(),
			players,
			muted: get().muted
		});
	},
	toggleMute: () => set({ muted: !get().muted })
}));
function hydrateNames() {
	const names = loadSavedNames();
	useGame.setState({ players: names });
}
function selectCurrentInnings(s) {
	return s.innings[s.currentInnings];
}
function selectBatterName(s) {
	return s.players[s.currentInnings];
}
var ctx = null;
var master = null;
var muted = false;
function getCtx() {
	if (typeof window === "undefined") return null;
	try {
		if (!ctx) {
			ctx = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: "interactive" });
			master = ctx.createGain();
			master.gain.value = muted ? 0 : .7;
			master.connect(ctx.destination);
		}
		return ctx;
	} catch {
		return null;
	}
}
function unlockAudio() {
	const ac = getCtx();
	if (!ac) return;
	if (ac.state === "suspended") ac.resume();
}
function setMuted(value) {
	muted = value;
	if (master && ctx) master.gain.setTargetAtTime(value ? 0 : .7, ctx.currentTime, .03);
}
function envGain(ac, duration, peak = .4) {
	const g = ac.createGain();
	g.gain.setValueAtTime(1e-4, ac.currentTime);
	g.gain.exponentialRampToValueAtTime(peak, ac.currentTime + .012);
	g.gain.exponentialRampToValueAtTime(1e-4, ac.currentTime + duration);
	g.connect(master);
	return g;
}
function noise(ac, seconds) {
	const length = Math.max(1, Math.floor(ac.sampleRate * seconds));
	const buffer = ac.createBuffer(1, length, ac.sampleRate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
	const src = ac.createBufferSource();
	src.buffer = buffer;
	return src;
}
function playPageFlip() {
	const ac = getCtx();
	if (!ac || muted) return;
	const src = noise(ac, .22);
	const filter = ac.createBiquadFilter();
	filter.type = "bandpass";
	filter.frequency.value = 900;
	filter.Q.value = .7;
	src.connect(filter);
	filter.connect(envGain(ac, .22, .28));
	src.playbackRate.value = .9 + Math.random() * .2;
	src.start();
}
function playBat() {
	const ac = getCtx();
	if (!ac || muted) return;
	const src = noise(ac, .08);
	const filter = ac.createBiquadFilter();
	filter.type = "highpass";
	filter.frequency.value = 1200;
	src.connect(filter);
	filter.connect(envGain(ac, .08, .45));
	src.start();
	const osc = ac.createOscillator();
	osc.type = "triangle";
	osc.frequency.setValueAtTime(180, ac.currentTime);
	osc.frequency.exponentialRampToValueAtTime(70, ac.currentTime + .12);
	osc.connect(envGain(ac, .14, .22));
	osc.start();
	osc.stop(ac.currentTime + .15);
}
function playBoundary(isSix) {
	playBat();
	const ac = getCtx();
	if (!ac || muted) return;
	const src = noise(ac, isSix ? .7 : .45);
	const filter = ac.createBiquadFilter();
	filter.type = "lowpass";
	filter.frequency.value = isSix ? 900 : 700;
	src.connect(filter);
	filter.connect(envGain(ac, isSix ? .7 : .45, isSix ? .22 : .16));
	src.start();
}
function playWicket() {
	const ac = getCtx();
	if (!ac || muted) return;
	[
		240,
		170,
		110
	].forEach((f, i) => {
		const osc = ac.createOscillator();
		osc.type = "square";
		osc.frequency.value = f + Math.random() * 20;
		const g = envGain(ac, .12, .12);
		osc.connect(g);
		const t = ac.currentTime + i * .04;
		osc.start(t);
		osc.stop(t + .12);
	});
	const src = noise(ac, .2);
	const filter = ac.createBiquadFilter();
	filter.type = "bandpass";
	filter.frequency.value = 1500;
	src.connect(filter);
	filter.connect(envGain(ac, .2, .3));
	src.start();
}
function playDot() {
	const ac = getCtx();
	if (!ac || muted) return;
	const osc = ac.createOscillator();
	osc.type = "sine";
	osc.frequency.value = 220;
	osc.connect(envGain(ac, .08, .08));
	osc.start();
	osc.stop(ac.currentTime + .09);
}
function playRuns() {
	playBat();
}
function playUi() {
	const ac = getCtx();
	if (!ac || muted) return;
	const osc = ac.createOscillator();
	osc.type = "sine";
	osc.frequency.value = 660;
	osc.connect(envGain(ac, .06, .08));
	osc.start();
	osc.stop(ac.currentTime + .07);
}
function playForBall(isOut, isFour, isSix, runs) {
	if (isOut) playWicket();
	else if (isSix || isFour) playBoundary(isSix);
	else if (runs === 0) playDot();
	else playRuns();
}
if (typeof window !== "undefined") document.addEventListener("visibilitychange", () => {
	if (document.visibilityState === "visible") unlockAudio();
});
function TitleScreen() {
	const players = useGame((s) => s.players);
	const setName = useGame((s) => s.setName);
	const startMatch = useGame((s) => s.startMatch);
	const [howTo, setHowTo] = (0, import_react.useState)(false);
	function start() {
		startMatch();
		unlockAudio();
		playUi();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "relative mx-auto flex min-h-[calc(100dvh-4.5rem)] w-full max-w-lg flex-col justify-center px-5 py-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stagger-in flex flex-col gap-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-xs font-medium uppercase tracking-[0.28em] text-muted",
							children: "Two players · five overs"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-[clamp(2.6rem,12vw,4.4rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-fg",
							children: ["Book", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block italic font-medium text-accent",
								children: "Cricket"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-sm text-pretty text-muted",
							children: "Flip a page. The last digit is your runs. Land on eight and you are out."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					className: "rounded-xl border border-border bg-surface p-5",
					onSubmit: (e) => {
						e.preventDefault();
						start();
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "p1",
									children: "Batter one"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "p1",
									autoComplete: "nickname",
									maxLength: 18,
									value: players[0],
									onChange: (e) => setName(0, e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "p2",
									children: "Batter two"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "p2",
									autoComplete: "nickname",
									maxLength: 18,
									value: players[1],
									onChange: (e) => setName(1, e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								size: "lg",
								className: "mt-1 w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), "Start match"]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "inline-flex items-center justify-center gap-2 text-sm text-muted transition-colors duration-150 hover:text-fg",
					onClick: () => {
						playUi();
						setHowTo((v) => !v);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }), howTo ? "Hide rules" : "How to play"]
				}),
				howTo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "grid gap-3 rounded-lg border border-border bg-surface-2 p-5 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-fg",
							children: "1. "
						}), "Each player bats five overs (30 balls) or until dismissed."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-fg",
							children: "2. "
						}), "Turn the book. The last digit of the page is the runs from that ball."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-fg",
							children: "3. "
						}), "Eight is bowled. Four is a boundary. Six clears the rope. Zero is a dot."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-fg",
							children: "4. "
						}), "Player two chases player one’s total. Highest score wins."] })
					]
				}) : null
			]
		})
	});
}
var SNIPPETS = [
	"The wicket kept low on a worn strip, and the close fielders crept in.",
	"A late cut, a shout from square leg, the ball racing away to the rope.",
	"He opened the book, found a number, and the innings changed in a digit."
];
function Book({ phase, ball, onTurn, disabled }) {
	const [flicker, setFlicker] = (0, import_react.useState)(247);
	const page = phase === "flipping" ? flicker : ball?.page ?? flicker;
	const digit = page % 10;
	const head = String(page).slice(0, -1);
	const snippet = SNIPPETS[page % SNIPPETS.length];
	const interactive = !disabled && phase === "idle";
	(0, import_react.useEffect)(() => {
		if (phase !== "flipping") return;
		const id = window.setInterval(() => {
			setFlicker(21 + Math.floor(Math.random() * 478));
		}, 42);
		return () => window.clearInterval(id);
	}, [phase]);
	(0, import_react.useEffect)(() => {
		if (ball?.page) setFlicker(ball.page);
	}, [ball?.page]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "book-stage flex flex-col items-center gap-4",
		"data-phase": phase,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onTurn,
			disabled: !interactive,
			"aria-label": "Tap the book",
			className: cn("book-3d appearance-none border-0 bg-transparent p-0 text-left", interactive && "cursor-pointer", !interactive && "cursor-default"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "book-spine" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "book-left" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "book-page p1" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "book-page p2" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "book-page p3 flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xs tracking-widest text-leather/80 uppercase",
							children: "A Cricket Companion"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-3 text-xs leading-4 text-leather/55",
							children: snippet
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-widest text-leather/50",
								children: "Page"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-4xl font-semibold leading-none tracking-tight text-accent-fg tabular-nums",
								children: [head, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("digit-hit", digit === 8 && "is-out"),
									children: digit
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "book-cover flex flex-col items-center justify-center px-5 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-widest text-fg/70 uppercase",
						children: "Match book"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-display text-2xl font-semibold leading-none text-fg",
						children: ["Book", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block italic font-medium",
							children: "Cricket"
						})]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-12 text-center",
			children: [
				phase === "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Tap the book to turn a page"
				}) : null,
				phase === "flipping" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Finding a page…"
				}) : null,
				phase === "revealing" && ball ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg text-fg",
					children: ball.isOut ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Last digit ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-out",
							children: "8"
						}),
						" — out"
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Last digit ",
						ball.digit,
						" — ",
						ball.runs,
						" ",
						ball.runs === 1 ? "run" : "runs"
					] })
				}) : null,
				phase === "shot" && ball ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: ["Page ", ball.page]
				}) : null
			]
		})]
	});
}
function Pitch({ phase, ball }) {
	const shot = ball?.digit ?? -1;
	const showBurst = phase === "shot" && ball;
	const shaking = phase === "shot" && (ball?.isOut || ball?.isSix);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("pitch-wrap border border-border", shaking && "is-shaking"),
		"data-phase": phase,
		"data-shot": shot,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			className: "pitch-svg",
			viewBox: "0 0 640 360",
			role: "img",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "bc-sky",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#1b2420"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#24352b"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "bc-field",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#3a6b4a"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#234a34"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
						id: "bc-grass",
						width: "12",
						height: "12",
						patternUnits: "userSpaceOnUse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M0 12 L12 0",
							stroke: "#1e3d2a",
							strokeWidth: "0.6",
							opacity: "0.35"
						})
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "640",
					height: "360",
					fill: "url(#bc-sky)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "0",
					y: "78",
					width: "640",
					height: "282",
					fill: "url(#bc-field)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "0",
					y: "78",
					width: "640",
					height: "282",
					fill: "url(#bc-grass)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					opacity: "0.55",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "24",
							y: "18",
							width: "592",
							height: "62",
							rx: "4",
							fill: "#161c18"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "40",
							y: "28",
							width: "70",
							height: "36",
							rx: "2",
							fill: "#1e2621"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "130",
							y: "28",
							width: "90",
							height: "36",
							rx: "2",
							fill: "#1e2621"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "240",
							y: "22",
							width: "160",
							height: "48",
							rx: "3",
							fill: "#202824"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "420",
							y: "28",
							width: "90",
							height: "36",
							rx: "2",
							fill: "#1e2621"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "530",
							y: "28",
							width: "70",
							height: "36",
							rx: "2",
							fill: "#1e2621"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "320",
					cy: "232",
					rx: "292",
					ry: "118",
					fill: "#2f5c3e"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "320",
					cy: "232",
					rx: "292",
					ry: "118",
					fill: "url(#bc-grass)",
					opacity: "0.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "168",
					y: "196",
					width: "304",
					height: "52",
					rx: "4",
					fill: "#cbb892"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "176",
					y: "202",
					width: "288",
					height: "40",
					rx: "3",
					fill: "#d8c49a"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "214",
					y1: "202",
					x2: "214",
					y2: "242",
					stroke: "#b89d6e",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "426",
					y1: "202",
					x2: "426",
					y2: "242",
					stroke: "#b89d6e",
					strokeWidth: "1.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "176",
					y1: "222",
					x2: "464",
					y2: "222",
					stroke: "#c4ae80",
					strokeWidth: "0.8",
					opacity: "0.7"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "bowler-group",
					transform: "translate(186 188)",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: "8",
						cy: "46",
						rx: "10",
						ry: "4",
						fill: "#1e3d2a",
						opacity: "0.35"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						className: "bowler-body",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "8",
								cy: "4",
								r: "6",
								fill: "#d4b896"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "1",
								y: "10",
								width: "14",
								height: "18",
								rx: "3",
								fill: "#f2eee4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "2",
								y: "28",
								width: "5",
								height: "16",
								rx: "2",
								fill: "#f2eee4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "9",
								y: "28",
								width: "5",
								height: "16",
								rx: "2",
								fill: "#f2eee4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
								className: "bowling-arm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: "12",
									y: "10",
									width: "4",
									height: "16",
									rx: "2",
									fill: "#f2eee4"
								})
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: "translate(478 176)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						className: "batsman-body",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
								cx: "10",
								cy: "58",
								rx: "12",
								ry: "4",
								fill: "#1e3d2a",
								opacity: "0.35"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
								cx: "10",
								cy: "-2",
								rx: "8",
								ry: "4",
								fill: "#1a221c"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "10",
								cy: "6",
								r: "7",
								fill: "#d4b896"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "2",
								y: "13",
								width: "16",
								height: "20",
								rx: "4",
								fill: "#f2eee4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "1",
								y: "33",
								width: "7",
								height: "20",
								rx: "2",
								fill: "#efe8d6"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "12",
								y: "33",
								width: "7",
								height: "20",
								rx: "2",
								fill: "#efe8d6"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								className: "bat",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: "16",
									y: "8",
									width: "5",
									height: "34",
									rx: "1.5",
									fill: "#b08968"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: "16.5",
									y: "4",
									width: "4",
									height: "8",
									rx: "1",
									fill: "#d4b896"
								})]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					transform: "translate(528 198)",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
							className: "stump stump-a",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "0",
								y: "8",
								width: "3.2",
								height: "28",
								rx: "1",
								fill: "#efe8d6"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
							className: "stump stump-b",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "6",
								y: "8",
								width: "3.2",
								height: "28",
								rx: "1",
								fill: "#efe8d6"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
							className: "stump stump-c",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "12",
								y: "8",
								width: "3.2",
								height: "28",
								rx: "1",
								fill: "#efe8d6"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							className: "bail",
							x: "0",
							y: "6",
							width: "8",
							height: "2",
							rx: "1",
							fill: "#cbb892"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							className: "bail",
							x: "7",
							y: "6",
							width: "8",
							height: "2",
							rx: "1",
							fill: "#cbb892"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					transform: "translate(196 204)",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "0",
							y: "8",
							width: "3",
							height: "24",
							rx: "1",
							fill: "#efe8d6",
							opacity: "0.7"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "5",
							y: "8",
							width: "3",
							height: "24",
							rx: "1",
							fill: "#efe8d6",
							opacity: "0.7"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "10",
							y: "8",
							width: "3",
							height: "24",
							rx: "1",
							fill: "#efe8d6",
							opacity: "0.7"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "cricket-ball",
					transform: "translate(198 198)",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						r: "5",
						fill: "#b33a2b"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M-3 -1 Q0 2 3 -1",
						fill: "none",
						stroke: "#f2eee4",
						strokeWidth: "0.7"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					opacity: "0.7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "96",
							cy: "168",
							r: "4",
							fill: "#f2eee4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "548",
							cy: "150",
							r: "4",
							fill: "#f2eee4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "320",
							cy: "128",
							r: "4",
							fill: "#f2eee4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "80",
							cy: "268",
							r: "4",
							fill: "#f2eee4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "560",
							cy: "276",
							r: "4",
							fill: "#f2eee4"
						})
					]
				})
			]
		}), showBurst && ball ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("run-burst", ball.isOut && "is-out", (ball.isFour || ball.isSix) && "is-boundary"),
			children: ball.isOut ? "OUT" : ball.digit === 0 ? "DOT" : ball.digit
		}) : null]
	});
}
function MatchScreen() {
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
	const ballsLeft = current ? 30 - current.balls.length : 30;
	const need = chasing && current ? Math.max(0, (target ?? 0) - current.runs) : null;
	const lastCommitted = current?.balls[current.balls.length - 1] ?? null;
	const displayBall = pending ?? lastCommitted;
	const line = ballPhase === "shot" && pending ? commentary(pending, batter) : ballPhase === "idle" && lastCommitted ? commentary(lastCommitted, batter) : ballPhase === "idle" ? `${batter} to face.` : null;
	const overBalls = ballsThisOver(current?.balls ?? [], pending);
	function onTurn() {
		unlockAudio();
		turnPage();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-[calc(100dvh-4.5rem)] w-full max-w-6xl flex-col gap-4 px-4 pb-8 md:gap-6 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:items-start lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreCard, {
					batter,
					current,
					players,
					innings,
					chasing: Boolean(chasing),
					target,
					need,
					ballsLeft
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pitch, {
						phase: ballPhase,
						ball: displayBall
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "min-h-10 text-center font-display text-base italic text-fg/90 md:text-lg",
						"aria-live": "polite",
						children: line
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-5 rounded-xl border border-border bg-surface px-4 py-5 md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverStrip, {
						balls: overBalls,
						pending: ballPhase !== "idle" ? pending : null
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Book, {
						phase: ballPhase,
						ball: pending,
						onTurn,
						disabled: phase !== "batting" || ballPhase !== "idle"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						className: "w-full max-w-sm",
						onClick: onTurn,
						disabled: phase !== "batting" || ballPhase !== "idle",
						children: "Turn the page"
					})
				]
			}),
			phase === "inningsBreak" && first ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 flex items-end justify-center bg-bg/70 p-4 sm:items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-xl border border-border bg-surface p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-[0.2em] text-muted",
							children: "Innings break"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-2 font-display text-3xl font-semibold tracking-tight",
							children: [
								players[0],
								" ",
								first.runs,
								first.out ? "" : "*"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-muted",
							children: [
								formatOvers(first.balls.length),
								" overs",
								first.out ? " · all out" : " · not out",
								". ",
								players[1],
								" needs ",
								first.runs + 1,
								" from",
								" ",
								30,
								" balls."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "mt-6 w-full",
							size: "lg",
							onClick: () => {
								beginChase();
								unlockAudio();
								playUi();
							},
							children: [players[1], " to bat"]
						})
					]
				})
			}) : null
		]
	});
}
function ballsThisOver(balls, pending) {
	const over = pending?.over ?? (balls.length === 0 ? 0 : balls[balls.length - 1].over);
	return balls.filter((b) => b.over === over);
}
function ScoreCard({ batter, current, players, innings, chasing, target, need, ballsLeft }) {
	const runs = current?.runs ?? 0;
	const faced = current?.balls.length ?? 0;
	const first = innings[0];
	const second = innings[1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.2em] text-muted",
				children: "Now batting"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-2xl font-semibold tracking-tight text-fg",
				children: batter
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "score-pop mt-1 font-display text-6xl font-semibold leading-none tracking-tight tabular-nums",
				children: [runs, current?.out ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 align-top text-2xl text-out",
					children: "out"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-1 align-top text-2xl text-muted",
					children: "*"
				})]
			}, runs),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted tabular-nums",
				children: [
					formatOvers(faced),
					" ov · ",
					faced,
					" ",
					faced === 1 ? "ball" : "balls",
					" · SR",
					" ",
					strikeRate(runs, faced)
				]
			}),
			chasing && target !== null && need !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 rounded-md bg-surface-2 px-3 py-2 text-sm text-fg",
				children: [
					"Need ",
					need,
					" from ",
					ballsLeft,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: [" · target ", target]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "First innings · five overs or one wicket"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniScore, {
					name: players[0],
					innings: first,
					active: batter === players[0]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniScore, {
					name: players[1],
					innings: second,
					active: batter === players[1]
				})]
			})
		]
	});
}
function MiniScore({ name, innings, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("truncate text-xs uppercase tracking-wide", active ? "text-fg" : "text-muted"),
		children: name
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 font-display text-xl tabular-nums",
		children: innings ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [innings.runs, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-sm text-muted",
			children: [" ", innings.out ? "all out" : innings.complete ? "not out" : ""]
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: "—"
		})
	})] });
}
function OverStrip({ balls, pending }) {
	const slots = Array.from({ length: 6 }, (_, i) => balls[i] ?? null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex w-full max-w-sm items-center justify-center gap-2",
		"aria-label": "This over",
		children: slots.map((ball, i) => {
			const shown = Boolean(pending) && balls.length === i ? pending : ball;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("grid size-10 place-items-center rounded-full border text-sm font-medium tabular-nums", shown?.isOut ? "border-out bg-out/15 text-out" : shown?.isFour || shown?.isSix ? "border-four bg-four/15 text-fg" : shown ? "border-border bg-surface-2 text-fg" : "border-border/70 text-subtle"),
				children: shown ? shown.isOut ? "W" : shown.runs : "·"
			}, i);
		})
	});
}
function ResultScreen() {
	const players = useGame((s) => s.players);
	const first = useGame((s) => s.innings[0]);
	const second = useGame((s) => s.innings[1]);
	const newMatch = useGame((s) => s.newMatch);
	const result = first && second && second.complete ? matchResult(first, second, players) : null;
	if (!result || !first || !second) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto flex min-h-[calc(100dvh-4.5rem)] w-full max-w-lg flex-col justify-center px-5 py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stagger-in flex flex-col gap-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto mb-4 grid size-12 place-items-center rounded-full bg-surface-2 text-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-widest text-muted",
						children: "Match over"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl font-semibold tracking-tight text-fg",
						children: result.headline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: result.detail
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InningsCard, {
						name: players[0],
						innings: first,
						winner: result.winner === 0
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InningsCard, {
						name: players[1],
						innings: second,
						winner: result.winner === 1
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BallLog, {
					label: players[0],
					balls: first.balls
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BallLog, {
					label: players[1],
					balls: second.balls
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "lg",
					className: "w-full",
					onClick: () => {
						newMatch();
						unlockAudio();
						playUi();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "New match"]
				})
			]
		})
	});
}
function InningsCard({ name, innings, winner }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-lg border p-4 text-left", winner ? "border-accent/40 bg-surface-2" : "border-border bg-surface"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-xs uppercase tracking-wide text-muted",
				children: name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-3xl font-semibold tabular-nums",
				children: innings.runs
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted",
				children: [
					formatOvers(innings.balls.length),
					" ov",
					innings.out ? " · out" : " · not out"
				]
			})
		]
	});
}
function BallLog({ label, balls }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-2 text-xs uppercase tracking-wide text-muted",
			children: [label, " · ball by ball"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-1.5",
			children: balls.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("grid size-8 place-items-center rounded-sm text-xs font-medium tabular-nums", b.isOut ? "bg-out/20 text-out" : b.isFour || b.isSix ? "bg-four/20 text-fg" : "bg-surface-2 text-fg"),
				title: `Page ${b.page}`,
				children: b.isOut ? "W" : b.runs
			}, `${b.page}-${i}`))
		})]
	});
}
var TIMING = {
	flipping: 1050,
	revealing: 900,
	shot: 1550
};
var REDUCED = {
	flipping: 180,
	revealing: 280,
	shot: 360
};
function GameApp() {
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
	(0, import_react.useEffect)(() => {
		hydrateNames();
	}, []);
	(0, import_react.useEffect)(() => {
		setMuted(muted);
	}, [muted]);
	(0, import_react.useEffect)(() => {
		if (!deliveryKey) return;
		const t = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? REDUCED : TIMING;
		const timers = [];
		let cancelled = false;
		const wait = (ms) => new Promise((resolve) => {
			timers.push(window.setTimeout(resolve, ms));
		});
		(async () => {
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
				else if (pending.isSix || pending.isFour) navigator.vibrate?.([
					12,
					24,
					12
				]);
			}
			await wait(t.shot);
			if (cancelled) return;
			commitBall();
		})();
		return () => {
			cancelled = true;
			for (const id of timers) window.clearTimeout(id);
		};
	}, [
		deliveryKey,
		setBallPhase,
		commitBall
	]);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if (e.code !== "Space" && e.code !== "Enter") return;
			const s = useGame.getState();
			if (s.phase !== "batting" || s.ballPhase !== "idle") return;
			const tag = e.target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA") return;
			e.preventDefault();
			unlockAudio();
			turnPage();
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [turnPage]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-bg text-fg",
		"data-game-phase": phase,
		"data-ball-phase": ballPhase,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0",
			style: { background: "radial-gradient(ellipse at 50% -10%, color-mix(in oklab, var(--color-pitch) 18%, transparent), transparent 52%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center justify-between px-4 pt-4 md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm tracking-wide text-muted",
						children: phase === "setup" ? "" : "Book Cricket"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "size-11",
						"aria-label": muted ? "Unmute" : "Mute",
						onClick: () => {
							unlockAudio();
							toggleMute();
						},
						children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-5" })
					})]
				}),
				phase === "setup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleScreen, {}) : null,
				phase === "batting" || phase === "inningsBreak" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchScreen, {}) : null,
				phase === "result" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultScreen, {}) : null
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameApp, {});
}
//#endregion
export { Home as component };
