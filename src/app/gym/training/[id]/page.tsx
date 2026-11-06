"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  presetTrainings,
  exerciseLibrary,
  defaultWarmups,
  getExerciseById,
  muscleGroupLabels,
  type GymTrainingTemplate,
  type GymTrainingExercise,
  type WarmupConfig,
  type MuscleGroup,
} from "@/lib/gym-data";
import {
  getGymTrainings,
  getGymWeightForExercise,
  saveGymWeight,
  saveGymSession,
  saveGymTraining,
  getCurrentWeek,
  type SavedGymTraining,
} from "@/lib/storage";

interface ActiveExercise {
  exerciseId: string;
  name: string;
  sets: number;
  reps: string;
  weight: string;
  done: boolean;
}

export default function GymTrainingPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [training, setTraining] = useState<{ name: string; exercises: GymTrainingExercise[]; warmup: WarmupConfig; muscleGroups: MuscleGroup[]; sourceId: string } | null>(null);
  const [activeExercises, setActiveExercises] = useState<ActiveExercise[]>([]);
  const [started, setStarted] = useState(false);
  const [warmupDone, setWarmupDone] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [showComplete, setShowComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadTraining();
  }, [id]);

  function loadTraining() {
    let name = "";
    let exercises: GymTrainingExercise[] = [];
    let warmupKey = "bike5";
    let muscleGroups: MuscleGroup[] = [];
    let sourceId = id;

    if (id.startsWith("custom-")) {
      const customId = id.replace("custom-", "");
      const customs = getGymTrainings();
      const custom = customs.find((t) => t.id === customId);
      if (!custom) { router.push("/gym"); return; }
      name = custom.name;
      exercises = custom.exercises;
      warmupKey = custom.warmupKey;
      sourceId = custom.id;
      const groups = new Set<MuscleGroup>();
      for (const ex of exercises) {
        const def = getExerciseById(ex.exerciseId);
        if (def) groups.add(def.muscleGroup);
      }
      muscleGroups = Array.from(groups);
    } else {
      const preset = presetTrainings.find((t) => t.id === id);
      if (!preset) { router.push("/gym"); return; }
      name = preset.name;
      exercises = preset.exercises;
      warmupKey = preset.warmupKey;
      muscleGroups = preset.muscleGroups;
      sourceId = preset.id;
    }

    const warmup = defaultWarmups[warmupKey] || defaultWarmups.bike5;

    setTraining({ name, exercises, warmup, muscleGroups, sourceId });

    const active: ActiveExercise[] = exercises.map((ex) => {
      const def = getExerciseById(ex.exerciseId);
      const savedWeight = getGymWeightForExercise(ex.exerciseId);
      const defaultWeight = def?.ynzoWeight || "";
      return {
        exerciseId: ex.exerciseId,
        name: def?.name || ex.exerciseId,
        sets: ex.sets,
        reps: ex.reps,
        weight: savedWeight || defaultWeight,
        done: false,
      };
    });
    setActiveExercises(active);
  }

  function toggleExerciseDone(idx: number) {
    setActiveExercises((prev) =>
      prev.map((ex, i) => (i === idx ? { ...ex, done: !ex.done } : ex))
    );
  }

  function updateWeight(idx: number, weight: string) {
    setActiveExercises((prev) =>
      prev.map((ex, i) => (i === idx ? { ...ex, weight } : ex))
    );
  }

  function updateSets(idx: number, sets: number) {
    setActiveExercises((prev) =>
      prev.map((ex, i) => (i === idx ? { ...ex, sets: Math.max(1, sets) } : ex))
    );
  }

  function updateReps(idx: number, reps: string) {
    setActiveExercises((prev) =>
      prev.map((ex, i) => (i === idx ? { ...ex, reps } : ex))
    );
  }

  function completeTraining() {
    if (!training) return;

    for (const ex of activeExercises) {
      if (ex.weight) {
        saveGymWeight(ex.exerciseId, ex.weight);
      }
    }

    const week = getCurrentWeek();
    saveGymSession({
      id: `gym-${Date.now()}`,
      trainingId: training.sourceId,
      trainingName: training.name,
      completedAt: new Date().toISOString(),
      week,
      muscleGroups: training.muscleGroups,
      exercises: activeExercises.map((ex) => ({
        exerciseId: ex.exerciseId,
        weight: ex.weight,
        sets: ex.sets,
        reps: ex.reps,
        done: ex.done,
      })),
    });

    if (id.startsWith("custom-")) {
      const customId = id.replace("custom-", "");
      const customs = getGymTrainings();
      const custom = customs.find((t) => t.id === customId);
      if (custom) {
        custom.lastUsed = new Date().toISOString();
        saveGymTraining(custom);
      }
    }

    setShowComplete(true);
  }

  if (!mounted || !training) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  const allDone = activeExercises.every((ex) => ex.done);
  const totalWarmup = training.warmup.intervals.reduce((sum, i) => sum + i.minutes, 0);

  if (showComplete) {
    return (
      <main className="mx-auto flex max-w-lg flex-col items-center px-4 pt-20 pb-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="mb-2 text-2xl font-bold">Training voltooid</h1>
        <p className="mb-6 text-zinc-500 dark:text-zinc-400">
          {training.name} opgeslagen. Gewichten onthouden voor de volgende keer.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/gym")}
            className="rounded-xl bg-amber-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-amber-600"
          >
            Terug naar Gym
          </button>
          <button
            onClick={() => router.push("/")}
            className="rounded-xl border border-zinc-200 px-6 py-3 text-base font-semibold text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
          >
            Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 pt-8 pb-12">
      <div className="mb-6 flex items-center gap-3">
        <button onClick={() => router.push("/gym")} className="rounded-lg p-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold">{training.name}</h1>
          <div className="flex flex-wrap gap-1.5">
            {training.muscleGroups.map((mg) => (
              <span key={mg} className="text-xs text-zinc-500 dark:text-zinc-400">
                {muscleGroupLabels[mg]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {training.warmup.type !== "geen" && (
        <section className="mb-6">
          <div
            className={`rounded-xl border p-4 transition-all ${
              warmupDone
                ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
                : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {training.warmup.type === "fiets" ? "\u{1F6B2}" : training.warmup.type === "loopband" ? "\u{1F3C3}" : "\u{1F6A3}"}
                </span>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Warmup &middot; {training.warmup.type} &middot; {totalWarmup} min
                </h3>
              </div>
              <button
                onClick={() => setWarmupDone(!warmupDone)}
                className={`rounded-full p-1 transition-colors ${warmupDone ? "text-green-600" : "text-zinc-300 hover:text-zinc-500 dark:text-zinc-600"}`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </button>
            </div>
            {training.warmup.intervals.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {training.warmup.intervals.map((interval, i) => (
                  <span key={i} className="rounded-lg bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {interval.label} {interval.minutes}m
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Oefeningen
        </h2>
        <div className="flex flex-col gap-3">
          {activeExercises.map((ex, idx) => {
            const def = getExerciseById(ex.exerciseId);
            const isEditing = editIdx === idx;
            return (
              <div
                key={ex.exerciseId}
                className={`rounded-xl border p-4 transition-all ${
                  ex.done
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
                    : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <button
                    onClick={() => toggleExerciseDone(idx)}
                    className={`mt-0.5 flex-shrink-0 rounded-full p-1 transition-colors ${
                      ex.done ? "text-green-600" : "text-zinc-300 hover:text-zinc-500 dark:text-zinc-600"
                    }`}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </button>
                  <div className="min-w-0 flex-1">
                    <h3 className={`font-semibold ${ex.done ? "text-green-700 dark:text-green-400" : "text-zinc-900 dark:text-zinc-100"}`}>
                      {ex.name}
                    </h3>
                    {def && (
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">
                        {muscleGroupLabels[def.muscleGroup]} &middot; {def.equipment}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setEditIdx(isEditing ? null : idx)}
                    className="flex-shrink-0 rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>

                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-zinc-400">Sets</span>
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">{ex.sets}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-zinc-400">Reps</span>
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">{ex.reps}</span>
                  </div>
                  {ex.weight && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-zinc-400">Gewicht</span>
                      <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{ex.weight} kg</span>
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="mt-3 flex flex-col gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="mb-1 block text-xs text-zinc-400">Sets</label>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateSets(idx, ex.sets - 1)} className="rounded-lg border border-zinc-200 px-2.5 py-1 text-sm dark:border-zinc-700">-</button>
                          <span className="w-8 text-center text-sm font-semibold">{ex.sets}</span>
                          <button onClick={() => updateSets(idx, ex.sets + 1)} className="rounded-lg border border-zinc-200 px-2.5 py-1 text-sm dark:border-zinc-700">+</button>
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="mb-1 block text-xs text-zinc-400">Reps</label>
                        <input
                          type="text"
                          value={ex.reps}
                          onChange={(e) => updateReps(idx, e.target.value)}
                          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-zinc-400">Gewicht (kg)</label>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={ex.weight}
                        onChange={(e) => updateWeight(idx, e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                        placeholder="bv. 55"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <button
        onClick={completeTraining}
        disabled={!allDone && !warmupDone}
        className={`w-full rounded-xl py-4 text-base font-bold transition-all ${
          allDone
            ? "bg-green-500 text-white hover:bg-green-600 active:scale-[0.98]"
            : "bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600"
        }`}
      >
        {allDone ? "Training voltooien" : `${activeExercises.filter((e) => e.done).length}/${activeExercises.length} klaar`}
      </button>
    </main>
  );
}
