export interface CompletedWorkout {
  workoutId: string;
  completedAt: string;
  duration?: number;
  notes?: string;
  stationTimes?: Record<string, number>;
}

export interface UserProfile {
  name: string;
  raceDate?: string;
  category: "open" | "pro" | "doubles";
  startWeek: number;
}

export interface SwappedWorkout {
  workoutId: string;
  type: "run" | "strength" | "hyrox" | "other";
  description: string;
  distance?: string;
  time?: string;
  completedAt: string;
}

const STORAGE_KEYS = {
  completedWorkouts: "hyrox_completed",
  profile: "hyrox_profile",
  currentWeek: "hyrox_current_week",
  exerciseWeights: "hyrox_weights",
  exerciseProgress: "hyrox_exercise_progress",
  chosenAlternatives: "hyrox_chosen_alts",
  swappedWorkouts: "hyrox_swapped",
} as const;

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable
  }
}

export function getCompletedWorkouts(): CompletedWorkout[] {
  return safeGet<CompletedWorkout[]>(STORAGE_KEYS.completedWorkouts, []);
}

export function markWorkoutComplete(workout: CompletedWorkout): void {
  const completed = getCompletedWorkouts();
  const existing = completed.findIndex((w) => w.workoutId === workout.workoutId);
  if (existing >= 0) {
    completed[existing] = workout;
  } else {
    completed.push(workout);
  }
  safeSet(STORAGE_KEYS.completedWorkouts, completed);
}

export function isWorkoutCompleted(workoutId: string): boolean {
  return getCompletedWorkouts().some((w) => w.workoutId === workoutId);
}

export function getProfile(): UserProfile | null {
  return safeGet<UserProfile | null>(STORAGE_KEYS.profile, null);
}

export function saveProfile(profile: UserProfile): void {
  safeSet(STORAGE_KEYS.profile, profile);
}

export function getCurrentWeek(): number {
  return safeGet<number>(STORAGE_KEYS.currentWeek, 1);
}

export function setCurrentWeek(week: number): void {
  safeSet(STORAGE_KEYS.currentWeek, week);
}

export function getExerciseWeight(exerciseName: string): string | null {
  const weights = safeGet<Record<string, string>>(STORAGE_KEYS.exerciseWeights, {});
  return weights[exerciseName] ?? null;
}

export function saveExerciseWeight(exerciseName: string, weight: string): void {
  const weights = safeGet<Record<string, string>>(STORAGE_KEYS.exerciseWeights, {});
  weights[exerciseName] = weight;
  safeSet(STORAGE_KEYS.exerciseWeights, weights);
}

export function getExerciseProgress(workoutId: string): number[] {
  const all = safeGet<Record<string, number[]>>(STORAGE_KEYS.exerciseProgress, {});
  return all[workoutId] ?? [];
}

export function saveExerciseProgress(workoutId: string, progress: number[]): void {
  const all = safeGet<Record<string, number[]>>(STORAGE_KEYS.exerciseProgress, {});
  all[workoutId] = progress;
  safeSet(STORAGE_KEYS.exerciseProgress, all);
}

export function getChosenAlternative(workoutId: string, exerciseName: string): string | null {
  const all = safeGet<Record<string, Record<string, string>>>(STORAGE_KEYS.chosenAlternatives, {});
  return all[workoutId]?.[exerciseName] ?? null;
}

export function saveChosenAlternative(workoutId: string, exerciseName: string, altName: string | null): void {
  const all = safeGet<Record<string, Record<string, string>>>(STORAGE_KEYS.chosenAlternatives, {});
  if (!all[workoutId]) all[workoutId] = {};
  if (altName) {
    all[workoutId][exerciseName] = altName;
  } else {
    delete all[workoutId][exerciseName];
  }
  safeSet(STORAGE_KEYS.chosenAlternatives, all);
}

export function getSwappedWorkouts(): SwappedWorkout[] {
  return safeGet<SwappedWorkout[]>(STORAGE_KEYS.swappedWorkouts, []);
}

export function getSwappedWorkout(workoutId: string): SwappedWorkout | null {
  return getSwappedWorkouts().find((s) => s.workoutId === workoutId) ?? null;
}

export function saveSwappedWorkout(swap: SwappedWorkout): void {
  const swaps = getSwappedWorkouts();
  const existing = swaps.findIndex((s) => s.workoutId === swap.workoutId);
  if (existing >= 0) {
    swaps[existing] = swap;
  } else {
    swaps.push(swap);
  }
  safeSet(STORAGE_KEYS.swappedWorkouts, swaps);
}
