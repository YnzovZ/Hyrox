"use client";

import { useEffect, useState } from "react";
import { bosuReminder, getBosuReminderWeek, getExerciseById } from "@/lib/gym-data";

interface BosuReminderProps {
  onAdd?: () => void;
  added?: boolean;
}

export default function BosuReminder({ onAdd, added }: BosuReminderProps) {
  const [week, setWeek] = useState<number | null>(null);

  useEffect(() => {
    setWeek(getBosuReminderWeek());
  }, []);

  if (week === null) return null;

  const names = bosuReminder.exerciseIds
    .map((id) => getExerciseById(id)?.name.replace("Bosu ", "").toLowerCase())
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className={`mb-6 rounded-xl border p-4 ${
        added
          ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
          : "border-sky-200 bg-sky-50 dark:border-sky-800 dark:bg-sky-950/20"
      }`}
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <h3 className={`text-sm font-bold ${added ? "text-green-700 dark:text-green-300" : "text-sky-800 dark:text-sky-200"}`}>
          Bosu-oefeningen voor je knie
        </h3>
        <span className="flex-shrink-0 rounded-full bg-white/70 px-2 py-0.5 text-xs font-medium text-sky-700 dark:bg-zinc-900/40 dark:text-sky-300">
          week {Math.min(week, 6)} van 6
        </span>
      </div>
      <p className={`text-sm ${added ? "text-green-700 dark:text-green-300" : "text-sky-700 dark:text-sky-300"}`}>
        {added
          ? "Staan in je training. Goed bezig, je knie gaat je dankbaar zijn."
          : `Pak je evenwichtsoefeningen mee: ${names}.`}
      </p>
      {onAdd && !added && (
        <button
          onClick={onAdd}
          className="mt-3 w-full rounded-lg bg-sky-600 py-2.5 text-sm font-semibold text-white transition-all hover:bg-sky-700 active:scale-[0.98]"
        >
          Voeg toe aan deze training
        </button>
      )}
    </div>
  );
}
