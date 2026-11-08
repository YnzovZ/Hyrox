"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  coachFocusOptions,
  generateCoachExercises,
  getExerciseById,
  muscleGroupLabels,
  warmupTypeLabels,
  warmupTypeEmoji,
  type CoachFocusOption,
  type CoachSession,
  type WarmupActivity,
  type WarmupActivityType,
  type MuscleGroup,
} from "@/lib/gym-data";
import { getRecentGymSessions, getLastStrengthDate } from "@/lib/storage";

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

export default function CoachPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);

  const [selectedFocus, setSelectedFocus] = useState<CoachFocusOption | null>(null);
  const [warmupActivities, setWarmupActivities] = useState<WarmupActivity[]>([]);
  const [generatedSession, setGeneratedSession] = useState<CoachSession | null>(null);

  const [recentGroupInfo, setRecentGroupInfo] = useState<{ group: string; daysAgo: number }[]>([]);
  const [daysSince, setDaysSince] = useState<number | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    const recent = getRecentGymSessions(5);
    const lastStrength = getLastStrengthDate();
    const ds = lastStrength
      ? Math.floor((Date.now() - lastStrength.getTime()) / (1000 * 60 * 60 * 24))
      : undefined;
    setDaysSince(ds);

    const groupDays: Record<string, number> = {};
    const now = Date.now();
    for (const s of recent) {
      const daysAgo = Math.floor((now - new Date(s.completedAt).getTime()) / (1000 * 60 * 60 * 24));
      for (const g of s.muscleGroups) {
        if (groupDays[g] === undefined || daysAgo < groupDays[g]) {
          groupDays[g] = daysAgo;
        }
      }
    }
    setRecentGroupInfo(
      Object.entries(groupDays)
        .sort((a, b) => a[1] - b[1])
        .map(([group, daysAgo]) => ({ group, daysAgo }))
    );
  }, []);

  function handleSelectFocus(option: CoachFocusOption) {
    setSelectedFocus(option);
    setStep(2);
  }

  function handleWarmupDone() {
    setStep(3);
    generateTraining();
  }

  function generateTraining() {
    if (!selectedFocus) return;

    const recent = getRecentGymSessions(3);
    const recentExerciseIds = new Set(
      recent.flatMap((s) => s.exercises.map((e) => e.exerciseId))
    );

    const exercises = generateCoachExercises(selectedFocus.groups, recentExerciseIds);

    const session: CoachSession = {
      name: `Coach: ${selectedFocus.label}`,
      muscleGroups: selectedFocus.groups,
      exercises,
      warmupActivities,
    };
    setGeneratedSession(session);
  }

  function removeGeneratedExercise(idx: number) {
    if (!generatedSession) return;
    setGeneratedSession({
      ...generatedSession,
      exercises: generatedSession.exercises.filter((_, i) => i !== idx),
    });
  }

  function startTraining() {
    if (!generatedSession) return;
    try {
      sessionStorage.setItem("hyrox_coach_session", JSON.stringify(generatedSession));
    } catch {}
    router.push("/gym/training/coach");
  }

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
        <button
          onClick={() => {
            if (step > 1) setStep(step - 1);
            else router.push("/gym");
          }}
          className="rounded-lg p-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold">Personal Trainer</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Stap {step} van 3
          </p>
        </div>
      </div>

      <div className="mb-4 flex gap-1">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors ${
              s <= step ? "bg-amber-500" : "bg-zinc-200 dark:bg-zinc-800"
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <StepFocus
          options={coachFocusOptions}
          recentGroupInfo={recentGroupInfo}
          daysSince={daysSince}
          onSelect={handleSelectFocus}
        />
      )}

      {step === 2 && (
        <StepWarmup
          warmupActivities={warmupActivities}
          setWarmupActivities={setWarmupActivities}
          warmupTypes={warmupTypes}
          onDone={handleWarmupDone}
        />
      )}

      {step === 3 && generatedSession && (
        <StepReview
          session={generatedSession}
          onRemoveExercise={removeGeneratedExercise}
          onStart={startTraining}
        />
      )}
    </main>
  );
}

function StepFocus({
  options,
  recentGroupInfo,
  daysSince,
  onSelect,
}: {
  options: CoachFocusOption[];
  recentGroupInfo: { group: string; daysAgo: number }[];
  daysSince?: number;
  onSelect: (opt: CoachFocusOption) => void;
}) {
  const groupDaysMap = new Map(recentGroupInfo.map((r) => [r.group, r.daysAgo]));

  return (
    <div>
      <h2 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
        Waar heb je zin in?
      </h2>
      {recentGroupInfo.length > 0 && (
        <div className="mb-4 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-400">
            Recent getraind
          </p>
          <div className="flex flex-wrap gap-2">
            {recentGroupInfo.map((r) => (
              <span
                key={r.group}
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  muscleColors[r.group as MuscleGroup] || "bg-zinc-100 text-zinc-600"
                }`}
              >
                {muscleGroupLabels[r.group as MuscleGroup] || r.group}
                {r.daysAgo === 0 ? " (vandaag)" : r.daysAgo === 1 ? " (gisteren)" : ` (${r.daysAgo}d)`}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-3">
        {options.map((opt) => {
          const groupsRecent = opt.groups.some((g) => {
            const d = groupDaysMap.get(g);
            return d !== undefined && d <= 1;
          });
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt)}
              className={`rounded-xl border p-4 text-left transition-all active:scale-[0.98] ${
                groupsRecent
                  ? "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                  : "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20"
              }`}
            >
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {opt.label}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{opt.description}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {opt.groups.map((g) => (
                  <span
                    key={g}
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${muscleColors[g]}`}
                  >
                    {muscleGroupLabels[g]}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepWarmup({
  warmupActivities,
  setWarmupActivities,
  warmupTypes,
  onDone,
}: {
  warmupActivities: WarmupActivity[];
  setWarmupActivities: (a: WarmupActivity[]) => void;
  warmupTypes: WarmupActivityType[];
  onDone: () => void;
}) {
  return (
    <div>
      <h2 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
        Hoe wil je opwarmen?
      </h2>
      <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
        Voeg een of meer warmup-activiteiten toe, of sla het over.
      </p>

      {warmupActivities.length > 0 && (
        <div className="mb-3 flex flex-col gap-2">
          {warmupActivities.map((activity, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="text-lg">{warmupTypeEmoji[activity.type]}</span>
              <select
                value={activity.type}
                onChange={(e) => {
                  const copy = [...warmupActivities];
                  copy[idx] = { ...copy[idx], type: e.target.value as WarmupActivityType };
                  setWarmupActivities(copy);
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
                  const copy = [...warmupActivities];
                  copy[idx] = { ...copy[idx], time: e.target.value || undefined };
                  setWarmupActivities(copy);
                }}
                className="w-16 rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              />
              <span className="text-xs text-zinc-400">min</span>
              <input
                type="text"
                inputMode="decimal"
                placeholder="km"
                value={activity.distance || ""}
                onChange={(e) => {
                  const copy = [...warmupActivities];
                  copy[idx] = { ...copy[idx], distance: e.target.value || undefined };
                  setWarmupActivities(copy);
                }}
                className="w-16 rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              />
              <span className="text-xs text-zinc-400">km</span>
              <button
                onClick={() => setWarmupActivities(warmupActivities.filter((_, i) => i !== idx))}
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
            onClick={() => setWarmupActivities([...warmupActivities, { type: t }])}
            className="flex items-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-600 transition-all hover:border-amber-400 hover:text-amber-600 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
          >
            <span>{warmupTypeEmoji[t]}</span>
            {warmupTypeLabels[t]}
          </button>
        ))}
      </div>

      <button
        onClick={onDone}
        className="w-full rounded-xl bg-amber-500 py-4 text-base font-bold text-white transition-all hover:bg-amber-600 active:scale-[0.98]"
      >
        {warmupActivities.length > 0 ? "Verder" : "Geen warmup, verder"}
      </button>
    </div>
  );
}

function StepReview({
  session,
  onRemoveExercise,
  onStart,
}: {
  session: CoachSession;
  onRemoveExercise: (idx: number) => void;
  onStart: () => void;
}) {
  return (
    <div>
      <h2 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
        Jouw training
      </h2>
      <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
        Dit is wat de coach voor je heeft samengesteld. Je kunt oefeningen verwijderen voor je start.
      </p>

      {session.warmupActivities.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Warmup
          </h3>
          <div className="flex flex-col gap-2">
            {session.warmupActivities.map((a, i) => {
              const desc = [
                a.time ? `${a.time} min` : null,
                a.distance ? `${a.distance} km` : null,
              ].filter(Boolean).join(", ");
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <span className="text-lg">{warmupTypeEmoji[a.type]}</span>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {warmupTypeLabels[a.type]}
                  </span>
                  {desc && (
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">{desc}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Oefeningen ({session.exercises.length})
        </h3>
        <div className="flex flex-col gap-2">
          {session.exercises.map((ex, idx) => {
            const def = getExerciseById(ex.exerciseId);
            if (!def) return null;
            return (
              <div
                key={ex.exerciseId}
                className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="w-6 text-center text-sm font-bold text-zinc-400">
                  {idx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {def.name}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {muscleGroupLabels[def.muscleGroup]} &middot; {ex.sets}x{ex.reps}
                    {def.ynzoWeight && <> &middot; ~{def.ynzoWeight} kg</>}
                  </p>
                </div>
                <button
                  onClick={() => onRemoveExercise(idx)}
                  className="rounded p-1 text-zinc-400 hover:text-red-500"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={onStart}
        disabled={session.exercises.length === 0}
        className={`w-full rounded-xl py-4 text-base font-bold transition-all ${
          session.exercises.length > 0
            ? "bg-green-500 text-white hover:bg-green-600 active:scale-[0.98]"
            : "bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600"
        }`}
      >
        Start training
      </button>
    </div>
  );
}
