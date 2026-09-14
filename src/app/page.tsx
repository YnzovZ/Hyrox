"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { generateTrainingPlan, weekPhases, Workout } from "@/lib/data";
import { getCurrentWeek, getCompletedWorkouts, CompletedWorkout } from "@/lib/storage";
import WorkoutCard from "@/components/WorkoutCard";

export default function Home() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [completed, setCompleted] = useState<CompletedWorkout[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentWeek(getCurrentWeek());
    setCompleted(getCompletedWorkouts());
  }, []);

  const workouts = generateTrainingPlan();
  const weekWorkouts = workouts.filter((w) => w.week === currentWeek);
  const totalWorkouts = workouts.length;
  const completedCount = completed.length;
  const weekCompleted = weekWorkouts.filter((w) =>
    completed.some((c) => c.workoutId === w.id)
  ).length;

  const progress = totalWorkouts > 0 ? (completedCount / totalWorkouts) * 100 : 0;

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 pt-8">
      <header className="mb-8">
        <div className="mb-1 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-lg font-bold text-white">
            H
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Beast Mode Veer en Yns</h1>
            <p className="text-base text-zinc-500 dark:text-zinc-400">19-weken plan</p>
          </div>
        </div>
      </header>

      <section className="mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-5 text-white shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-amber-100">
              Week {currentWeek} van 19
            </p>
            <h2 className="text-xl font-bold">{weekPhases[currentWeek - 1]}</h2>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{weekCompleted}/{weekWorkouts.length}</p>
            <p className="text-sm text-amber-100">workouts</p>
          </div>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-amber-700/40">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-1.5 text-sm text-amber-100">
          {completedCount} van {totalWorkouts} workouts voltooid
        </p>
      </section>

      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Deze week
          </h2>
          <Link
            href="/training"
            className="text-base font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400"
          >
            Alle weken
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {weekWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              completed={completed.some((c) => c.workoutId === workout.id)}
              onClick={() => {
                window.location.href = `/workout/${workout.id}`;
              }}
            />
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-base font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Snel starten
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/timer"
            className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-amber-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-amber-700"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-base font-medium">Timer</span>
          </Link>
          <Link
            href="/stations"
            className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-amber-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-amber-700"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12l2 2 4-4" />
            </svg>
            <span className="text-base font-medium">Stations</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
