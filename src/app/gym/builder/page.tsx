"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  exerciseLibrary,
  muscleGroupLabels,
  defaultWarmups,
  getExerciseById,
  type MuscleGroup,
  type GymExercise,
  type GymTrainingExercise,
} from "@/lib/gym-data";
import { saveGymTraining, getGymTrainings, type SavedGymTraining } from "@/lib/storage";

const muscleGroups: MuscleGroup[] = ["chest", "back", "shoulders", "biceps", "triceps", "legs", "core"];

const warmupOptions = [
  { key: "bike5", label: "Fiets 5 min" },
  { key: "bikeInterval", label: "Fiets interval (23 min)" },
  { key: "treadmill5", label: "Loopband 5 min" },
  { key: "rowing5", label: "Roeier 5 min" },
  { key: "none", label: "Geen warmup" },
];

export default function GymBuilderPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" /></div>}>
      <GymBuilderContent />
    </Suspense>
  );
}

function GymBuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [name, setName] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<GymTrainingExercise[]>([]);
  const [warmupKey, setWarmupKey] = useState("bike5");
  const [showPicker, setShowPicker] = useState(false);
  const [filterGroup, setFilterGroup] = useState<MuscleGroup | "all">("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (editId) {
      const existing = getGymTrainings().find((t) => t.id === editId);
      if (existing) {
        setName(existing.name);
        setSelectedExercises(existing.exercises);
        setWarmupKey(existing.warmupKey);
      }
    }
  }, [editId]);

  function addExercise(exercise: GymExercise) {
    if (selectedExercises.some((e) => e.exerciseId === exercise.id)) return;
    setSelectedExercises([
      ...selectedExercises,
      {
        exerciseId: exercise.id,
        sets: exercise.defaultSets,
        reps: exercise.defaultReps,
      },
    ]);
    setShowPicker(false);
  }

  function removeExercise(exerciseId: string) {
    setSelectedExercises(selectedExercises.filter((e) => e.exerciseId !== exerciseId));
  }

  function moveExercise(idx: number, direction: "up" | "down") {
    const newIdx = direction === "up" ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= selectedExercises.length) return;
    const copy = [...selectedExercises];
    [copy[idx], copy[newIdx]] = [copy[newIdx], copy[idx]];
    setSelectedExercises(copy);
  }

  function handleSave() {
    if (!name.trim() || selectedExercises.length === 0) return;

    const training: SavedGymTraining = {
      id: editId || `custom-${Date.now()}`,
      name: name.trim(),
      exercises: selectedExercises,
      warmupKey,
      createdAt: editId
        ? (getGymTrainings().find((t) => t.id === editId)?.createdAt || new Date().toISOString())
        : new Date().toISOString(),
    };

    saveGymTraining(training);
    router.push("/gym");
  }

  const filteredExercises =
    filterGroup === "all"
      ? exerciseLibrary
      : exerciseLibrary.filter((e) => e.muscleGroup === filterGroup);

  const alreadySelected = new Set(selectedExercises.map((e) => e.exerciseId));

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
      </div>
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
        <h1 className="text-xl font-bold">
          {editId ? "Training bewerken" : "Nieuwe training"}
        </h1>
      </div>

      <section className="mb-6">
        <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Naam
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="bv. Push Power Custom"
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base dark:border-zinc-700 dark:bg-zinc-900"
        />
      </section>

      <section className="mb-6">
        <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Warmup
        </label>
        <div className="flex flex-wrap gap-2">
          {warmupOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setWarmupKey(opt.key)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                warmupKey === opt.key
                  ? "bg-amber-500 text-white"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:border-amber-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Oefeningen ({selectedExercises.length})
          </label>
        </div>

        {selectedExercises.length > 0 && (
          <div className="mb-3 flex flex-col gap-2">
            {selectedExercises.map((ex, idx) => {
              const def = getExerciseById(ex.exerciseId);
              if (!def) return null;
              return (
                <div
                  key={ex.exerciseId}
                  className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <span className="w-6 text-center text-sm font-bold text-zinc-400">{idx + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{def.name}</p>
                    <p className="text-xs text-zinc-400">
                      {muscleGroupLabels[def.muscleGroup]} &middot; {ex.sets}x{ex.reps}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveExercise(idx, "up")}
                      disabled={idx === 0}
                      className="rounded p-1 text-zinc-400 hover:text-zinc-600 disabled:opacity-30 dark:hover:text-zinc-300"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6" /></svg>
                    </button>
                    <button
                      onClick={() => moveExercise(idx, "down")}
                      disabled={idx === selectedExercises.length - 1}
                      className="rounded p-1 text-zinc-400 hover:text-zinc-600 disabled:opacity-30 dark:hover:text-zinc-300"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                    </button>
                    <button
                      onClick={() => removeExercise(ex.exerciseId)}
                      className="rounded p-1 text-zinc-400 hover:text-red-500"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={() => setShowPicker(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-white py-3 text-sm font-medium text-zinc-500 transition-all hover:border-amber-400 hover:text-amber-600 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-amber-600 dark:hover:text-amber-400"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14" /><path d="M5 12h14" />
          </svg>
          Oefening toevoegen
        </button>
      </section>

      <button
        onClick={handleSave}
        disabled={!name.trim() || selectedExercises.length === 0}
        className={`w-full rounded-xl py-4 text-base font-bold transition-all ${
          name.trim() && selectedExercises.length > 0
            ? "bg-amber-500 text-white hover:bg-amber-600 active:scale-[0.98]"
            : "bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600"
        }`}
      >
        {editId ? "Training opslaan" : "Training aanmaken"}
      </button>

      {showPicker && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-zinc-950">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <h2 className="text-lg font-bold">Kies oefening</h2>
            <button onClick={() => setShowPicker(false)} className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto border-b border-zinc-100 px-4 py-2 dark:border-zinc-800">
            <button
              onClick={() => setFilterGroup("all")}
              className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                filterGroup === "all"
                  ? "bg-amber-500 text-white"
                  : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              Alles
            </button>
            {muscleGroups.map((mg) => (
              <button
                key={mg}
                onClick={() => setFilterGroup(mg)}
                className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  filterGroup === mg
                    ? "bg-amber-500 text-white"
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                }`}
              >
                {muscleGroupLabels[mg]}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-2">
            {filteredExercises.map((exercise) => {
              const isSelected = alreadySelected.has(exercise.id);
              return (
                <button
                  key={exercise.id}
                  onClick={() => !isSelected && addExercise(exercise)}
                  disabled={isSelected}
                  className={`flex w-full items-center gap-3 border-b border-zinc-50 px-2 py-3 text-left transition-colors dark:border-zinc-900 ${
                    isSelected
                      ? "opacity-40"
                      : "hover:bg-zinc-50 active:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{exercise.name}</p>
                    <p className="text-xs text-zinc-400">
                      {muscleGroupLabels[exercise.muscleGroup]} &middot; {exercise.equipment}
                      {exercise.ynzoWeight && <> &middot; ~{exercise.ynzoWeight} kg</>}
                    </p>
                  </div>
                  {isSelected ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-500">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-300 dark:text-zinc-600">
                      <path d="M12 5v14" /><path d="M5 12h14" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
