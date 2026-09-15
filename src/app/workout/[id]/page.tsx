"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { generateTrainingPlan, weekPhases, Workout, exerciseAlternatives, ExerciseAlternative } from "@/lib/data";
import { isWorkoutCompleted, markWorkoutComplete } from "@/lib/storage";

export default function WorkoutDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [altModal, setAltModal] = useState<{ name: string; alts: ExerciseAlternative[] } | null>(null);

  useEffect(() => {
    setMounted(true);
    const workouts = generateTrainingPlan();
    const found = workouts.find((w) => w.id === params.id);
    if (found) {
      setWorkout(found);
      setCompleted(isWorkoutCompleted(found.id));
    }
  }, [params.id]);

  function handleComplete() {
    if (!workout) return;
    markWorkoutComplete({
      workoutId: workout.id,
      completedAt: new Date().toISOString(),
    });
    setCompleted(true);
  }

  if (!mounted || !workout) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  const typeLabels: Record<string, string> = {
    run: "Run",
    strength: "Kracht",
    hyrox: "Hyrox",
    recovery: "Herstel",
  };

  const typeColors: Record<string, string> = {
    run: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    strength: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    hyrox: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    recovery: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  };

  return (
    <main className="mx-auto max-w-lg px-4 pt-6">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1 text-base text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Terug
      </button>

      <div className="mb-2 flex items-center gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-sm font-medium ${typeColors[workout.type]}`}>
          {typeLabels[workout.type]}
        </span>
        <span className="text-sm text-zinc-400">
          Week {workout.week} - {weekPhases[workout.week - 1]}
        </span>
      </div>

      <h1 className="mb-1 text-3xl font-bold tracking-tight">{workout.title}</h1>
      <p className="mb-6 text-base text-zinc-500 dark:text-zinc-400">{workout.description}</p>

      <div className="mb-6 flex gap-4">
        <div className="flex items-center gap-1.5 text-base text-zinc-500 dark:text-zinc-400">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {workout.duration}
        </div>
        <div className="flex items-center gap-1.5 text-base text-zinc-500 dark:text-zinc-400">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          {workout.difficulty === "easy" ? "Makkelijk" : workout.difficulty === "moderate" ? "Gemiddeld" : workout.difficulty === "hard" ? "Zwaar" : "Race"}
        </div>
      </div>

      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Oefeningen
        </h2>
        <div className="flex flex-col gap-2">
          {workout.exercises.map((exercise, i) => {
            const alts = exerciseAlternatives[exercise.name];
            return (
              <div
                key={i}
                className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      {exercise.name}
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
                      {exercise.sets && <span>{exercise.sets} sets</span>}
                      {exercise.reps && <span>{exercise.reps} reps</span>}
                      {exercise.duration && <span>{exercise.duration}</span>}
                      {exercise.distance && <span>{exercise.distance}</span>}
                      {exercise.weight && <span>{exercise.weight}</span>}
                      {exercise.rest && <span>Rust: {exercise.rest}</span>}
                    </div>
                    {exercise.notes && (
                      <p className="mt-1.5 text-sm text-amber-600 dark:text-amber-400">
                        {exercise.notes}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {exercise.videoUrl && (
                        <a
                          href={exercise.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                          Bekijk video
                        </a>
                      )}
                      {alts && (
                        <button
                          onClick={() => setAltModal({ name: exercise.name, alts })}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-3 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-100 dark:bg-purple-950/30 dark:text-purple-400 dark:hover:bg-purple-950/50"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 3h5v5" />
                            <path d="M8 3H3v5" />
                            <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
                            <path d="m15 9 6-6" />
                          </svg>
                          Alternatieven
                        </button>
                      )}
                    </div>
                  </div>
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                    {i + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="pb-4">
        {completed ? (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-green-100 py-3.5 text-base font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Voltooid
          </div>
        ) : (
          <button
            onClick={handleComplete}
            className="w-full rounded-xl bg-amber-500 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-amber-600 active:scale-[0.98]"
          >
            Markeer als voltooid
          </button>
        )}
      </div>

      {altModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setAltModal(null)}
        >
          <div
            className="w-full max-w-lg animate-[slideUp_0.25s_ease-out] rounded-t-2xl bg-white px-5 pb-8 pt-5 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Alternatieven</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">voor {altModal.name}</p>
              </div>
              <button
                onClick={() => setAltModal(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {altModal.alts.map((alt, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800"
                >
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{alt.name}</h4>
                    {alt.machine && (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        Machine
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{alt.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
