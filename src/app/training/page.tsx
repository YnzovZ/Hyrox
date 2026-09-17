"use client";

import { useEffect, useState } from "react";
import { generateTrainingPlan, weekPhases, dayNames, Workout } from "@/lib/data";
import { getCurrentWeek, setCurrentWeek as saveCurrentWeek, getCompletedWorkouts, CompletedWorkout, getSwappedWorkouts, SwappedWorkout, getCustomWorkoutsForWeek, CustomWorkout } from "@/lib/storage";
import WorkoutCard from "@/components/WorkoutCard";
import SwapModal from "@/components/SwapModal";
import AddWorkoutModal from "@/components/AddWorkoutModal";

const typeColors: Record<string, string> = {
  run: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  strength: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  hyrox: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  other: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300",
};

const typeLabels: Record<string, string> = {
  run: "Run",
  strength: "Kracht",
  hyrox: "Hyrox",
  other: "Anders",
};

export default function TrainingPage() {
  const [activeWeek, setActiveWeek] = useState(1);
  const [completed, setCompleted] = useState<CompletedWorkout[]>([]);
  const [swapped, setSwapped] = useState<SwappedWorkout[]>([]);
  const [customWorkouts, setCustomWorkouts] = useState<CustomWorkout[]>([]);
  const [mounted, setMounted] = useState(false);
  const [swapTarget, setSwapTarget] = useState<Workout | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    const week = getCurrentWeek();
    setActiveWeek(week);
    setCompleted(getCompletedWorkouts());
    setSwapped(getSwappedWorkouts());
    setCustomWorkouts(getCustomWorkoutsForWeek(week));
  }, []);

  const workouts = generateTrainingPlan();

  function handleWeekChange(week: number) {
    setActiveWeek(week);
    saveCurrentWeek(week);
    setCustomWorkouts(getCustomWorkoutsForWeek(week));
  }

  function refreshState() {
    setCompleted(getCompletedWorkouts());
    setSwapped(getSwappedWorkouts());
    setCustomWorkouts(getCustomWorkoutsForWeek(activeWeek));
  }

  const weekWorkouts = workouts.filter((w) => w.week === activeWeek);
  const weekCompletedCount = weekWorkouts.filter((w) =>
    completed.some((c) => c.workoutId === w.id)
  ).length + customWorkouts.length;
  const weekTotalCount = weekWorkouts.length + customWorkouts.length;

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 pt-8 pb-12">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Trainingsplan</h1>
        <p className="text-base text-zinc-500 dark:text-zinc-400">
          19 weken naar race day
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
            <h2 className="text-lg font-semibold">{weekPhases[activeWeek - 1]}</h2>
            <p className="text-base text-zinc-500 dark:text-zinc-400">Week {activeWeek}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
              {weekCompletedCount}/{weekTotalCount}
            </p>
            <p className="text-sm text-zinc-400">voltooid</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {weekWorkouts.map((workout) => (
          <div key={workout.id} className="animate-fade-in">
            <div className="mb-1 text-sm font-medium text-zinc-400 dark:text-zinc-500">
              Dag {workout.day} - {dayNames[workout.day] || `Dag ${workout.day}`}
            </div>
            <WorkoutCard
              workout={workout}
              completed={completed.some((c) => c.workoutId === workout.id)}
              swapped={swapped.find((s) => s.workoutId === workout.id) ?? null}
              onClick={() => {
                window.location.href = `/workout/${workout.id}`;
              }}
              onSwap={() => setSwapTarget(workout)}
            />
          </div>
        ))}

        {customWorkouts.map((cw) => (
          <div key={cw.id} className="animate-fade-in">
            <div className="mb-1 text-sm font-medium text-zinc-400 dark:text-zinc-500">
              Extra training
            </div>
            <div className="rounded-xl border border-green-200 bg-green-50/50 p-4 dark:border-green-900 dark:bg-green-950/20">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-sm font-medium ${typeColors[cw.type]}`}>
                      {typeLabels[cw.type]}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {cw.description}
                  </h3>
                  <div className="mt-0.5 flex gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                    {cw.distance && <span>{cw.distance}</span>}
                    {cw.time && <span>{cw.time}</span>}
                  </div>
                </div>
                <span className="text-green-600 dark:text-green-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowAddModal(true)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-white py-3 text-base font-medium text-zinc-500 transition-all hover:border-amber-400 hover:text-amber-600 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-amber-600 dark:hover:text-amber-400"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
        Training toevoegen
      </button>

      {swapTarget && (
        <SwapModal
          workout={swapTarget}
          onClose={() => setSwapTarget(null)}
          onSaved={() => {
            setSwapTarget(null);
            refreshState();
          }}
        />
      )}

      {showAddModal && (
        <AddWorkoutModal
          week={activeWeek}
          onClose={() => setShowAddModal(false)}
          onSaved={() => {
            setShowAddModal(false);
            refreshState();
          }}
        />
      )}
    </main>
  );
}
