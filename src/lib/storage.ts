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
  gymTrainingId?: string;
  completedAt: string;
}

export interface CustomWorkout {
  id: string;
  week: number;
  type: "run" | "strength" | "hyrox" | "other";
  description: string;
  distance?: string;
  time?: string;
  gymTrainingId?: string;
  completedAt: string;
}

export interface SavedGymTraining {
  id: string;
  name: string;
  exercises: { exerciseId: string; sets: number; reps: string }[];
  warmupKey: string;
  warmupActivities?: { type: string; time?: string; distance?: string }[];
  createdAt: string;
  lastUsed?: string;
}

export interface CompletedGymSession {
  id: string;
  trainingId: string;
  trainingName: string;
  completedAt: string;
  week?: number;
  muscleGroups: string[];
  exercises: {
    exerciseId: string;
    weight: string;
    sets: number;
    reps: string;
    done: boolean;
  }[];
}

const STORAGE_KEYS = {
  completedWorkouts: "hyrox_completed",
  profile: "hyrox_profile",
  currentWeek: "hyrox_current_week",
  exerciseWeights: "hyrox_weights",
  exerciseProgress: "hyrox_exercise_progress",
  chosenAlternatives: "hyrox_chosen_alts",
  swappedWorkouts: "hyrox_swapped",
  customWorkouts: "hyrox_custom",
  gymTrainings: "hyrox_gym_trainings",
  gymSessions: "hyrox_gym_sessions",
  gymWeightHistory: "hyrox_gym_weight_history",
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

export function removeCompletedWorkout(workoutId: string): void {
  const completed = getCompletedWorkouts().filter((w) => w.workoutId !== workoutId);
  safeSet(STORAGE_KEYS.completedWorkouts, completed);
}

export function removeExerciseProgress(workoutId: string): void {
  const all = safeGet<Record<string, number[]>>(STORAGE_KEYS.exerciseProgress, {});
  delete all[workoutId];
  safeSet(STORAGE_KEYS.exerciseProgress, all);
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

export function getCalendarWeek(): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const start = new Date(2026, 8, 21);
  start.setHours(0, 0, 0, 0);
  const diff = now.getTime() - start.getTime();
  if (diff < 0) return 1;
  const week = Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1;
  return Math.min(Math.max(week, 1), 18);
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

export function removeSwappedWorkout(workoutId: string): void {
  const swaps = getSwappedWorkouts().filter((s) => s.workoutId !== workoutId);
  safeSet(STORAGE_KEYS.swappedWorkouts, swaps);
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

export function getCustomWorkouts(): CustomWorkout[] {
  return safeGet<CustomWorkout[]>(STORAGE_KEYS.customWorkouts, []);
}

export function getCustomWorkoutsForWeek(week: number): CustomWorkout[] {
  return getCustomWorkouts().filter((w) => w.week === week);
}

export function saveCustomWorkout(workout: CustomWorkout): void {
  const all = getCustomWorkouts();
  const existing = all.findIndex((w) => w.id === workout.id);
  if (existing >= 0) {
    all[existing] = workout;
  } else {
    all.push(workout);
  }
  safeSet(STORAGE_KEYS.customWorkouts, all);
}

export function deleteCustomWorkout(id: string): void {
  const all = getCustomWorkouts().filter((w) => w.id !== id);
  safeSet(STORAGE_KEYS.customWorkouts, all);
}

// --- Gym training storage ---

export function getGymTrainings(): SavedGymTraining[] {
  return safeGet<SavedGymTraining[]>(STORAGE_KEYS.gymTrainings, []);
}

export function saveGymTraining(training: SavedGymTraining): void {
  const all = getGymTrainings();
  const idx = all.findIndex((t) => t.id === training.id);
  if (idx >= 0) {
    all[idx] = training;
  } else {
    all.push(training);
  }
  safeSet(STORAGE_KEYS.gymTrainings, all);
}

export function deleteGymTraining(id: string): void {
  const all = getGymTrainings().filter((t) => t.id !== id);
  safeSet(STORAGE_KEYS.gymTrainings, all);
}

export function getGymSessions(): CompletedGymSession[] {
  return safeGet<CompletedGymSession[]>(STORAGE_KEYS.gymSessions, []);
}

export function getRecentGymSessions(count: number): CompletedGymSession[] {
  return getGymSessions()
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    .slice(0, count);
}

export function saveGymSession(session: CompletedGymSession): void {
  const all = getGymSessions();
  all.push(session);
  safeSet(STORAGE_KEYS.gymSessions, all);
}

export function getLastStrengthDate(): Date | null {
  const dates: Date[] = [];

  for (const s of getGymSessions()) {
    dates.push(new Date(s.completedAt));
  }
  for (const sw of getSwappedWorkouts()) {
    if (sw.type === "strength") dates.push(new Date(sw.completedAt));
  }
  for (const cw of getCustomWorkouts()) {
    if (cw.type === "strength") dates.push(new Date(cw.completedAt));
  }

  if (dates.length === 0) return null;
  dates.sort((a, b) => b.getTime() - a.getTime());
  return dates[0];
}

export function getGymWeightForExercise(exerciseId: string): string | null {
  const all = safeGet<Record<string, string>>(STORAGE_KEYS.gymWeightHistory, {});
  return all[exerciseId] ?? null;
}

export function saveGymWeight(exerciseId: string, weight: string): void {
  const all = safeGet<Record<string, string>>(STORAGE_KEYS.gymWeightHistory, {});
  all[exerciseId] = weight;
  safeSet(STORAGE_KEYS.gymWeightHistory, all);
}

export function exportAllData(): string {
  if (typeof window === "undefined") return "{}";
  const data: Record<string, unknown> = {};
  for (const key of Object.values(STORAGE_KEYS)) {
    try {
      const item = localStorage.getItem(key);
      if (item) data[key] = JSON.parse(item);
    } catch {}
  }
  return JSON.stringify(data, null, 2);
}

export function importAllData(json: string): { success: boolean; error?: string } {
  try {
    const data = JSON.parse(json) as Record<string, unknown>;
    const validKeys = new Set<string>(Object.values(STORAGE_KEYS));
    let count = 0;
    for (const [key, value] of Object.entries(data)) {
      if (validKeys.has(key)) {
        if (typeof window !== "undefined") {
          try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
        }
        count++;
      }
    }
    return { success: true };
  } catch {
    return { success: false, error: "Ongeldig bestand" };
  }
}
