import { generateTrainingPlan } from "./data";
import { getCompletedWorkouts, getGymSessions, getSwappedWorkouts, getWorkoutOverride } from "./storage";
import type { MuscleGroup } from "./gym-data";

export interface StrengthEntry {
  id: string;
  trainingName: string;
  completedAt: string;
  muscleGroups: MuscleGroup[];
  exercises: { exerciseId: string; done: boolean }[];
  exerciseCount: number;
  href: string;
}

// Oefeningen uit het schema zijn vrije tekst, dus spiergroepen worden afgeleid uit de naam
const groupPatterns: [MuscleGroup, RegExp][] = [
  ["legs", /squat|lunge|leg press|leg curl|hamstring|calf|lateral walk|deadlift|hip thrust|step-up|thruster|wall ball|sled push|burpee|sandbag|prowler/i],
  ["back", /\brows?\b|pulldown|pull-down|face pull|sled pull|deadlift/i],
  ["chest", /push-up|chest|bench/i],
  ["shoulders", /shoulder|dumbbell press|landmine|thruster|face pull|goblet squat \+ press/i],
  ["core", /plank|dead bug|pallof|slam|carry|farmers|kettlebell swing/i],
  ["biceps", /(?<!leg |hamstring )curl/i],
];

export function plannedExerciseGroups(name: string): MuscleGroup[] {
  return groupPatterns.filter(([, re]) => re.test(name)).map(([g]) => g);
}

export function getStrengthHistory(): StrengthEntry[] {
  const gym: StrengthEntry[] = getGymSessions().map((s) => ({
    id: s.id,
    trainingName: s.trainingName,
    completedAt: s.completedAt,
    muscleGroups: s.muscleGroups as MuscleGroup[],
    exercises: s.exercises,
    exerciseCount: s.exercises.length,
    href: `/gym/session/${s.id}`,
  }));

  const plan = new Map(generateTrainingPlan().map((w) => [w.id, w]));
  const swapped = new Set(getSwappedWorkouts().map((s) => s.workoutId));
  const planned: StrengthEntry[] = [];
  for (const c of getCompletedWorkouts()) {
    const w = plan.get(c.workoutId);
    if (!w || swapped.has(w.id) || (w.type !== "strength" && w.type !== "hyrox")) continue;
    const exercises = getWorkoutOverride(w.id) ?? w.exercises;
    const groups = new Set<MuscleGroup>();
    let count = 0;
    for (const ex of exercises) {
      const g = plannedExerciseGroups(ex.name);
      if (g.length > 0) count++;
      g.forEach((x) => groups.add(x));
    }
    if (groups.size === 0) continue;
    planned.push({
      id: w.id,
      trainingName: w.title,
      completedAt: c.completedAt,
      muscleGroups: Array.from(groups),
      exercises: [],
      exerciseCount: count,
      href: `/workout/${w.id}`,
    });
  }

  return [...gym, ...planned].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );
}

export function getRecentStrength(count: number): StrengthEntry[] {
  return getStrengthHistory().slice(0, count);
}

export function getLastStrengthDate(): Date | null {
  const dates = getStrengthHistory().map((s) => new Date(s.completedAt));
  for (const sw of getSwappedWorkouts()) {
    if (sw.type === "strength") dates.push(new Date(sw.completedAt));
  }
  if (dates.length === 0) return null;
  return new Date(Math.max(...dates.map((d) => d.getTime())));
}
