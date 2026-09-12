"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type TimerMode = "stopwatch" | "interval";

interface Lap {
  label: string;
  time: number;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((ms % 1000) / 10);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
}

function formatTimeShort(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

const hyroxLapLabels = [
  "Run 1", "SkiErg", "Run 2", "Sled Push", "Run 3", "Sled Pull",
  "Run 4", "Burpee BJ", "Run 5", "Rowing", "Run 6", "Farmers Carry",
  "Run 7", "Sandbag Lunges", "Run 8", "Wall Balls",
];

export default function TimerPage() {
  const [mode, setMode] = useState<TimerMode>("stopwatch");
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [currentLapIndex, setCurrentLapIndex] = useState(0);
  const startTimeRef = useRef<number>(0);
  const animationRef = useRef<number>(0);
  const lastLapTimeRef = useRef<number>(0);

  // Interval timer state
  const [workTime, setWorkTime] = useState(60);
  const [restTime, setRestTime] = useState(30);
  const [rounds, setRounds] = useState(8);
  const [currentRound, setCurrentRound] = useState(1);
  const [isWork, setIsWork] = useState(true);
  const [intervalRemaining, setIntervalRemaining] = useState(60);

  const tick = useCallback(() => {
    if (mode === "stopwatch") {
      setElapsed(Date.now() - startTimeRef.current);
    }
    animationRef.current = requestAnimationFrame(tick);
  }, [mode]);

  useEffect(() => {
    if (running) {
      if (mode === "stopwatch") {
        startTimeRef.current = Date.now() - elapsed;
        animationRef.current = requestAnimationFrame(tick);
      }
    }
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, mode, tick]);

  // Interval timer logic
  useEffect(() => {
    if (!running || mode !== "interval") return;

    const interval = setInterval(() => {
      setIntervalRemaining((prev) => {
        if (prev <= 1) {
          if (isWork) {
            if (currentRound >= rounds) {
              setRunning(false);
              return 0;
            }
            setIsWork(false);
            return restTime;
          } else {
            setIsWork(true);
            setCurrentRound((r) => r + 1);
            return workTime;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, mode, isWork, currentRound, rounds, workTime, restTime]);

  function handleStartStop() {
    if (running) {
      setRunning(false);
    } else {
      if (mode === "interval" && intervalRemaining === 0) {
        resetTimer();
      }
      setRunning(true);
    }
  }

  function handleLap() {
    if (!running || mode !== "stopwatch") return;
    const lapTime = elapsed - lastLapTimeRef.current;
    lastLapTimeRef.current = elapsed;
    const label = hyroxLapLabels[currentLapIndex] || `Lap ${currentLapIndex + 1}`;
    setLaps((prev) => [...prev, { label, time: lapTime }]);
    setCurrentLapIndex((prev) => prev + 1);
  }

  function resetTimer() {
    setRunning(false);
    cancelAnimationFrame(animationRef.current);
    if (mode === "stopwatch") {
      setElapsed(0);
      setLaps([]);
      setCurrentLapIndex(0);
      lastLapTimeRef.current = 0;
    } else {
      setCurrentRound(1);
      setIsWork(true);
      setIntervalRemaining(workTime);
    }
  }

  return (
    <main className="mx-auto max-w-lg px-4 pt-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Timer</h1>
        <p className="text-base text-zinc-500 dark:text-zinc-400">
          Stopwatch met Hyrox-splits of interval timer
        </p>
      </header>

      <div className="mb-6 flex rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800">
        <button
          onClick={() => { if (!running) { setMode("stopwatch"); resetTimer(); } }}
          className={`flex-1 rounded-lg py-2 text-base font-medium transition-all ${
            mode === "stopwatch"
              ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100"
              : "text-zinc-500 dark:text-zinc-400"
          }`}
        >
          Stopwatch
        </button>
        <button
          onClick={() => { if (!running) { setMode("interval"); resetTimer(); } }}
          className={`flex-1 rounded-lg py-2 text-base font-medium transition-all ${
            mode === "interval"
              ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100"
              : "text-zinc-500 dark:text-zinc-400"
          }`}
        >
          Interval
        </button>
      </div>

      {mode === "stopwatch" ? (
        <>
          <div className="mb-8 text-center">
            <p className="text-6xl font-mono font-bold tabular-nums tracking-tight">
              {formatTime(elapsed)}
            </p>
            {currentLapIndex < hyroxLapLabels.length && (
              <p className="mt-2 text-base text-amber-600 dark:text-amber-400">
                {hyroxLapLabels[currentLapIndex]}
              </p>
            )}
          </div>

          <div className="mb-6 flex justify-center gap-4">
            <button
              onClick={resetTimer}
              className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-zinc-300 text-zinc-500 transition-all hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-zinc-500"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 4v6h6" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </button>
            <button
              onClick={handleStartStop}
              className={`flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg transition-all active:scale-95 ${
                running
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-amber-500 hover:bg-amber-600"
              }`}
            >
              {running ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
            <button
              onClick={handleLap}
              disabled={!running}
              className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-300 text-amber-600 transition-all hover:border-amber-400 disabled:border-zinc-200 disabled:text-zinc-300 dark:border-amber-700 dark:text-amber-400 dark:disabled:border-zinc-700 dark:disabled:text-zinc-600"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6" />
                <path d="M10 14L21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
            </button>
          </div>

          {laps.length > 0 && (
            <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="border-b border-zinc-100 px-4 py-2.5 dark:border-zinc-800">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Splits
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {[...laps].reverse().map((lap, i) => (
                  <div
                    key={laps.length - 1 - i}
                    className="flex items-center justify-between border-b border-zinc-50 px-4 py-2.5 last:border-0 dark:border-zinc-800/50"
                  >
                    <span className="text-base font-medium text-zinc-700 dark:text-zinc-300">
                      {lap.label}
                    </span>
                    <span className="font-mono text-base tabular-nums text-zinc-900 dark:text-zinc-100">
                      {formatTime(lap.time)}
                    </span>
                  </div>
                ))}
              </div>
              {laps.length > 0 && (
                <div className="border-t border-zinc-200 px-4 py-2.5 dark:border-zinc-700">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-zinc-700 dark:text-zinc-300">Totaal</span>
                    <span className="font-mono text-base font-semibold tabular-nums text-amber-600 dark:text-amber-400">
                      {formatTime(laps.reduce((sum, l) => sum + l.time, 0))}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          {!running && intervalRemaining === workTime && currentRound === 1 && (
            <div className="mb-6 space-y-4">
              <div>
                <label className="mb-1 block text-base font-medium text-zinc-600 dark:text-zinc-400">
                  Work (sec)
                </label>
                <input
                  type="number"
                  value={workTime}
                  onChange={(e) => {
                    const v = parseInt(e.target.value) || 10;
                    setWorkTime(v);
                    setIntervalRemaining(v);
                  }}
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-center font-mono text-lg dark:border-zinc-700 dark:bg-zinc-800"
                  min={5}
                />
              </div>
              <div>
                <label className="mb-1 block text-base font-medium text-zinc-600 dark:text-zinc-400">
                  Rest (sec)
                </label>
                <input
                  type="number"
                  value={restTime}
                  onChange={(e) => setRestTime(parseInt(e.target.value) || 10)}
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-center font-mono text-lg dark:border-zinc-700 dark:bg-zinc-800"
                  min={5}
                />
              </div>
              <div>
                <label className="mb-1 block text-base font-medium text-zinc-600 dark:text-zinc-400">
                  Rondes
                </label>
                <input
                  type="number"
                  value={rounds}
                  onChange={(e) => setRounds(parseInt(e.target.value) || 1)}
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-center font-mono text-lg dark:border-zinc-700 dark:bg-zinc-800"
                  min={1}
                />
              </div>
            </div>
          )}

          <div className="mb-8 text-center">
            <p className="mb-1 text-base font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Ronde {currentRound}/{rounds}
            </p>
            <p className={`text-7xl font-mono font-bold tabular-nums ${
              isWork ? "text-amber-500" : "text-green-500"
            }`}>
              {formatTimeShort(intervalRemaining * 1000)}
            </p>
            <p className={`mt-2 text-xl font-semibold ${
              isWork ? "text-amber-600 dark:text-amber-400" : "text-green-600 dark:text-green-400"
            }`}>
              {isWork ? "WORK" : "REST"}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={resetTimer}
              className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-zinc-300 text-zinc-500 transition-all hover:border-zinc-400 dark:border-zinc-600 dark:text-zinc-400"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 4v6h6" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </button>
            <button
              onClick={handleStartStop}
              className={`flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg transition-all active:scale-95 ${
                running
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-amber-500 hover:bg-amber-600"
              }`}
            >
              {running ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
