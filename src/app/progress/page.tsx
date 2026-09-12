"use client";

import { useEffect, useState } from "react";
import { generateTrainingPlan, weekPhases } from "@/lib/data";
import { getCompletedWorkouts, CompletedWorkout } from "@/lib/storage";

export default function ProgressPage() {
  const [completed, setCompleted] = useState<CompletedWorkout[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCompleted(getCompletedWorkouts());
  }, []);

  const workouts = generateTrainingPlan();

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  const totalWorkouts = workouts.length;
  const completedCount = completed.length;
  const progress = totalWorkouts > 0 ? Math.round((completedCount / totalWorkouts) * 100) : 0;

  const weekStats = weekPhases.map((phase, i) => {
    const week = i + 1;
    const weekWorkouts = workouts.filter((w) => w.week === week);
    const weekCompleted = weekWorkouts.filter((w) =>
      completed.some((c) => c.workoutId === w.id)
    ).length;
    return {
      week,
      phase,
      total: weekWorkouts.length,
      completed: weekCompleted,
      percentage: weekWorkouts.length > 0 ? Math.round((weekCompleted / weekWorkouts.length) * 100) : 0,
    };
  });

  const typeStats = ["run", "strength", "hyrox", "recovery"].map((type) => {
    const typeWorkouts = workouts.filter((w) => w.type === type);
    const typeCompleted = typeWorkouts.filter((w) =>
      completed.some((c) => c.workoutId === w.id)
    ).length;
    return {
      type,
      label: type === "run" ? "Run" : type === "strength" ? "Kracht" : type === "hyrox" ? "Hyrox" : "Herstel",
      total: typeWorkouts.length,
      completed: typeCompleted,
    };
  });

  const typeColors: Record<string, string> = {
    run: "bg-blue-500",
    strength: "bg-purple-500",
    hyrox: "bg-amber-500",
    recovery: "bg-green-500",
  };

  return (
    <main className="mx-auto max-w-lg px-4 pt-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Voortgang</h1>
        <p className="text-base text-zinc-500 dark:text-zinc-400">
          Houd je trainingsvoortgang bij
        </p>
      </header>

      <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <div className="relative mx-auto mb-4 h-32 w-32">
          <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-zinc-100 dark:text-zinc-800"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 52}`}
              strokeDashoffset={`${2 * Math.PI * 52 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="text-amber-500 transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">{progress}%</span>
          </div>
        </div>
        <p className="text-base text-zinc-500 dark:text-zinc-400">
          {completedCount} van {totalWorkouts} workouts voltooid
        </p>
      </div>

      <section className="mb-6">
        <h2 className="mb-3 text-base font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Per type
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {typeStats.map((stat) => (
            <div
              key={stat.type}
              className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-2 flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${typeColors[stat.type]}`} />
                <span className="text-base font-medium">{stat.label}</span>
              </div>
              <p className="text-xl font-bold">
                {stat.completed}<span className="text-base font-normal text-zinc-400">/{stat.total}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-base font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Per week
        </h2>
        <div className="space-y-2">
          {weekStats.map((stat) => (
            <div
              key={stat.week}
              className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-1.5 flex items-center justify-between">
                <div>
                  <span className="text-base font-medium">Week {stat.week}</span>
                  <span className="ml-2 text-sm text-zinc-400">{stat.phase}</span>
                </div>
                <span className="text-base font-semibold text-amber-600 dark:text-amber-400">
                  {stat.completed}/{stat.total}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {completed.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-base font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Laatste workouts
          </h2>
          <div className="space-y-2">
            {[...completed]
              .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
              .slice(0, 5)
              .map((c) => {
                const workout = workouts.find((w) => w.id === c.workoutId);
                if (!workout) return null;
                return (
                  <div
                    key={c.workoutId}
                    className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div>
                      <p className="text-base font-medium">{workout.title}</p>
                      <p className="text-sm text-zinc-400">Week {workout.week}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-zinc-400">
                        {new Date(c.completedAt).toLocaleDateString("nl-NL", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                      <span className="text-green-500">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      )}
    </main>
  );
}
