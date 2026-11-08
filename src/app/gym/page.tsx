"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  presetTrainings,
  adviseNextTraining,
  trainingDayOptions,
  getCoachTip,
  muscleGroupLabels,
  type MuscleGroup,
  type GymTrainingTemplate,
} from "@/lib/gym-data";

const presetCandidates = presetTrainings.map((t) => ({ id: t.id, name: t.name, groups: t.muscleGroups }));
import {
  getGymTrainings,
  getRecentGymSessions,
  getLastStrengthDate,
  deleteGymTraining,
  type SavedGymTraining,
  type CompletedGymSession,
} from "@/lib/storage";

const muscleColors: Record<MuscleGroup, string> = {
  chest: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  back: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  shoulders: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  biceps: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  triceps: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  legs: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  core: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
};

export default function GymPage() {
  const [customTrainings, setCustomTrainings] = useState<SavedGymTraining[]>([]);
  const [recentSessions, setRecentSessions] = useState<CompletedGymSession[]>([]);
  const [adviceSessions, setAdviceSessions] = useState<CompletedGymSession[]>([]);
  const [daysUntil, setDaysUntil] = useState(0);
  const [coachTip, setCoachTip] = useState("");
  const [mounted, setMounted] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setCustomTrainings(getGymTrainings());
    const recent = getRecentGymSessions(10);
    setRecentSessions(recent.slice(0, 5));
    const lastStrength = getLastStrengthDate();
    const daysSince = lastStrength
      ? Math.floor((Date.now() - lastStrength.getTime()) / (1000 * 60 * 60 * 24))
      : undefined;
    setCoachTip(getCoachTip(recent, daysSince));
    setAdviceSessions(recent);
    const trainedToday = recent.length > 0 && new Date(recent[0].completedAt).toDateString() === new Date().toDateString();
    setDaysUntil(trainedToday ? 1 : 0);
  }, []);

  const advice = adviseNextTraining(adviceSessions, daysUntil, presetCandidates);
  const suggestion: GymTrainingTemplate | undefined = presetTrainings.find((t) => t.id === advice.candidateId);

  function handleDelete(id: string) {
    deleteGymTraining(id);
    setCustomTrainings(getGymTrainings());
    setDeleteTarget(null);
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
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Gym</h1>
        <p className="text-base text-zinc-500 dark:text-zinc-400">
          Kies een training of maak er zelf een
        </p>
      </header>

      <Link
        href={`/gym/coach?dag=${daysUntil}`}
        className="mb-6 flex items-center gap-4 rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4 transition-all hover:shadow-md active:scale-[0.98] dark:border-green-800 dark:from-green-950/30 dark:to-emerald-950/30"
      >
        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl dark:bg-green-900/40">
          🧠
        </span>
        <div className="flex-1">
          <h3 className="text-base font-bold text-green-700 dark:text-green-300">
            Personal Trainer
          </h3>
          <p className="text-sm text-green-600 dark:text-green-400">
            Laat de coach een training voor je samenstellen
          </p>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </Link>

      {coachTip && (
        <div className="mb-6 flex gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-base dark:bg-amber-900/40">
            💪
          </span>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {coachTip}
          </p>
        </div>
      )}

      {recentSessions.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Recente sessies
          </h2>
          <div className="flex flex-col gap-2">
            {recentSessions.map((s) => {
              const date = new Date(s.completedAt);
              const isToday = new Date().toDateString() === date.toDateString();
              const isYesterday = new Date(Date.now() - 86400000).toDateString() === date.toDateString();
              const dayLabel = isToday
                ? "Vandaag"
                : isYesterday
                  ? "Gisteren"
                  : date.toLocaleDateString("nl-NL", { weekday: "short", day: "numeric", month: "short" });
              const timeLabel = date.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
              return (
                <Link
                  key={s.id}
                  href={`/gym/session/${s.id}`}
                  className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 transition-all hover:border-zinc-300 hover:shadow-sm active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {s.trainingName}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {dayLabel} om {timeLabel} &middot; {s.exercises.length} oefeningen
                    </p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300 dark:text-zinc-600">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {suggestion && (
        <section className="mb-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Volgende training
          </h2>
          <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-300">Wanneer ga je?</p>
          <div className="mb-3 grid grid-cols-4 gap-2">
            {trainingDayOptions.map((o) => (
              <button
                key={o.days}
                onClick={() => setDaysUntil(o.days)}
                className={`rounded-lg px-2 py-2 text-sm font-medium transition-all active:scale-[0.97] ${
                  daysUntil === o.days
                    ? "bg-amber-500 text-white shadow-sm"
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
          <p
            className={`mb-3 rounded-xl p-3 text-sm leading-relaxed ${
              advice.restAdvised
                ? "bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-200"
                : "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-300"
            }`}
          >
            {advice.reason}
          </p>
          <Link
            href={`/gym/training/${suggestion.id}`}
            className={`block rounded-xl border-2 p-4 transition-all hover:shadow-md active:scale-[0.98] ${
              advice.restAdvised
                ? "border-zinc-200 bg-white opacity-80 dark:border-zinc-800 dark:bg-zinc-900"
                : "border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30"
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-bold text-amber-700 dark:text-amber-300">
                {suggestion.name}
              </h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
            <p className="mb-2 text-sm text-amber-600 dark:text-amber-400">
              {suggestion.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {suggestion.muscleGroups.map((mg) => (
                <span key={mg} className={`rounded-full px-2 py-0.5 text-xs font-medium ${muscleColors[mg]}`}>
                  {muscleGroupLabels[mg]}
                </span>
              ))}
            </div>
          </Link>
        </section>
      )}

      <section className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Trainingsbibliotheek
        </h2>
        <div className="flex flex-col gap-3">
          {presetTrainings.map((t) => (
            <TrainingCard key={t.id} training={t} />
          ))}
        </div>
      </section>

      {customTrainings.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Mijn trainingen
          </h2>
          <div className="flex flex-col gap-3">
            {customTrainings.map((ct) => (
              <div key={ct.id} className="relative">
                <Link
                  href={`/gym/training/custom-${ct.id}`}
                  className="block rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-sm active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        {ct.name}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {ct.exercises.length} oefeningen
                        {ct.lastUsed && (
                          <> &middot; laatst: {new Date(ct.lastUsed).toLocaleDateString("nl-NL", { day: "numeric", month: "short" })}</>
                        )}
                      </p>
                    </div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300 dark:text-zinc-600">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </Link>
                <button
                  onClick={(e) => { e.preventDefault(); setDeleteTarget(ct.id); }}
                  className="absolute top-3 right-12 rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18" /><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <Link
        href="/gym/builder"
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-white py-4 text-base font-medium text-zinc-500 transition-all hover:border-amber-400 hover:text-amber-600 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-amber-600 dark:hover:text-amber-400"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14" /><path d="M5 12h14" />
        </svg>
        Nieuwe training maken
      </Link>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setDeleteTarget(null)}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900" onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">Training verwijderen?</h3>
            <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">Dit kan niet ongedaan gemaakt worden.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium dark:border-zinc-700">
                Annuleer
              </button>
              <button onClick={() => handleDelete(deleteTarget)} className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white">
                Verwijder
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function TrainingCard({ training }: { training: GymTrainingTemplate }) {
  return (
    <Link
      href={`/gym/training/${training.id}`}
      className="block rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-sm active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          {training.name}
        </h3>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300 dark:text-zinc-600">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
      <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">{training.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {training.muscleGroups.map((mg) => (
          <span key={mg} className={`rounded-full px-2 py-0.5 text-xs font-medium ${muscleColors[mg]}`}>
            {muscleGroupLabels[mg]}
          </span>
        ))}
      </div>
    </Link>
  );
}
