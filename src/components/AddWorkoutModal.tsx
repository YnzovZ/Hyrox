"use client";

import { useState } from "react";
import { CustomWorkout, saveCustomWorkout } from "@/lib/storage";

const workoutTypes = [
  { value: "run" as const, label: "Run", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" },
  { value: "strength" as const, label: "Kracht", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" },
  { value: "hyrox" as const, label: "Hyrox", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" },
  { value: "other" as const, label: "Anders", color: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300" },
];

interface AddWorkoutModalProps {
  week: number;
  onClose: () => void;
  onSaved: () => void;
}

export default function AddWorkoutModal({ week, onClose, onSaved }: AddWorkoutModalProps) {
  const [type, setType] = useState<CustomWorkout["type"]>("run");
  const [description, setDescription] = useState("");
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");

  function handleSave() {
    if (!description.trim()) return;
    const workout: CustomWorkout = {
      id: `custom_${Date.now()}`,
      week,
      type,
      description: description.trim(),
      distance: distance.trim() || undefined,
      time: time.trim() || undefined,
      completedAt: new Date().toISOString(),
    };
    saveCustomWorkout(workout);
    onSaved();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md animate-[fadeIn_0.2s_ease-out] rounded-2xl bg-white px-5 pb-6 pt-5 shadow-xl dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Training toevoegen</h3>
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
            autoFocus
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
          Toevoegen
        </button>
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
