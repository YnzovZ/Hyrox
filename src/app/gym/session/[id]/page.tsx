"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getExerciseById,
  muscleGroupLabels,
  warmupTypeLabels,
  warmupTypeEmoji,
  type MuscleGroup,
  type WarmupActivityType,
} from "@/lib/gym-data";
import { getGymSessions, updateGymSession, type CompletedGymSession } from "@/lib/storage";

const warmupTypes: WarmupActivityType[] = ["fiets", "loopband", "roeier"];

const muscleColors: Record<MuscleGroup, string> = {
  chest: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  back: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  shoulders: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  biceps: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  triceps: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  legs: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  core: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
};

export default function SessionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;

  const [session, setSession] = useState<CompletedGymSession | null>(null);
  const [mounted, setMounted] = useState(false);
  const [editingWarmup, setEditingWarmup] = useState(false);
  const [warmupDraft, setWarmupDraft] = useState<{ type: string; time?: string; distance?: string }[]>([]);

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

  function startEditWarmup() {
    setWarmupDraft(session?.warmupActivities ? [...session.warmupActivities.map((a) => ({ ...a }))] : []);
    setEditingWarmup(true);
  }

  function saveWarmup() {
    if (!session) return;
    const cleaned = warmupDraft.filter((a) => a.type);
    updateGymSession(session.id, { warmupActivities: cleaned.length > 0 ? cleaned : undefined });
    setSession({ ...session, warmupActivities: cleaned.length > 0 ? cleaned : undefined });
    setEditingWarmup(false);
  }

  if (!mounted || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
      </div>
    );
  }

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
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Warmup
          </h2>
          <button
            onClick={startEditWarmup}
            className="rounded-lg px-2 py-1 text-xs font-medium text-amber-600 transition-colors hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30"
          >
            {session.warmupActivities && session.warmupActivities.length > 0 ? "Bewerk" : "Toevoegen"}
          </button>
        </div>
        {session.warmupActivities && session.warmupActivities.length > 0 ? (
          <div className="flex flex-col gap-2">
            {session.warmupActivities.map((a, i) => {
              const desc = [
                a.time ? `${a.time} min` : null,
                a.distance ? `${a.distance} km` : null,
              ].filter(Boolean).join(", ");
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950/20"
                >
                  <span className="text-lg">{warmupTypeEmoji[a.type as WarmupActivityType] || ""}</span>
                  <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                    {warmupTypeLabels[a.type as WarmupActivityType] || a.type}
                  </span>
                  {desc && (
                    <span className="text-sm text-green-600 dark:text-green-400">{desc}</span>
                  )}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-green-500">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-zinc-400 dark:text-zinc-500">Geen warmup geregistreerd</p>
        )}
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

      {editingWarmup && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center" onClick={() => setEditingWarmup(false)}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900" onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">Warmup bewerken</h3>

            {warmupDraft.length > 0 && (
              <div className="mb-3 flex flex-col gap-2">
                {warmupDraft.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-800"
                  >
                    <span className="text-lg">{warmupTypeEmoji[activity.type as WarmupActivityType] || ""}</span>
                    <select
                      value={activity.type}
                      onChange={(e) => {
                        const copy = [...warmupDraft];
                        copy[idx] = { ...copy[idx], type: e.target.value };
                        setWarmupDraft(copy);
                      }}
                      className="rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                    >
                      {warmupTypes.map((t) => (
                        <option key={t} value={t}>{warmupTypeLabels[t]}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="min"
                      value={activity.time || ""}
                      onChange={(e) => {
                        const copy = [...warmupDraft];
                        copy[idx] = { ...copy[idx], time: e.target.value || undefined };
                        setWarmupDraft(copy);
                      }}
                      className="w-14 rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                    />
                    <span className="text-xs text-zinc-400">min</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="km"
                      value={activity.distance || ""}
                      onChange={(e) => {
                        const copy = [...warmupDraft];
                        copy[idx] = { ...copy[idx], distance: e.target.value || undefined };
                        setWarmupDraft(copy);
                      }}
                      className="w-14 rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                    />
                    <span className="text-xs text-zinc-400">km</span>
                    <button
                      onClick={() => setWarmupDraft(warmupDraft.filter((_, i) => i !== idx))}
                      className="ml-auto rounded p-1 text-zinc-400 hover:text-red-500"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-4 flex flex-wrap gap-2">
              {warmupTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setWarmupDraft([...warmupDraft, { type: t }])}
                  className="flex items-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-600 transition-all hover:border-amber-400 hover:text-amber-600 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  <span>{warmupTypeEmoji[t]}</span>
                  {warmupTypeLabels[t]}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditingWarmup(false)}
                className="flex-1 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium dark:border-zinc-700"
              >
                Annuleer
              </button>
              <button
                onClick={saveWarmup}
                className="flex-1 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-medium text-white"
              >
                Opslaan
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
