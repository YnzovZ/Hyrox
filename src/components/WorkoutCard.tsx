"use client";

import { useRef, useState } from "react";
import { Workout } from "@/lib/data";
import { SwappedWorkout } from "@/lib/storage";

const typeColors: Record<string, string> = {
  run: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  strength: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  hyrox: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  recovery: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  other: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300",
};

const typeLabels: Record<string, string> = {
  run: "Run",
  strength: "Kracht",
  hyrox: "Hyrox",
  recovery: "Herstel",
  other: "Anders",
};

const difficultyDots: Record<string, number> = {
  easy: 1,
  moderate: 2,
  hard: 3,
  race: 4,
};

interface WorkoutCardProps {
  workout: Workout;
  completed?: boolean;
  swapped?: SwappedWorkout | null;
  onClick?: () => void;
  onSwap?: () => void;
}

export default function WorkoutCard({ workout, completed, swapped, onClick, onSwap }: WorkoutCardProps) {
  const [offsetX, setOffsetX] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const dragging = useRef(false);
  const isHorizontal = useRef<boolean | null>(null);

  const REVEAL_THRESHOLD = 60;
  const REVEAL_WIDTH = 100;

  function handleTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    dragging.current = true;
    isHorizontal.current = null;
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!dragging.current) return;
    const dx = e.touches[0].clientX - startX.current;
    const dy = e.touches[0].clientY - startY.current;

    if (isHorizontal.current === null) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        isHorizontal.current = Math.abs(dx) > Math.abs(dy);
      }
      return;
    }

    if (!isHorizontal.current) return;

    const base = revealed ? -REVEAL_WIDTH : 0;
    const next = Math.min(0, Math.max(-REVEAL_WIDTH - 20, base + dx));
    setOffsetX(next);
  }

  function handleTouchEnd() {
    dragging.current = false;
    if (offsetX < -REVEAL_THRESHOLD) {
      setOffsetX(-REVEAL_WIDTH);
      setRevealed(true);
    } else {
      setOffsetX(0);
      setRevealed(false);
    }
    isHorizontal.current = null;
  }

  function handleSwapClick() {
    setOffsetX(0);
    setRevealed(false);
    onSwap?.();
  }

  function handleCardClick() {
    if (revealed) {
      setOffsetX(0);
      setRevealed(false);
      return;
    }
    onClick?.();
  }

  const canSwipe = !completed && !swapped;

  return (
    <div className="relative overflow-hidden rounded-xl">
      {canSwipe && (
        <div className="absolute right-0 top-0 bottom-0 flex w-[100px] items-center justify-center bg-amber-500 rounded-r-xl">
          <button
            onClick={handleSwapClick}
            className="flex flex-col items-center gap-1 text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 3h5v5" />
              <path d="M8 3H3v5" />
              <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
              <path d="m15 9 6-6" />
            </svg>
            <span className="text-xs font-semibold">Verander</span>
          </button>
        </div>
      )}

      <div
        onTouchStart={canSwipe ? handleTouchStart : undefined}
        onTouchMove={canSwipe ? handleTouchMove : undefined}
        onTouchEnd={canSwipe ? handleTouchEnd : undefined}
        style={{ transform: `translateX(${offsetX}px)`, transition: dragging.current ? "none" : "transform 0.2s ease-out" }}
      >
        <button
          onClick={handleCardClick}
          className={`group w-full rounded-xl border p-4 text-left transition-colors ${
            completed || swapped
              ? "border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20"
              : "border-zinc-200 bg-white hover:border-amber-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-amber-700"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="mb-1.5 flex items-center gap-2">
                <span className={`inline-block rounded-full px-2 py-0.5 text-sm font-medium ${typeColors[workout.type]}`}>
                  {typeLabels[workout.type]}
                </span>
                <span className="text-sm text-zinc-400">{workout.duration}</span>
              </div>
              {swapped ? (
                <>
                  <h3 className="text-base font-semibold text-zinc-400 line-through dark:text-zinc-500">
                    {workout.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-sm font-medium ${typeColors[swapped.type]}`}>
                      {typeLabels[swapped.type]}
                    </span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {swapped.description}
                    </span>
                  </div>
                  <div className="mt-0.5 flex gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                    {swapped.distance && <span>{swapped.distance}</span>}
                    {swapped.time && <span>{swapped.time}</span>}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {workout.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {workout.description}
                  </p>
                </>
              )}
            </div>
            <div className="flex flex-col items-end gap-2">
              {(completed || swapped) && (
                <span className="text-green-600 dark:text-green-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
              )}
              <div className="flex gap-0.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${
                      i < difficultyDots[workout.difficulty]
                        ? "bg-amber-500"
                        : "bg-zinc-200 dark:bg-zinc-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
