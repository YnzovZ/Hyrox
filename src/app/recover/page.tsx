"use client";

import { useState } from "react";
import { markWorkoutComplete, saveCustomWorkout } from "@/lib/storage";

const recoveryData = {
  completed: [
    { workoutId: "w1d4", completedAt: "2026-09-21T15:32:58", duration: 2308 },
    { workoutId: "w1d6", completedAt: "2026-09-25T09:06:23", duration: 2507 },
    { workoutId: "w2d6", completedAt: "2026-09-28T13:42:38", duration: 4978 },
    { workoutId: "w2d2", completedAt: "2026-09-29T14:11:56", duration: 1903 },
    { workoutId: "w4d4", completedAt: "2026-10-12T19:52:23", duration: 1502 },
    { workoutId: "w5d2", completedAt: "2026-10-21T16:22:16", duration: 2253 },
    { workoutId: "w6d4", completedAt: "2026-10-27T13:17:31", duration: 2105 },
    { workoutId: "w7d4", completedAt: "2026-11-03T20:53:55", duration: 2582 },
  ],
  custom: [
    { id: "garmin_w2_run2", week: 2, type: "run" as const, description: "Soest Hardlopen", distance: "4.0 km", time: "27 min", completedAt: "2026-10-03T17:54:39" },
    { id: "garmin_w5_run2", week: 5, type: "run" as const, description: "Binnen hardlopen 7.5 km", distance: "7.5 km", time: "95 min", completedAt: "2026-10-25T14:51:17" },
    { id: "garmin_w6_str2", week: 6, type: "strength" as const, description: "Krachtsport", time: "35 min", completedAt: "2026-10-28T13:09:55" },
    { id: "garmin_w6_str3", week: 6, type: "strength" as const, description: "Krachtsport", time: "45 min", completedAt: "2026-10-31T16:27:23" },
    { id: "garmin_w7_str2", week: 7, type: "strength" as const, description: "Krachtsport", time: "55 min", completedAt: "2026-11-06T13:02:40" },
  ],
};

export default function RecoverPage() {
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  function handleRecover() {
    try {
      for (const w of recoveryData.completed) {
        markWorkoutComplete(w);
      }
      for (const cw of recoveryData.custom) {
        saveCustomWorkout(cw);
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="mx-auto max-w-lg px-4 pt-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Data herstellen</h1>
        <p className="text-base text-zinc-500 dark:text-zinc-400">
          Trainingsdata terugzetten vanuit Garmin
        </p>
      </header>

      <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-3 text-lg font-semibold">Gevonden in Garmin</h2>
        <div className="mb-4 space-y-2 text-base">
          <p><span className="font-semibold text-amber-600 dark:text-amber-400">{recoveryData.completed.length}</span> plan workouts voltooid</p>
          <ul className="ml-4 space-y-1 text-sm text-zinc-500 dark:text-zinc-400">
            <li>Week 1: kracht + cardio</li>
            <li>Week 2: run + Hyrox sim met Veer</li>
            <li>Week 4: kracht</li>
            <li>Week 5: Zandvoort run</li>
            <li>Week 6: kracht</li>
            <li>Week 7: kracht</li>
          </ul>
          <p className="mt-3"><span className="font-semibold text-green-600 dark:text-green-400">{recoveryData.custom.length}</span> extra trainingen</p>
          <ul className="ml-4 space-y-1 text-sm text-zinc-500 dark:text-zinc-400">
            <li>Soest Hardlopen (wk 2)</li>
            <li>Binnen hardlopen 7.5 km (wk 5)</li>
            <li>3x Krachtsport (wk 6-7)</li>
          </ul>
        </div>

        {status === "idle" && (
          <button
            onClick={handleRecover}
            className="w-full rounded-xl bg-amber-500 py-3 text-base font-semibold text-white transition-colors hover:bg-amber-600 active:scale-[0.98]"
          >
            Data herstellen
          </button>
        )}

        {status === "done" && (
          <div className="space-y-3">
            <p className="rounded-lg bg-green-50 px-4 py-3 text-base font-medium text-green-700 dark:bg-green-950/30 dark:text-green-400">
              Data hersteld. {recoveryData.completed.length + recoveryData.custom.length} trainingen teruggezet.
            </p>
            <a
              href="/progress"
              className="block w-full rounded-xl bg-amber-500 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-amber-600"
            >
              Bekijk voortgang
            </a>
          </div>
        )}

        {status === "error" && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-base text-red-700 dark:bg-red-950/30 dark:text-red-400">
            Er ging iets mis. Probeer opnieuw.
          </p>
        )}
      </div>
    </main>
  );
}
