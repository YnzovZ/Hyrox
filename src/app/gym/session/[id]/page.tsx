"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getExerciseById,
  muscleGroupLabels,
  muscleColors,
  activityLabels,
  activityEmoji,
  describeActivity,
  type MuscleGroup,
  type ActivityType,
  type SessionActivity,
} from "@/lib/gym-data";
import { getGymSessions, updateGymSession, getSessionActivities, type CompletedGymSession } from "@/lib/storage";
import ActivitySheet from "@/components/ActivitySheet";

export default function SessionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;

  const [session, setSession] = useState<CompletedGymSession | null>(null);
  const [mounted, setMounted] = useState(false);
  // null = gesloten, -1 = nieuwe activiteit, >= 0 = bestaande aanpassen
  const [sheetIdx, setSheetIdx] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const all = getGymSessions();
    const found = all.find((s) => s.id === sessionId);
    if (!found) {
      router.push("/gym");
      return;
    }
    setSession(found);
  }, [sessionId, router]);

  function saveActivities(next: SessionActivity[]) {
    if (!session) return;
    const updates = { activities: next, warmupActivities: undefined };
    updateGymSession(session.id, updates);
    setSession({ ...session, ...updates });
    setSheetIdx(null);
  }

  if (!mounted || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  const activities = getSessionActivities(session) as SessionActivity[];
  const date = new Date(session.completedAt);
  const dateStr = date.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const timeStr = date.toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="mx-auto max-w-lg px-4 pt-8 pb-12">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="rounded-lg p-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold">{session.trainingName}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {dateStr} om {timeStr}
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {session.muscleGroups.map((mg) => (
          <span
            key={mg}
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${muscleColors[mg as MuscleGroup] || "bg-zinc-100 text-zinc-600"}`}
          >
            {muscleGroupLabels[mg as MuscleGroup] || mg}
          </span>
        ))}
      </div>

      <section className="mb-6">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Activiteiten ({activities.length})
        </h2>
        <div className="flex flex-col gap-2">
          {activities.map((a, i) => {
            const desc = describeActivity(a);
            return (
              <button
                key={i}
                onClick={() => setSheetIdx(i)}
                className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-left transition-all active:scale-[0.98] dark:border-green-800 dark:bg-green-950/20"
              >
                <span className="text-lg">{activityEmoji[a.type as ActivityType] || ""}</span>
                <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                  {activityLabels[a.type as ActivityType] || a.type}
                </span>
                {desc && (
                  <span className="text-sm text-green-600 dark:text-green-400">{desc}</span>
                )}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-green-400">
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" />
                </svg>
              </button>
            );
          })}
          <button
            onClick={() => setSheetIdx(-1)}
            className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-white py-3 text-sm font-medium text-zinc-500 transition-all hover:border-amber-400 hover:text-amber-600 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" /><path d="M5 12h14" />
            </svg>
            Activiteit toevoegen
          </button>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Oefeningen ({session.exercises.length})
        </h2>
        <div className="flex flex-col gap-2">
          {session.exercises.map((ex, idx) => {
            const def = getExerciseById(ex.exerciseId);
            return (
              <div
                key={`${ex.exerciseId}-${idx}`}
                className={`rounded-xl border p-4 ${
                  ex.done
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
                    : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                }`}
              >
                <div className="flex items-start gap-2">
                  <svg
                    width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className={`mt-0.5 flex-shrink-0 ${ex.done ? "text-green-600" : "text-zinc-300 dark:text-zinc-600"}`}
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <div className="min-w-0 flex-1">
                    <h3 className={`font-semibold ${ex.done ? "text-green-700 dark:text-green-400" : "text-zinc-900 dark:text-zinc-100"}`}>
                      {def?.name || ex.exerciseId}
                    </h3>
                    {def && (
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">
                        {muscleGroupLabels[def.muscleGroup]} &middot; {def.equipment}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-4 pl-7">
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
              </div>
            );
          })}
        </div>
      </section>

      <button
        onClick={() => router.back()}
        className="w-full rounded-xl border border-zinc-200 py-3 text-base font-medium text-zinc-700 transition-all hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
      >
        Terug
      </button>

      {sheetIdx !== null && (
        <ActivitySheet
          initial={sheetIdx >= 0 ? activities[sheetIdx] : undefined}
          onClose={() => setSheetIdx(null)}
          onDelete={sheetIdx >= 0 ? () => saveActivities(activities.filter((_, i) => i !== sheetIdx)) : undefined}
          onSave={(a) =>
            saveActivities(
              sheetIdx >= 0 ? activities.map((x, i) => (i === sheetIdx ? a : x)) : [...activities, a]
            )
          }
        />
      )}
    </main>
  );
}
