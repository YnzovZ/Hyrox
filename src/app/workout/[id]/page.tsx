"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { generateTrainingPlan, weekPhases, Workout, Exercise, exerciseAlternatives, ExerciseAlternative } from "@/lib/data";
import BosuReminder from "@/components/BosuReminder";
import { getWorkoutOverride, saveWorkoutOverride, isWorkoutCompleted, markWorkoutComplete, removeCompletedWorkout, removeExerciseProgress, getExerciseWeight, saveExerciseWeight, getExerciseProgress, saveExerciseProgress, getChosenAlternative, saveChosenAlternative } from "@/lib/storage";

function ProgressOverlay({ stage, onTap, hasThumb }: { stage: number; onTap: () => void; hasThumb: boolean }) {
  const done = stage >= 3;

  if (!hasThumb) {
    const fillHeight = stage === 1 ? "33%" : stage === 2 ? "66%" : "0%";
    const fillColor = stage === 1 ? "#ef4444" : stage === 2 ? "#eab308" : "transparent";
    return (
      <button
        onClick={onTap}
        className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full overflow-hidden transition-transform active:scale-90"
      >
        <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800" />
        {stage > 0 && stage < 3 && (
          <div className="absolute bottom-0 left-0 right-0 transition-all duration-300" style={{ height: fillHeight, backgroundColor: fillColor }} />
        )}
        {done && <div className="absolute inset-0 bg-green-500 transition-colors duration-300" />}
        {done && (
          <svg className="relative z-10" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <button onClick={onTap} className="absolute inset-0 z-10 transition-transform active:scale-95">
      {stage > 0 && stage < 3 && (
        <div
          className="absolute bottom-0 left-0 right-0 rounded-b-lg transition-all duration-300"
          style={{
            height: stage === 1 ? "33%" : "66%",
            backgroundColor: stage === 1 ? "rgba(239,68,68,0.5)" : "rgba(234,179,8,0.5)",
          }}
        />
      )}
      {done && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-green-500/60">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      )}
    </button>
  );
}

function WeightBadge({ exerciseName }: { exerciseName: string }) {
  const [weight, setWeight] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setWeight(getExerciseWeight(exerciseName));
  }, [exerciseName]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function handleSave() {
    const trimmed = inputVal.trim();
    if (trimmed) {
      saveExerciseWeight(exerciseName, trimmed);
      setWeight(trimmed);
    }
    setEditing(false);
  }

  if (editing) {
    return (
      <form
        onSubmit={(e) => { e.preventDefault(); handleSave(); }}
        className="inline-flex items-center"
      >
        <input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onBlur={handleSave}
          placeholder="bv. 20kg"
          className="w-20 rounded border border-zinc-300 bg-white px-1.5 py-0.5 text-sm text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
        />
      </form>
    );
  }

  return (
    <button
      onClick={() => { setInputVal(weight ?? ""); setEditing(true); }}
      className="inline-flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5h11v11" />
        <path d="M3 3l4 4" />
        <path d="M17 17l4 4" />
        <path d="M17.5 6.5l-11 11" />
      </svg>
      {weight ? weight : "Gewicht"}
    </button>
  );
}

export default function WorkoutDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [altModal, setAltModal] = useState<{ name: string; alts: ExerciseAlternative[] } | null>(null);
  const [exProgress, setExProgress] = useState<number[]>([]);
  const [chosenAlts, setChosenAlts] = useState<Record<string, string>>({});
  const [originalExercises, setOriginalExercises] = useState<Exercise[]>([]);
  const [customized, setCustomized] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Exercise[]>([]);

  useEffect(() => {
    setMounted(true);
    const workouts = generateTrainingPlan();
    const plan = workouts.find((w) => w.id === params.id);
    if (plan) {
      const override = getWorkoutOverride(plan.id);
      const found = override ? { ...plan, exercises: override } : plan;
      setOriginalExercises(plan.exercises);
      setCustomized(!!override);
      setWorkout(found);
      setCompleted(isWorkoutCompleted(found.id));
      const saved = getExerciseProgress(found.id);
      setExProgress(saved.length === found.exercises.length ? saved : new Array(found.exercises.length).fill(0));
      const alts: Record<string, string> = {};
      found.exercises.forEach((ex) => {
        const alt = getChosenAlternative(found.id, ex.name);
        if (alt) alts[ex.name] = alt;
      });
      setChosenAlts(alts);
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

  function handleUndoComplete() {
    if (!workout) return;
    removeCompletedWorkout(workout.id);
    removeExerciseProgress(workout.id);
    setCompleted(false);
    setExProgress(new Array(workout.exercises.length).fill(0));
  }

  function applyExercises(exercises: Exercise[], isCustom: boolean) {
    if (!workout) return;
    // Voortgang meenemen op naam, want de volgorde en het aantal kunnen veranderd zijn
    const progressByName = new Map(workout.exercises.map((ex, i) => [ex.name, exProgress[i] ?? 0]));
    const nextProgress = exercises.map((ex) => progressByName.get(ex.name) ?? 0);
    setWorkout({ ...workout, exercises });
    setExProgress(nextProgress);
    saveExerciseProgress(workout.id, nextProgress);
    setCustomized(isCustom);
    setEditing(false);
  }

  function saveEdit() {
    if (!workout) return;
    const cleaned = draft
      .map((ex) => ({ ...ex, name: ex.name.trim() }))
      .filter((ex) => ex.name);
    saveWorkoutOverride(workout.id, cleaned);
    applyExercises(cleaned, true);
  }

  function resetToOriginal() {
    if (!workout) return;
    saveWorkoutOverride(workout.id, null);
    applyExercises(originalExercises, false);
  }

  function updateDraft(i: number, patch: Partial<Exercise>) {
    setDraft((prev) => prev.map((ex, j) => (j === i ? { ...ex, ...patch } : ex)));
  }

  function moveDraft(i: number, dir: -1 | 1) {
    setDraft((prev) => {
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const copy = [...prev];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  }

  function handleExerciseTap(index: number) {
    if (!workout || completed) return;
    const next = [...exProgress];
    next[index] = (next[index] ?? 0) < 3 ? (next[index] ?? 0) + 1 : 0;
    setExProgress(next);
    saveExerciseProgress(workout.id, next);
    const allRegularDone = workout.exercises.every((ex, i) => ex.isBonus || next[i] >= 3);
    if (allRegularDone) {
      handleComplete();
    }
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

  const strengthExercises = new Set(Object.keys(exerciseAlternatives));
  function isStrengthExercise(name: string) {
    return strengthExercises.has(name);
  }

  function getYouTubeThumb(url: string): string | null {
    const m = url.match(/(?:v=|\/)([\w-]{11})/);
    return m ? `https://img.youtube.com/vi/${m[1]}/mqdefault.jpg` : null;
  }

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

      <BosuReminder />

      <section className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Oefeningen
            {customized && <span className="ml-2 normal-case tracking-normal text-amber-600 dark:text-amber-400">aangepast</span>}
          </h2>
          {!editing && (
            <button
              onClick={() => { setDraft(workout.exercises.map((ex) => ({ ...ex }))); setEditing(true); }}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" />
              </svg>
              Aanpassen
            </button>
          )}
        </div>

        {editing && (
          <div className="flex flex-col gap-3">
            {draft.map((ex, i) => (
              <div key={i} className="rounded-xl border border-amber-200 bg-white p-3 dark:border-amber-900 dark:bg-zinc-900">
                <div className="mb-2 flex items-center gap-2">
                  <input
                    value={ex.name}
                    onChange={(e) => updateDraft(i, { name: e.target.value })}
                    placeholder="Naam oefening"
                    className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-base font-semibold dark:border-zinc-700 dark:bg-zinc-800"
                  />
                  <button onClick={() => moveDraft(i, -1)} disabled={i === 0} aria-label="Omhoog" className="rounded-lg p-2 text-zinc-500 disabled:opacity-30">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg>
                  </button>
                  <button onClick={() => moveDraft(i, 1)} disabled={i === draft.length - 1} aria-label="Omlaag" className="rounded-lg p-2 text-zinc-500 disabled:opacity-30">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                  </button>
                  <button onClick={() => setDraft((prev) => prev.filter((_, j) => j !== i))} aria-label="Verwijder" className="rounded-lg p-2 text-red-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /></svg>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    ["sets", "Sets"],
                    ["reps", "Reps"],
                    ["duration", "Tijd"],
                    ["distance", "Afstand"],
                  ] as const).map(([field, label]) => (
                    <label key={field} className="text-xs text-zinc-500 dark:text-zinc-400">
                      {label}
                      <input
                        value={ex[field] ?? ""}
                        inputMode={field === "sets" ? "numeric" : "text"}
                        onChange={(e) => {
                          const v = e.target.value;
                          updateDraft(i, field === "sets"
                            ? { sets: v.trim() ? Number(v) || undefined : undefined }
                            : { [field]: v || undefined });
                        }}
                        className="mt-0.5 w-full rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={() => setDraft((prev) => [...prev, { name: "" }])}
              className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-white py-3 text-sm font-medium text-zinc-500 transition-all hover:border-amber-400 hover:text-amber-600 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="M5 12h14" /></svg>
              Oefening toevoegen
            </button>
            <div className="flex gap-3">
              <button onClick={() => setEditing(false)} className="flex-1 rounded-xl border border-zinc-200 py-3 text-sm font-medium dark:border-zinc-700">
                Annuleer
              </button>
              <button onClick={saveEdit} className="flex-1 rounded-xl bg-amber-500 py-3 text-sm font-semibold text-white">
                Opslaan
              </button>
            </div>
            {customized && (
              <button onClick={resetToOriginal} className="text-sm font-medium text-zinc-500 underline dark:text-zinc-400">
                Terug naar het originele schema
              </button>
            )}
          </div>
        )}

        {!editing && (
        <div className="flex flex-col gap-2">
          {workout.exercises.map((exercise, i) => {
            const alts = exerciseAlternatives[exercise.name];
            const showWeight = isStrengthExercise(exercise.name);
            const thumb = exercise.videoUrl ? getYouTubeThumb(exercise.videoUrl) : null;
            return (
              <div
                key={i}
                className={`rounded-xl border p-4 ${
                  exercise.isBonus
                    ? "border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50"
                    : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      {exercise.name}
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
                      {exercise.sets && <span>{exercise.sets} sets</span>}
                      {exercise.reps && <span>{exercise.reps} reps</span>}
                      {exercise.duration && <span>{exercise.duration}</span>}
                      {exercise.rest && <span>rust: {exercise.rest}</span>}
                      {exercise.distance && <span>{exercise.distance}</span>}
                      {exercise.weight && <span>{exercise.weight}</span>}
                      {showWeight && <WeightBadge exerciseName={exercise.name} />}
                    </div>
                    {exercise.notes && (
                      <p className="mt-1.5 text-sm text-amber-600 dark:text-amber-400">
                        {exercise.notes}
                      </p>
                    )}
                    {chosenAlts[exercise.name] && (
                      <p className="mt-1.5 text-sm text-purple-600 dark:text-purple-400">
                        Gedaan als: {chosenAlts[exercise.name]}
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
                          Video
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
                          Alts
                        </button>
                      )}
                    </div>
                  </div>
                  {workout.type !== "run" && (
                    thumb ? (
                      <div className="relative flex-shrink-0 overflow-hidden rounded-lg w-24 h-24">
                        <img
                          src={thumb}
                          alt={exercise.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                        <ProgressOverlay
                          stage={exProgress[i] ?? 0}
                          onTap={() => handleExerciseTap(i)}
                          hasThumb
                        />
                      </div>
                    ) : (
                      <ProgressOverlay
                        stage={exProgress[i] ?? 0}
                        onTap={() => handleExerciseTap(i)}
                        hasThumb={false}
                      />
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
        )}
      </section>

      <div className="pb-4">
        {completed ? (
          <button
            onClick={handleUndoComplete}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-100 py-3.5 text-base font-semibold text-green-800 transition-all active:scale-[0.98] dark:bg-green-900/30 dark:text-green-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Voltooid
          </button>
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setAltModal(null)}
        >
          <div
            className="w-full max-w-lg animate-[fadeIn_0.2s_ease-out] rounded-2xl bg-white px-5 pb-6 pt-5 shadow-xl dark:bg-zinc-900"
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
              {altModal.alts.map((alt, i) => {
                const isChosen = chosenAlts[altModal.name] === alt.name;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (!workout) return;
                      const newVal = isChosen ? null : alt.name;
                      if (newVal) {
                        setChosenAlts((prev) => ({ ...prev, [altModal.name]: newVal }));
                      } else {
                        setChosenAlts((prev) => {
                          const copy = { ...prev };
                          delete copy[altModal.name];
                          return copy;
                        });
                      }
                      saveChosenAlternative(workout.id, altModal.name, newVal);
                    }}
                    className={`rounded-xl border p-4 text-left transition-colors ${
                      isChosen
                        ? "border-green-400 bg-green-50 dark:border-green-600 dark:bg-green-950/30"
                        : "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                        isChosen
                          ? "border-green-500 bg-green-500"
                          : "border-zinc-300 dark:border-zinc-600"
                      }`}>
                        {isChosen && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </div>
                      <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{alt.name}</h4>
                      {alt.machine && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                          Machine
                        </span>
                      )}
                    </div>
                    <p className="mt-1 pl-7 text-sm text-zinc-500 dark:text-zinc-400">{alt.notes}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
  );
}
