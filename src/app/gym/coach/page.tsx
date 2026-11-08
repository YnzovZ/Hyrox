"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  coachFocusOptions,
  generateCoachExercises,
  getExerciseById,
  muscleGroupLabels,
  adviseNextTraining,
  trainingDayOptions,
  type CoachFocusOption,
  type CoachSession,
  type MuscleGroup,
  type TrainingAdvice,
} from "@/lib/gym-data";
import { getRecentGymSessions, type CompletedGymSession } from "@/lib/storage";

const muscleColors: Record<MuscleGroup, string> = {
  chest: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  back: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  shoulders: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  biceps: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  triceps: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  legs: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  core: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
};

const focusCandidates = coachFocusOptions.map((o) => ({ id: o.id, name: o.label, groups: o.groups }));

export default function CoachPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [recent, setRecent] = useState<CompletedGymSession[]>([]);
  const [daysUntil, setDaysUntil] = useState<number | null>(null);
  const [generatedSession, setGeneratedSession] = useState<CoachSession | null>(null);

  useEffect(() => {
    setMounted(true);
    setRecent(getRecentGymSessions(10));
    const dag = new URLSearchParams(window.location.search).get("dag");
    if (dag !== null && trainingDayOptions.some((o) => String(o.days) === dag)) {
      setDaysUntil(Number(dag));
      setStep(2);
    }
  }, []);

  const advice: TrainingAdvice | null =
    daysUntil === null ? null : adviseNextTraining(recent, daysUntil, focusCandidates);

  function handleSelectDay(days: number) {
    setDaysUntil(days);
    setStep(2);
  }

  function handleSelectFocus(option: CoachFocusOption) {
    const recentExerciseIds = new Set(recent.slice(0, 3).flatMap((s) => s.exercises.map((e) => e.exerciseId)));
    setGeneratedSession({
      name: `Coach: ${option.label}`,
      muscleGroups: option.groups,
      exercises: generateCoachExercises(option.groups, recentExerciseIds),
    });
    setStep(3);
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

      {step === 1 && <StepWhen lastSession={recent[0]} onSelect={handleSelectDay} />}

      {step === 2 && advice && (
        <StepFocus advice={advice} onSelect={handleSelectFocus} />
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

function StepWhen({
  lastSession,
  onSelect,
}: {
  lastSession?: CompletedGymSession;
  onSelect: (days: number) => void;
}) {
  let lastLabel: string | null = null;
  if (lastSession) {
    const d = new Date(lastSession.completedAt);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = new Date(d);
    day.setHours(0, 0, 0, 0);
    const diff = Math.round((today.getTime() - day.getTime()) / 86400000);
    const when = diff === 0 ? "vandaag" : diff === 1 ? "gisteren" : `${diff} dagen geleden`;
    lastLabel = `Je laatste training was ${lastSession.trainingName}, ${when}.`;
  }

  return (
    <div>
      <h2 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
        Wanneer ga je trainen?
      </h2>
      <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
        {lastLabel ? `${lastLabel} ` : ""}Hoeveel hersteltijd ertussen zit, bepaalt wat slim is.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {trainingDayOptions.map((o) => (
          <button
            key={o.days}
            onClick={() => onSelect(o.days)}
            className="rounded-xl border border-zinc-200 bg-white p-4 text-left text-base font-semibold text-zinc-900 transition-all hover:border-amber-300 active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepFocus({
  advice,
  onSelect,
}: {
  advice: TrainingAdvice;
  onSelect: (opt: CoachFocusOption) => void;
}) {
  return (
    <div>
      <h2 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
        Waar ga je op trainen?
      </h2>
      <div
        className={`mb-4 flex gap-3 rounded-xl border p-4 ${
          advice.restAdvised
            ? "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20"
            : "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
        }`}
      >
        <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/70 text-base dark:bg-zinc-900/40">
          🧠
        </span>
        <p
          className={`text-sm leading-relaxed ${
            advice.restAdvised ? "text-amber-800 dark:text-amber-200" : "text-green-700 dark:text-green-300"
          }`}
        >
          {advice.reason}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {coachFocusOptions.map((opt) => {
          const isRecommended = advice.candidateId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt)}
              className={`rounded-xl border p-4 text-left transition-all active:scale-[0.98] ${
                isRecommended
                  ? "border-green-300 bg-green-50 ring-2 ring-green-200 dark:border-green-700 dark:bg-green-950/30 dark:ring-green-800"
                  : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {opt.label}
                </h3>
                {isRecommended && (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                    Aanbevolen
                  </span>
                )}
              </div>
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
        Dit is wat de coach voor je heeft samengesteld. Haal weg wat je niet wilt. Hardlopen, fietsen of roeien voeg je tijdens de training toe.
      </p>

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
