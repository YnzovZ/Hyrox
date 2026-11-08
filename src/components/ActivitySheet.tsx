"use client";

import { useState } from "react";
import { activityTypes, activityLabels, activityEmoji, type ActivityType, type SessionActivity } from "@/lib/gym-data";

interface ActivitySheetProps {
  initial?: SessionActivity;
  onSave: (activity: SessionActivity) => void;
  onDelete?: () => void;
  onClose: () => void;
}

export default function ActivitySheet({ initial, onSave, onDelete, onClose }: ActivitySheetProps) {
  const [type, setType] = useState<ActivityType>(initial?.type ?? "hardlopen");
  const [time, setTime] = useState(initial?.time ?? "");
  const [distance, setDistance] = useState(initial?.distance ?? "");

  function handleSave() {
    onSave({
      type,
      time: time.trim() || undefined,
      distance: distance.trim().replace(",", ".") || undefined,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:items-center"
      onClick={onClose}
    >
      <div
        className="max-h-full w-full max-w-sm overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {initial ? "Activiteit aanpassen" : "Activiteit toevoegen"}
        </h3>

        <div className="mb-4 grid grid-cols-3 gap-2">
          {activityTypes.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-xs font-medium transition-all active:scale-[0.97] ${
                type === t
                  ? "border-amber-400 bg-amber-50 text-amber-700 dark:border-amber-600 dark:bg-amber-950/30 dark:text-amber-300"
                  : "border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
              }`}
            >
              <span className="text-xl">{activityEmoji[t]}</span>
              {activityLabels[t]}
            </button>
          ))}
        </div>

        <div className="mb-5 flex gap-3">
          <label className="flex-1">
            <span className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Tijd (min)</span>
            <input
              type="text"
              inputMode="numeric"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="20"
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-base dark:border-zinc-700 dark:bg-zinc-800"
            />
          </label>
          <label className="flex-1">
            <span className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Afstand (km)</span>
            <input
              type="text"
              inputMode="decimal"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="5"
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-base dark:border-zinc-700 dark:bg-zinc-800"
            />
          </label>
        </div>

        <div className="flex gap-3">
          {onDelete ? (
            <button
              onClick={onDelete}
              className="flex-1 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 dark:border-red-900 dark:text-red-400"
            >
              Verwijder
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium dark:border-zinc-700"
            >
              Annuleer
            </button>
          )}
          <button
            onClick={handleSave}
            className="flex-1 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-medium text-white"
          >
            Opslaan
          </button>
        </div>
      </div>
    </div>
  );
}
