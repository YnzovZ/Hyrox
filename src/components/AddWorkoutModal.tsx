"use client";

import { useState, useEffect } from "react";
import {
  CustomWorkout,
  saveCustomWorkout,
  deleteCustomWorkout,
  getGymTrainings,
  type SavedGymTraining,
} from "@/lib/storage";
import { presetTrainings, muscleGroupLabels } from "@/lib/gym-data";

const workoutTypes = [
  { value: "run" as const, label: "Run", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" },
  { value: "strength" as const, label: "Kracht", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" },
  { value: "hyrox" as const, label: "Hyrox", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" },
  { value: "other" as const, label: "Anders", color: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300" },
];

interface AddWorkoutModalProps {
  week: number;
  existing?: CustomWorkout | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function AddWorkoutModal({ week, existing, onClose, onSaved }: AddWorkoutModalProps) {
  const isEditing = !!existing;
  const [type, setType] = useState<CustomWorkout["type"]>(existing?.type ?? "run");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [distance, setDistance] = useState(existing?.distance ?? "");
  const [time, setTime] = useState(existing?.time ?? "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [customGymTrainings, setCustomGymTrainings] = useState<SavedGymTraining[]>([]);

  useEffect(() => {
    setCustomGymTrainings(getGymTrainings());
  }, []);

  function handleSave() {
    if (!description.trim()) return;
    const workout: CustomWorkout = {
      id: existing?.id ?? `custom_${Date.now()}`,
      week,
      type,
      description: description.trim(),
      distance: distance.trim() || undefined,
      time: time.trim() || undefined,
      completedAt: existing?.completedAt ?? new Date().toISOString(),
    };
    saveCustomWorkout(workout);
    onSaved();
  }

  function handleGymSelect(gymId: string, gymName: string) {
    const workout: CustomWorkout = {
      id: existing?.id ?? `custom_${Date.now()}`,
      week,
      type: "strength",
      description: gymName,
      gymTrainingId: gymId,
      completedAt: existing?.completedAt ?? new Date().toISOString(),
    };
    saveCustomWorkout(workout);
    onSaved();
  }

  function handleBuildNew() {
    window.location.href = `/gym/builder?returnAction=add&returnWeek=${week}`;
  }

  function handleDelete() {
    if (!existing) return;
    deleteCustomWorkout(existing.id);
    onSaved();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-md animate-[fadeIn_0.2s_ease-out] overflow-y-auto rounded-2xl bg-white px-5 pb-6 pt-5 shadow-xl dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {isEditing ? "Training bewerken" : "Training toevoegen"}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Week {week}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Type training
          </label>
          <div className="flex gap-2">
            {workoutTypes.map((wt) => (
              <button
                key={wt.value}
                onClick={() => setType(wt.value)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                  type === wt.value
                    ? `${wt.color} ring-2 ring-amber-500 ring-offset-1 dark:ring-offset-zinc-900`
                    : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                }`}
              >
                {wt.label}
              </button>
            ))}
          </div>
        </div>

        {type === "strength" && !isEditing && (
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Kies een gym training
            </label>
            <div className="max-h-52 overflow-y-auto rounded-xl border border-zinc-200 dark:border-zinc-700">
              {presetTrainings.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleGymSelect(t.id, t.name)}
                  className="flex w-full items-center gap-3 border-b border-zinc-100 px-3 py-2.5 text-left transition-colors last:border-b-0 hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t.name}</p>
                    <p className="text-xs text-zinc-400">
                      {t.exercises.length} oefeningen &middot;{" "}
                      {t.muscleGroups.map((mg) => muscleGroupLabels[mg]).join(", ")}
                    </p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 text-zinc-300 dark:text-zinc-600">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}
              {customGymTrainings.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleGymSelect(`custom-${t.id}`, t.name)}
                  className="flex w-full items-center gap-3 border-b border-zinc-100 px-3 py-2.5 text-left transition-colors last:border-b-0 hover:bg-zinc-50 active:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t.name}</p>
                    <p className="text-xs text-zinc-400">{t.exercises.length} oefeningen</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 text-zinc-300 dark:text-zinc-600">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}
            </div>
            <button
              onClick={handleBuildNew}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 py-2.5 text-sm font-medium text-zinc-500 transition-all hover:border-amber-400 hover:text-amber-600 active:scale-[0.98] dark:border-zinc-700 dark:text-zinc-400"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" /><path d="M5 12h14" />
              </svg>
              Bouw nieuwe training
            </button>

            <div className="my-4 flex items-center gap-3">
              <div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
              <span className="text-xs text-zinc-400">of beschrijf zelf</span>
              <div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
            </div>
          </div>
        )}

        <div className="mb-3">
          <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Omschrijving
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={type === "run" ? "bv. Buitenrun park" : type === "strength" ? "bv. Gym sessie" : "bv. CrossFit class"}
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-base text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            autoFocus={type !== "strength" || isEditing}
          />
        </div>

        <div className="mb-3 flex gap-3">
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Afstand
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="bv. 5 km"
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-base text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Tijd
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="bv. 30 min"
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-base text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={!description.trim()}
          className="mt-2 w-full rounded-xl bg-amber-500 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-amber-600 active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100"
        >
          {isEditing ? "Opslaan" : "Toevoegen"}
        </button>

        {isEditing && !showDeleteConfirm && (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="mt-2 w-full rounded-xl py-2.5 text-base font-medium text-red-500 transition-all hover:bg-red-50 active:scale-[0.98] dark:text-red-400 dark:hover:bg-red-950/20"
          >
            Verwijderen
          </button>
        )}

        {showDeleteConfirm && (
          <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950/20">
            <p className="mb-2 text-sm text-red-700 dark:text-red-400">Training verwijderen?</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 rounded-lg border border-zinc-300 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
              >
                Annuleer
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 rounded-lg bg-red-500 py-2 text-sm font-semibold text-white"
              >
                Verwijderen
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
