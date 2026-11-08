"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  presetTrainings,
  exerciseLibrary,
  defaultWarmups,
  getExerciseById,
  muscleGroupLabels,
  activityLabels,
  activityEmoji,
  describeActivity,
  type GymTrainingExercise,
  type SessionActivity,
  type ActivityType,
  type MuscleGroup,
  type GymExercise,
  type CoachSession,
} from "@/lib/gym-data";
import {
  getGymTrainings,
  getGymWeightForExercise,
  saveGymWeight,
  saveGymSession,
  saveGymTraining,
  getCalendarWeek,
} from "@/lib/storage";
import ActivitySheet from "@/components/ActivitySheet";

interface TrackedActivity {
  activity: SessionActivity;
  done: boolean;
}

interface ActiveExercise {
  exerciseId: string;
  name: string;
  sets: number;
  reps: string;
  weight: string;
  done: boolean;
}

const allMuscleGroups: MuscleGroup[] = ["chest", "back", "shoulders", "biceps", "triceps", "legs", "core"];

const DELETE_BTN_W = 76;
const DRAG_THRESHOLD = 5;
const ITEM_GAP = 12;

function SwipeableCard({
  children,
  onRemove,
  isOpen,
  onOpen,
  onClose,
}: {
  children: React.ReactNode;
  onRemove: () => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const offsetRef = useRef(0);
  const swiping = useRef(false);
  const hasMoved = useRef(false);

  useEffect(() => {
    if (!contentRef.current) return;
    if (!isOpen && offsetRef.current !== 0) {
      offsetRef.current = 0;
      contentRef.current.style.transition = "transform 0.2s ease-out";
      contentRef.current.style.transform = "translateX(0)";
      const el = contentRef.current;
      setTimeout(() => { el.style.transition = ""; }, 200);
    }
  }, [isOpen]);

  function snapClosed() {
    if (!contentRef.current) return;
    contentRef.current.style.transition = "transform 0.2s ease-out";
    contentRef.current.style.transform = "translateX(0)";
    offsetRef.current = 0;
    onClose();
    const el = contentRef.current;
    setTimeout(() => { el.style.transition = ""; }, 200);
  }

  function onTouchStart(e: React.TouchEvent) {
    if ((e.target as HTMLElement).closest("[data-drag-handle]")) return;
    startX.current = e.touches[0].clientX;
    swiping.current = true;
    hasMoved.current = false;
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!swiping.current || !contentRef.current) return;
    hasMoved.current = true;
    const base = isOpen ? -DELETE_BTN_W : 0;
    const diff = e.touches[0].clientX - startX.current + base;
    const clamped = Math.max(-DELETE_BTN_W, Math.min(0, diff));
    offsetRef.current = clamped;
    contentRef.current.style.transform = `translateX(${clamped}px)`;
  }

  function onTouchEnd() {
    swiping.current = false;
    if (!contentRef.current) return;

    if (!hasMoved.current) {
      if (isOpen) snapClosed();
      return;
    }

    const shouldOpen = offsetRef.current < -DELETE_BTN_W / 2;
    contentRef.current.style.transition = "transform 0.2s ease-out";

    if (shouldOpen) {
      contentRef.current.style.transform = `translateX(-${DELETE_BTN_W}px)`;
      offsetRef.current = -DELETE_BTN_W;
      onOpen();
    } else {
      contentRef.current.style.transform = "translateX(0)";
      offsetRef.current = 0;
      if (isOpen) onClose();
    }

    const el = contentRef.current;
    setTimeout(() => { el.style.transition = ""; }, 200);
  }

  function handleRemove() {
    if (!contentRef.current) {
      onRemove();
      return;
    }
    contentRef.current.style.transition = "transform 0.2s ease-in, opacity 0.2s ease-in";
    contentRef.current.style.transform = "translateX(-100%)";
    contentRef.current.style.opacity = "0";
    setTimeout(onRemove, 200);
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
      <button
        onClick={handleRemove}
        className="absolute right-0 top-0 bottom-0 flex w-[76px] flex-col items-center justify-center gap-1 rounded-r-xl bg-red-500 text-white active:bg-red-600"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18" /><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
        </svg>
        <span className="text-xs font-semibold">Wissen</span>
      </button>
      <div
        ref={contentRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative z-10"
      >
        {children}
      </div>
    </div>
  );
}

export default function GymTrainingPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [training, setTraining] = useState<{
    name: string;
    exercises: GymTrainingExercise[];
    muscleGroups: MuscleGroup[];
    sourceId: string;
  } | null>(null);
  const [activeExercises, setActiveExercises] = useState<ActiveExercise[]>([]);
  const [activities, setActivities] = useState<TrackedActivity[]>([]);
  // null = gesloten, -1 = nieuwe activiteit, >= 0 = bestaande aanpassen
  const [activitySheetIdx, setActivitySheetIdx] = useState<number | null>(null);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [showComplete, setShowComplete] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [filterGroup, setFilterGroup] = useState<MuscleGroup | "all">("all");

  const [openSwipeIdx, setOpenSwipeIdx] = useState<number | null>(null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  const dragStartY = useRef(0);
  const isDragActive = useRef(false);
  const pendingDragIdx = useRef<number | null>(null);
  const itemPositions = useRef<{ top: number; height: number }[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
    loadTraining();
  }, [id]);

  function loadTraining() {
    let name = "";
    let exercises: GymTrainingExercise[] = [];
    let warmupKey = "none";
    let plannedActivities: SessionActivity[] = [];
    let muscleGroups: MuscleGroup[] = [];
    let sourceId = id;

    if (id === "coach") {
      try {
        const stored = sessionStorage.getItem("hyrox_coach_session");
        if (!stored) { router.push("/gym"); return; }
        const session: CoachSession = JSON.parse(stored);
        name = session.name;
        exercises = session.exercises;
        muscleGroups = session.muscleGroups;
        sourceId = "coach";
      } catch {
        router.push("/gym");
        return;
      }
    } else if (id.startsWith("custom-")) {
      const customId = id.replace("custom-", "");
      const customs = getGymTrainings();
      const custom = customs.find((t) => t.id === customId);
      if (!custom) {
        router.push("/gym");
        return;
      }
      name = custom.name;
      exercises = custom.exercises;
      warmupKey = custom.warmupKey;
      plannedActivities = (custom.warmupActivities as SessionActivity[]) || [];
      sourceId = custom.id;
      const groups = new Set<MuscleGroup>();
      for (const ex of exercises) {
        const def = getExerciseById(ex.exerciseId);
        if (def) groups.add(def.muscleGroup);
      }
      muscleGroups = Array.from(groups);
    } else {
      const preset = presetTrainings.find((t) => t.id === id);
      if (!preset) {
        router.push("/gym");
        return;
      }
      name = preset.name;
      exercises = preset.exercises;
      warmupKey = preset.warmupKey;
      muscleGroups = preset.muscleGroups;
      sourceId = preset.id;
    }

    const warmup = defaultWarmups[warmupKey];
    if (plannedActivities.length === 0 && warmup && warmup.type !== "geen") {
      const minutes = warmup.intervals.reduce((sum, i) => sum + i.minutes, 0);
      plannedActivities = [{ type: warmup.type, time: String(minutes) }];
    }
    setTraining({ name, exercises, muscleGroups, sourceId });
    setActivities(plannedActivities.map((activity) => ({ activity, done: false })));

    const active: ActiveExercise[] = exercises.map((ex) => {
      const def = getExerciseById(ex.exerciseId);
      const savedWeight = getGymWeightForExercise(ex.exerciseId);
      const defaultWeight = def?.ynzoWeight || "";
      return {
        exerciseId: ex.exerciseId,
        name: def?.name || ex.exerciseId,
        sets: ex.sets,
        reps: ex.reps,
        weight: savedWeight || defaultWeight,
        done: false,
      };
    });
    setActiveExercises(active);
  }

  function toggleExerciseDone(idx: number) {
    setActiveExercises((prev) =>
      prev.map((ex, i) => (i === idx ? { ...ex, done: !ex.done } : ex))
    );
  }

  function updateWeight(idx: number, weight: string) {
    setActiveExercises((prev) =>
      prev.map((ex, i) => (i === idx ? { ...ex, weight } : ex))
    );
  }

  function updateSets(idx: number, sets: number) {
    setActiveExercises((prev) =>
      prev.map((ex, i) => (i === idx ? { ...ex, sets: Math.max(1, sets) } : ex))
    );
  }

  function updateReps(idx: number, reps: string) {
    setActiveExercises((prev) =>
      prev.map((ex, i) => (i === idx ? { ...ex, reps } : ex))
    );
  }

  function removeExercise(idx: number) {
    setActiveExercises((prev) => prev.filter((_, i) => i !== idx));
    if (editIdx === idx) setEditIdx(null);
    else if (editIdx !== null && editIdx > idx) setEditIdx(editIdx - 1);
    setOpenSwipeIdx(null);
  }

  function addExercise(exercise: GymExercise) {
    const savedWeight = getGymWeightForExercise(exercise.id);
    const defaultWeight = exercise.ynzoWeight || "";
    setActiveExercises((prev) => [
      ...prev,
      {
        exerciseId: exercise.id,
        name: exercise.name,
        sets: exercise.defaultSets,
        reps: exercise.defaultReps,
        weight: savedWeight || defaultWeight,
        done: false,
      },
    ]);
    setShowPicker(false);
  }

  // --- Drag-to-reorder logic ---

  function cacheItemPositions() {
    itemPositions.current = itemRefs.current.map((el) => {
      if (!el) return { top: 0, height: 0 };
      const rect = el.getBoundingClientRect();
      return { top: rect.top, height: rect.height };
    });
  }

  function computeTargetIdx(offset: number): number {
    if (dragIdx === null) return -1;
    const pos = itemPositions.current;
    if (!pos[dragIdx]) return dragIdx;

    const draggedCenter = pos[dragIdx].top + pos[dragIdx].height / 2 + offset;
    let target = dragIdx;

    for (let i = 0; i < pos.length; i++) {
      if (i === dragIdx || !pos[i]) continue;
      const mid = pos[i].top + pos[i].height / 2;
      if (dragIdx < i && draggedCenter > mid) target = i;
      if (dragIdx > i && draggedCenter < mid) target = i;
    }
    return target;
  }

  function getItemStyle(i: number): React.CSSProperties {
    if (dragIdx === null) return {};

    if (i === dragIdx) {
      return {
        transform: `translateY(${dragOffset}px)`,
        zIndex: 10,
        opacity: 0.85,
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        position: "relative",
      };
    }

    const target = computeTargetIdx(dragOffset);
    const draggedH = (itemPositions.current[dragIdx]?.height || 0) + ITEM_GAP;

    if (dragIdx < target && i > dragIdx && i <= target) {
      return { transform: `translateY(-${draggedH}px)`, transition: "transform 0.15s ease" };
    }
    if (dragIdx > target && i >= target && i < dragIdx) {
      return { transform: `translateY(${draggedH}px)`, transition: "transform 0.15s ease" };
    }

    return { transition: "transform 0.15s ease" };
  }

  function handleDragTouchStart(idx: number, clientY: number) {
    pendingDragIdx.current = idx;
    dragStartY.current = clientY;
    isDragActive.current = false;
    setOpenSwipeIdx(null);
  }

  function handleContainerTouchMove(e: React.TouchEvent) {
    if (pendingDragIdx.current === null && dragIdx === null) return;

    const clientY = e.touches[0].clientY;
    const offset = clientY - dragStartY.current;

    if (!isDragActive.current) {
      if (Math.abs(offset) > DRAG_THRESHOLD) {
        isDragActive.current = true;
        cacheItemPositions();
        setDragIdx(pendingDragIdx.current);
        setDragOffset(offset);
      }
      return;
    }

    setDragOffset(offset);
  }

  function handleContainerTouchEnd() {
    if (isDragActive.current && dragIdx !== null) {
      const target = computeTargetIdx(dragOffset);
      if (target !== dragIdx) {
        setActiveExercises((prev) => {
          const copy = [...prev];
          const [item] = copy.splice(dragIdx, 1);
          copy.splice(target, 0, item);
          return copy;
        });
        if (editIdx !== null) {
          if (editIdx === dragIdx) setEditIdx(target);
          else if (dragIdx < target && editIdx > dragIdx && editIdx <= target) setEditIdx(editIdx - 1);
          else if (dragIdx > target && editIdx >= target && editIdx < dragIdx) setEditIdx(editIdx + 1);
        }
      }
    }

    pendingDragIdx.current = null;
    isDragActive.current = false;
    setDragIdx(null);
    setDragOffset(0);
  }

  // --- Completion ---

  function completeTraining() {
    if (!training) return;

    for (const ex of activeExercises) {
      if (ex.weight) {
        saveGymWeight(ex.exerciseId, ex.weight);
      }
    }

    const currentMuscleGroups = new Set<MuscleGroup>();
    for (const ex of activeExercises) {
      if (!ex.done) continue;
      const def = getExerciseById(ex.exerciseId);
      if (def) currentMuscleGroups.add(def.muscleGroup);
    }

    const week = getCalendarWeek();
    saveGymSession({
      id: `gym-${Date.now()}`,
      trainingId: training.sourceId,
      trainingName: training.name,
      completedAt: new Date().toISOString(),
      week,
      muscleGroups: Array.from(currentMuscleGroups),
      activities: activities.filter((a) => a.done).map((a) => a.activity),
      exercises: activeExercises.map((ex) => ({
        exerciseId: ex.exerciseId,
        weight: ex.weight,
        sets: ex.sets,
        reps: ex.reps,
        done: ex.done,
      })),
    });

    if (id === "coach") {
      try { sessionStorage.removeItem("hyrox_coach_session"); } catch {}
    } else if (id.startsWith("custom-")) {
      const customId = id.replace("custom-", "");
      const customs = getGymTrainings();
      const custom = customs.find((t) => t.id === customId);
      if (custom) {
        custom.lastUsed = new Date().toISOString();
        saveGymTraining(custom);
      }
    }

    setShowComplete(true);
  }

  // --- Render ---

  if (!mounted || !training) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  const allDone = activeExercises.length > 0 && activeExercises.every((ex) => ex.done);
  const doneCount = activeExercises.filter((e) => e.done).length;
  const canComplete = doneCount > 0 || activities.some((a) => a.done);
  const alreadySelected = new Set(activeExercises.map((e) => e.exerciseId));

  const filteredExercises = (
    filterGroup === "all"
      ? exerciseLibrary
      : exerciseLibrary.filter((e) => e.muscleGroup === filterGroup)
  ).toSorted((a, b) => a.name.localeCompare(b.name));

  if (showComplete) {
    return (
      <main className="mx-auto flex max-w-lg flex-col items-center px-4 pt-20 pb-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="mb-2 text-2xl font-bold">Training voltooid</h1>
        <p className="mb-6 text-zinc-500 dark:text-zinc-400">
          {training.name} opgeslagen. Gewichten onthouden voor de volgende keer.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/gym")}
            className="rounded-xl bg-amber-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-amber-600"
          >
            Terug naar Gym
          </button>
          <button
            onClick={() => router.push("/")}
            className="rounded-xl border border-zinc-200 px-6 py-3 text-base font-semibold text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
          >
            Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 pt-8 pb-12">
      <div className="mb-6 flex items-center gap-3">
        <button onClick={() => router.push("/gym")} className="rounded-lg p-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold">{training.name}</h1>
          <div className="flex flex-wrap gap-1.5">
            {training.muscleGroups.map((mg) => (
              <span key={mg} className="text-xs text-zinc-500 dark:text-zinc-400">
                {muscleGroupLabels[mg]}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Activiteiten
        </h2>
        <div className="flex flex-col gap-2">
          {activities.map(({ activity, done }, i) => {
            const desc = describeActivity(activity);
            return (
              <div
                key={i}
                className={`flex items-center gap-2 rounded-xl border p-3 transition-all ${
                  done
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
                    : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                }`}
              >
                <button onClick={() => setActivitySheetIdx(i)} className="flex min-w-0 flex-1 items-center gap-2 text-left">
                  <span className="text-lg">{activityEmoji[activity.type as ActivityType]}</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {activityLabels[activity.type as ActivityType] || activity.type}
                  </span>
                  {desc && <span className="truncate text-sm text-zinc-500 dark:text-zinc-400">{desc}</span>}
                </button>
                <button
                  onClick={() => setActivities((prev) => prev.map((a, j) => (j === i ? { ...a, done: !a.done } : a)))}
                  className={`rounded-full p-1 transition-colors ${done ? "text-green-600" : "text-zinc-300 hover:text-zinc-500 dark:text-zinc-600"}`}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </button>
              </div>
            );
          })}
          <button
            onClick={() => setActivitySheetIdx(-1)}
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
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Oefeningen ({activeExercises.length})
        </h2>
        <div
          className="flex flex-col gap-3"
          onTouchMove={handleContainerTouchMove}
          onTouchEnd={handleContainerTouchEnd}
        >
          {activeExercises.map((ex, idx) => {
            const def = getExerciseById(ex.exerciseId);
            const isEditing = editIdx === idx;
            const isDragging = dragIdx === idx;
            return (
              <div
                key={`${ex.exerciseId}-${idx}`}
                ref={(el) => { itemRefs.current[idx] = el; }}
                style={getItemStyle(idx)}
              >
                <SwipeableCard
                  onRemove={() => removeExercise(idx)}
                  isOpen={openSwipeIdx === idx}
                  onOpen={() => setOpenSwipeIdx(idx)}
                  onClose={() => setOpenSwipeIdx(null)}
                >
                  <div
                    className={`rounded-xl border p-4 transition-colors ${
                      isDragging
                        ? "border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30"
                        : ex.done
                          ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
                          : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {/* Drag handle */}
                      <div
                        data-drag-handle
                        onTouchStart={(e) => {
                          e.stopPropagation();
                          handleDragTouchStart(idx, e.touches[0].clientY);
                        }}
                        style={{ touchAction: "none" }}
                        className="mt-1 flex flex-shrink-0 cursor-grab items-center py-1 pr-1 text-zinc-300 active:text-zinc-500 dark:text-zinc-600 dark:active:text-zinc-400"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="4" y1="8" x2="20" y2="8" />
                          <line x1="4" y1="12" x2="20" y2="12" />
                          <line x1="4" y1="16" x2="20" y2="16" />
                        </svg>
                      </div>

                      {/* Checkmark */}
                      <button
                        onClick={() => toggleExerciseDone(idx)}
                        className={`mt-0.5 flex-shrink-0 rounded-full p-1 transition-colors ${
                          ex.done ? "text-green-600" : "text-zinc-300 hover:text-zinc-500 dark:text-zinc-600"
                        }`}
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </button>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <h3 className={`font-semibold ${ex.done ? "text-green-700 dark:text-green-400" : "text-zinc-900 dark:text-zinc-100"}`}>
                          {ex.name}
                        </h3>
                        {def && (
                          <span className="text-xs text-zinc-400 dark:text-zinc-500">
                            {muscleGroupLabels[def.muscleGroup]} &middot; {def.equipment}
                          </span>
                        )}
                      </div>

                      {/* Edit button */}
                      <button
                        onClick={() => setEditIdx(isEditing ? null : idx)}
                        className="flex-shrink-0 rounded-lg p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
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

                    {isEditing && (
                      <div className="mt-3 ml-7 flex flex-col gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <label className="mb-1 block text-xs text-zinc-400">Sets</label>
                            <div className="flex items-center gap-2">
                              <button onClick={() => updateSets(idx, ex.sets - 1)} className="rounded-lg border border-zinc-200 px-2.5 py-1 text-sm dark:border-zinc-700">-</button>
                              <span className="w-8 text-center text-sm font-semibold">{ex.sets}</span>
                              <button onClick={() => updateSets(idx, ex.sets + 1)} className="rounded-lg border border-zinc-200 px-2.5 py-1 text-sm dark:border-zinc-700">+</button>
                            </div>
                          </div>
                          <div className="flex-1">
                            <label className="mb-1 block text-xs text-zinc-400">Reps</label>
                            <input
                              type="text"
                              value={ex.reps}
                              onChange={(e) => updateReps(idx, e.target.value)}
                              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="mb-1 block text-xs text-zinc-400">Gewicht (kg)</label>
                          <input
                            type="text"
                            inputMode="decimal"
                            value={ex.weight}
                            onChange={(e) => updateWeight(idx, e.target.value)}
                            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                            placeholder="bv. 55"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </SwipeableCard>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setShowPicker(true)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-white py-3 text-sm font-medium text-zinc-500 transition-all hover:border-amber-400 hover:text-amber-600 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-amber-600 dark:hover:text-amber-400"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14" /><path d="M5 12h14" />
          </svg>
          Oefening toevoegen
        </button>
      </section>

      <button
        onClick={completeTraining}
        disabled={!canComplete}
        className={`w-full rounded-xl py-4 text-base font-bold transition-all ${
          allDone
            ? "bg-green-500 text-white hover:bg-green-600 active:scale-[0.98]"
            : canComplete
              ? "bg-amber-500 text-white hover:bg-amber-600 active:scale-[0.98]"
              : "bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600"
        }`}
      >
        {allDone
          ? "Training voltooien"
          : canComplete
            ? `Voltooien (${doneCount}/${activeExercises.length} oefeningen)`
            : `${doneCount}/${activeExercises.length} klaar`}
      </button>

      {activitySheetIdx !== null && (
        <ActivitySheet
          initial={activitySheetIdx >= 0 ? activities[activitySheetIdx].activity : undefined}
          onClose={() => setActivitySheetIdx(null)}
          onDelete={
            activitySheetIdx >= 0
              ? () => {
                  setActivities((prev) => prev.filter((_, i) => i !== activitySheetIdx));
                  setActivitySheetIdx(null);
                }
              : undefined
          }
          onSave={(activity) => {
            setActivities((prev) =>
              activitySheetIdx >= 0
                ? prev.map((a, i) => (i === activitySheetIdx ? { activity, done: true } : a))
                : [...prev, { activity, done: true }]
            );
            setActivitySheetIdx(null);
          }}
        />
      )}

      {showPicker && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-zinc-950">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <h2 className="text-lg font-bold">Kies oefening</h2>
            <button onClick={() => setShowPicker(false)} className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto border-b border-zinc-100 px-4 py-2 dark:border-zinc-800">
            <button
              onClick={() => setFilterGroup("all")}
              className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                filterGroup === "all"
                  ? "bg-amber-500 text-white"
                  : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              Alles
            </button>
            {allMuscleGroups.map((mg) => (
              <button
                key={mg}
                onClick={() => setFilterGroup(mg)}
                className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  filterGroup === mg
                    ? "bg-amber-500 text-white"
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                }`}
              >
                {muscleGroupLabels[mg]}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-2">
            {filteredExercises.map((exercise) => {
              const isSelected = alreadySelected.has(exercise.id);
              return (
                <button
                  key={exercise.id}
                  onClick={() => !isSelected && addExercise(exercise)}
                  disabled={isSelected}
                  className={`flex w-full items-center gap-3 border-b border-zinc-50 px-2 py-3 text-left transition-colors dark:border-zinc-900 ${
                    isSelected
                      ? "opacity-40"
                      : "hover:bg-zinc-50 active:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{exercise.name}</p>
                    <p className="text-xs text-zinc-400">
                      {muscleGroupLabels[exercise.muscleGroup]} &middot; {exercise.equipment}
                      {exercise.ynzoWeight && <> &middot; ~{exercise.ynzoWeight} kg</>}
                    </p>
                  </div>
                  {isSelected ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-500">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-300 dark:text-zinc-600">
                      <path d="M12 5v14" /><path d="M5 12h14" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
