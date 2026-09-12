"use client";

import { useEffect, useState } from "react";
import { generateTrainingPlan, weekPhases, dayNames } from "@/lib/data";
import { getCurrentWeek, setCurrentWeek as saveCurrentWeek, getCompletedWorkouts, CompletedWorkout } from "@/lib/storage";
import WorkoutCard from "@/components/WorkoutCard";

export default function TrainingPage() {
  const [activeWeek, setActiveWeek] = useState(1);
  const [completed, setCompleted] = useState<CompletedWorkout[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setActiveWeek(getCurrentWeek());
    setCompleted(getCompletedWorkouts());
  }, []);

  const workouts = generateTrainingPlan();

  function handleWeekChange(week: number) {
    setActiveWeek(week);
    saveCurrentWeek(week);
  }

  const weekWorkouts = workouts.filter((w) => w.week === activeWeek);
  const weekCompletedCount = weekWorkouts.filter((w) =>
    completed.some((c) => c.workoutId === w.id)
  ).length;

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 pt-8">
      <header className="mb-6">
        <h1 className="text-xl font-bold tracking-tight">Trainingsplan</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          8 weken naar race day
        </p>
      </header>

      <div className="mb-6 flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {weekPhases.map((phase, i) => {
          const week = i + 1;
          const isActive = week === activeWeek;
          const weekWorks = workouts.filter((w) => w.week === week);
          const weekDone = weekWorks.filter((w) =>
            completed.some((c) => c.workoutId === w.id)
          ).length;
          const allDone = weekDone === weekWorks.length && weekWorks.length > 0;

          return (
            <button
              key={week}
              onClick={() => handleWeekChange(week)}
              className={`flex min-w-[72px] flex-shrink-0 flex-col items-center rounded-xl px-3 py-2.5 text-center transition-all ${
                isActive
                  ? "bg-amber-500 text-white shadow-md"
                  : allDone
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              }`}
            >
              <span className="text-[10px] font-medium uppercase tracking-wider opacity-70">
                Week
              </span>
              <span className="text-lg font-bold">{week}</span>
              <span className="text-[10px] leading-tight">{phase.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      <div className="mb-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">{weekPhases[activeWeek - 1]}</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Week {activeWeek}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
              {weekCompletedCount}/{weekWorkouts.length}
            </p>
            <p className="text-xs text-zinc-400">voltooid</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {weekWorkouts.map((workout) => (
          <div key={workout.id} className="animate-fade-in">
            <div className="mb-1 text-xs font-medium text-zinc-400 dark:text-zinc-500">
              Dag {workout.day} - {dayNames[workout.day] || `Dag ${workout.day}`}
            </div>
            <WorkoutCard
              workout={workout}
              completed={completed.some((c) => c.workoutId === workout.id)}
              onClick={() => {
                window.location.href = `/workout/${workout.id}`;
              }}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
