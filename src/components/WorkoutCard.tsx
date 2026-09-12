"use client";

import { Workout } from "@/lib/data";

const typeColors: Record<string, string> = {
  run: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  strength: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  hyrox: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  recovery: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
};

const typeLabels: Record<string, string> = {
  run: "Run",
  strength: "Kracht",
  hyrox: "Hyrox",
  recovery: "Herstel",
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
  onClick?: () => void;
}

export default function WorkoutCard({ workout, completed, onClick }: WorkoutCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group w-full rounded-xl border p-4 text-left transition-all ${
        completed
          ? "border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20"
          : "border-zinc-200 bg-white hover:border-amber-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-amber-700"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center gap-2">
            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[workout.type]}`}>
              {typeLabels[workout.type]}
            </span>
            <span className="text-xs text-zinc-400">{workout.duration}</span>
          </div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {workout.title}
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
            {workout.description}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {completed && (
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
  );
}
