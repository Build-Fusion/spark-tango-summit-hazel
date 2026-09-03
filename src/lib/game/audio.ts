let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new AC({ latencyHint: "interactive" });
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.7;
      master.connect(ctx.destination);
    }
    return ctx;
  } catch {
    return null;
  }
}

export function unlockAudio() {
  const ac = getCtx();
  if (!ac) return;
  if (ac.state === "suspended") void ac.resume();
}

export function setMuted(value: boolean) {
  muted = value;
  if (master && ctx) {
    master.gain.setTargetAtTime(value ? 0 : 0.7, ctx.currentTime, 0.03);
  }
}

function envGain(ac: AudioContext, duration: number, peak = 0.4): GainNode {
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(peak, ac.currentTime + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);
  g.connect(master!);
  return g;
}

function noise(ac: AudioContext, seconds: number): AudioBufferSourceNode {
  const length = Math.max(1, Math.floor(ac.sampleRate * seconds));
  const buffer = ac.createBuffer(1, length, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  const src = ac.createBufferSource();
  src.buffer = buffer;
  return src;
}

export function playPageFlip() {
  const ac = getCtx();
  if (!ac || muted) return;
  const src = noise(ac, 0.22);
  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 900;
  filter.Q.value = 0.7;
  src.connect(filter);
  filter.connect(envGain(ac, 0.22, 0.28));
  src.playbackRate.value = 0.9 + Math.random() * 0.2;
  src.start();
}

export function playBat() {
  const ac = getCtx();
  if (!ac || muted) return;
  const src = noise(ac, 0.08);
  const filter = ac.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 1200;
  src.connect(filter);
  filter.connect(envGain(ac, 0.08, 0.45));
  src.start();

  const osc = ac.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(180, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(70, ac.currentTime + 0.12);
  osc.connect(envGain(ac, 0.14, 0.22));
  osc.start();
  osc.stop(ac.currentTime + 0.15);
}

export function playBoundary(isSix: boolean) {
  playBat();
  const ac = getCtx();
  if (!ac || muted) return;
  const src = noise(ac, isSix ? 0.7 : 0.45);
  const filter = ac.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = isSix ? 900 : 700;
  src.connect(filter);
  filter.connect(envGain(ac, isSix ? 0.7 : 0.45, isSix ? 0.22 : 0.16));
  src.start();
}

export function playWicket() {
  const ac = getCtx();
  if (!ac || muted) return;
  const freqs = [240, 170, 110];
  freqs.forEach((f, i) => {
    const osc = ac.createOscillator();
    osc.type = "square";
    osc.frequency.value = f + Math.random() * 20;
    const g = envGain(ac, 0.12, 0.12);
    osc.connect(g);
    const t = ac.currentTime + i * 0.04;
    osc.start(t);
    osc.stop(t + 0.12);
  });
  const src = noise(ac, 0.2);
  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1500;
  src.connect(filter);
  filter.connect(envGain(ac, 0.2, 0.3));
  src.start();
}

export function playDot() {
  const ac = getCtx();
  if (!ac || muted) return;
  const osc = ac.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 220;
  osc.connect(envGain(ac, 0.08, 0.08));
  osc.start();
  osc.stop(ac.currentTime + 0.09);
}

export function playRuns() {
  playBat();
}

export function playUi() {
  const ac = getCtx();
  if (!ac || muted) return;
  const osc = ac.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 660;
  osc.connect(envGain(ac, 0.06, 0.08));
  osc.start();
  osc.stop(ac.currentTime + 0.07);
}

export function playForBall(isOut: boolean, isFour: boolean, isSix: boolean, runs: number) {
  if (isOut) playWicket();
  else if (isSix || isFour) playBoundary(isSix);
  else if (runs === 0) playDot();
  else playRuns();
}

if (typeof window !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") unlockAudio();
  });
}
