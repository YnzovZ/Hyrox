export type MuscleGroup = "chest" | "back" | "shoulders" | "biceps" | "triceps" | "legs" | "core";

export const muscleGroupLabels: Record<MuscleGroup, string> = {
  chest: "Borst",
  back: "Rug",
  shoulders: "Schouders",
  biceps: "Biceps",
  triceps: "Triceps",
  legs: "Benen",
  core: "Core",
};

export interface GymExercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  equipment: "machine" | "dumbbell" | "barbell" | "cable" | "bodyweight";
  defaultSets: number;
  defaultReps: string;
  ynzoWeight?: string;
  veerWeight?: string;
}

export const exerciseLibrary: GymExercise[] = [
  // CHEST
  { id: "chest-press", name: "Chest Press", muscleGroup: "chest", equipment: "machine", defaultSets: 3, defaultReps: "10", ynzoWeight: "55", veerWeight: undefined },
  { id: "incline-db-press", name: "Incline Dumbbell Press", muscleGroup: "chest", equipment: "dumbbell", defaultSets: 3, defaultReps: "10", ynzoWeight: "18", veerWeight: "16" },
  { id: "flat-db-press", name: "Flat Dumbbell Press", muscleGroup: "chest", equipment: "dumbbell", defaultSets: 3, defaultReps: "10", ynzoWeight: "20", veerWeight: "20" },
  { id: "pec-deck-fly", name: "Pec Deck Fly", muscleGroup: "chest", equipment: "machine", defaultSets: 3, defaultReps: "12", ynzoWeight: "47.5", veerWeight: "45" },
  { id: "high-low-cable-fly", name: "High To Low Cable Fly", muscleGroup: "chest", equipment: "cable", defaultSets: 3, defaultReps: "12", ynzoWeight: "10", veerWeight: "10" },
  { id: "low-high-cable-fly", name: "Low To High Cable Fly", muscleGroup: "chest", equipment: "cable", defaultSets: 3, defaultReps: "12", ynzoWeight: "10", veerWeight: "10" },
  { id: "incline-smith-press", name: "Incline Smith Machine Press", muscleGroup: "chest", equipment: "machine", defaultSets: 3, defaultReps: "10", ynzoWeight: "30", veerWeight: undefined },

  // BACK
  { id: "lat-pulldown", name: "Lat Pull Down", muscleGroup: "back", equipment: "machine", defaultSets: 3, defaultReps: "10", ynzoWeight: "55", veerWeight: "50" },
  { id: "vertical-traction", name: "Vertical Traction", muscleGroup: "back", equipment: "machine", defaultSets: 3, defaultReps: "10", ynzoWeight: "70", veerWeight: undefined },
  { id: "low-row", name: "Low Row", muscleGroup: "back", equipment: "machine", defaultSets: 3, defaultReps: "10", ynzoWeight: "65", veerWeight: "45" },
  { id: "cable-seated-row", name: "Cable Seated Row", muscleGroup: "back", equipment: "cable", defaultSets: 3, defaultReps: "12", ynzoWeight: "50", veerWeight: "40" },
  { id: "high-cable-row", name: "High Cable Row Lat Focused", muscleGroup: "back", equipment: "cable", defaultSets: 3, defaultReps: "12", ynzoWeight: "50", veerWeight: undefined },
  { id: "barbell-row", name: "Barbell Row", muscleGroup: "back", equipment: "barbell", defaultSets: 3, defaultReps: "10", ynzoWeight: "40", veerWeight: "40" },
  { id: "cable-lat-pullover", name: "Cable Lat Pullover", muscleGroup: "back", equipment: "cable", defaultSets: 3, defaultReps: "12", ynzoWeight: "25", veerWeight: "15" },
  { id: "upper-back-row-mc", name: "Upper Back Row Machine", muscleGroup: "back", equipment: "machine", defaultSets: 3, defaultReps: "12", ynzoWeight: "45", veerWeight: "37.5" },

  // SHOULDERS
  { id: "shoulder-press-mc", name: "Shoulder Press Machine", muscleGroup: "shoulders", equipment: "machine", defaultSets: 3, defaultReps: "10", ynzoWeight: "30", veerWeight: undefined },
  { id: "db-shoulder-press", name: "Dumbbell Shoulder Press", muscleGroup: "shoulders", equipment: "dumbbell", defaultSets: 3, defaultReps: "10", ynzoWeight: "16", veerWeight: "14" },
  { id: "lateral-raise-db", name: "Dumbbell Lateral Raise", muscleGroup: "shoulders", equipment: "dumbbell", defaultSets: 3, defaultReps: "12", ynzoWeight: "8", veerWeight: "2.5" },
  { id: "lateral-raise-cable", name: "Cable Lateral Raise", muscleGroup: "shoulders", equipment: "cable", defaultSets: 3, defaultReps: "12", ynzoWeight: undefined, veerWeight: "3.75" },
  { id: "rear-delt-fly-cable", name: "Rear Delt Fly Cable", muscleGroup: "shoulders", equipment: "cable", defaultSets: 3, defaultReps: "12", ynzoWeight: "7.5", veerWeight: "10" },
  { id: "rear-delt-row-mc", name: "Rear Delt Row Machine", muscleGroup: "shoulders", equipment: "machine", defaultSets: 3, defaultReps: "12", ynzoWeight: "40", veerWeight: "37.5" },
  { id: "face-pulls", name: "Face Pulls", muscleGroup: "shoulders", equipment: "cable", defaultSets: 3, defaultReps: "15", ynzoWeight: undefined, veerWeight: "17.5" },
  { id: "cable-y-raise", name: "Cable Y-Raise", muscleGroup: "shoulders", equipment: "cable", defaultSets: 3, defaultReps: "12", ynzoWeight: undefined, veerWeight: "2.5" },

  // BICEPS
  { id: "arm-curl-mc", name: "Arm Curl Machine", muscleGroup: "biceps", equipment: "machine", defaultSets: 3, defaultReps: "10", ynzoWeight: "30", veerWeight: "15" },
  { id: "dumbbell-curl", name: "Dumbbell Curl", muscleGroup: "biceps", equipment: "dumbbell", defaultSets: 3, defaultReps: "10", ynzoWeight: undefined, veerWeight: undefined },
  { id: "hammer-curl-db", name: "Hammer Curl Dumbbell", muscleGroup: "biceps", equipment: "dumbbell", defaultSets: 3, defaultReps: "10", ynzoWeight: "12", veerWeight: "8" },
  { id: "hammer-curl-cable", name: "Hammer Curl Cable", muscleGroup: "biceps", equipment: "cable", defaultSets: 3, defaultReps: "10", ynzoWeight: "20", veerWeight: undefined },
  { id: "incline-db-curl", name: "Incline Dumbbell Curl", muscleGroup: "biceps", equipment: "dumbbell", defaultSets: 3, defaultReps: "10", ynzoWeight: undefined, veerWeight: "9" },
  { id: "preacher-curl", name: "Preacher Curl", muscleGroup: "biceps", equipment: "machine", defaultSets: 3, defaultReps: "10", ynzoWeight: undefined, veerWeight: undefined },

  // TRICEPS
  { id: "arm-extension-mc", name: "Arm Extension Machine", muscleGroup: "triceps", equipment: "machine", defaultSets: 3, defaultReps: "10", ynzoWeight: "40", veerWeight: undefined },
  { id: "tricep-rope-ext", name: "Tricep Rope Extension", muscleGroup: "triceps", equipment: "cable", defaultSets: 3, defaultReps: "12", ynzoWeight: "17.5", veerWeight: undefined },
  { id: "overhead-tricep-ext", name: "Overhead Tricep Extension", muscleGroup: "triceps", equipment: "cable", defaultSets: 3, defaultReps: "12", ynzoWeight: "17.5", veerWeight: undefined },
  { id: "cable-tricep-ext", name: "Cable Tricep Extension", muscleGroup: "triceps", equipment: "cable", defaultSets: 3, defaultReps: "12", ynzoWeight: undefined, veerWeight: undefined },
  { id: "bar-pushdown", name: "Bar Pushdown", muscleGroup: "triceps", equipment: "cable", defaultSets: 3, defaultReps: "12", ynzoWeight: undefined, veerWeight: "20" },
  { id: "single-arm-pulldown", name: "Single Arm Pulldown", muscleGroup: "triceps", equipment: "cable", defaultSets: 3, defaultReps: "12", ynzoWeight: undefined, veerWeight: "10" },

  // LEGS
  { id: "leg-press", name: "Leg Press", muscleGroup: "legs", equipment: "machine", defaultSets: 3, defaultReps: "10", ynzoWeight: "140", veerWeight: "120" },
  { id: "leg-extension", name: "Leg Extension", muscleGroup: "legs", equipment: "machine", defaultSets: 3, defaultReps: "12", ynzoWeight: "55", veerWeight: "45" },
  { id: "leg-curl", name: "Seated Leg Curl", muscleGroup: "legs", equipment: "machine", defaultSets: 3, defaultReps: "12", ynzoWeight: "40", veerWeight: "22.5" },
  { id: "squat-machine", name: "Squat Machine", muscleGroup: "legs", equipment: "machine", defaultSets: 3, defaultReps: "10", ynzoWeight: "55", veerWeight: undefined },
  { id: "romanian-deadlift", name: "Romanian Deadlift", muscleGroup: "legs", equipment: "dumbbell", defaultSets: 3, defaultReps: "10", ynzoWeight: "24", veerWeight: "40" },
  { id: "adductor-machine", name: "Adductor Machine", muscleGroup: "legs", equipment: "machine", defaultSets: 3, defaultReps: "12", ynzoWeight: "50", veerWeight: undefined },
  { id: "calf-raise-mc", name: "Calf Raise Machine", muscleGroup: "legs", equipment: "machine", defaultSets: 3, defaultReps: "15", ynzoWeight: "65", veerWeight: "35" },
  { id: "hip-thrust", name: "Hip Thrust", muscleGroup: "legs", equipment: "barbell", defaultSets: 3, defaultReps: "12", ynzoWeight: undefined, veerWeight: "55" },
  { id: "smith-squat", name: "Smith Machine Squat", muscleGroup: "legs", equipment: "machine", defaultSets: 3, defaultReps: "10", ynzoWeight: undefined, veerWeight: "40" },
  { id: "hack-squat", name: "Hack Squat", muscleGroup: "legs", equipment: "machine", defaultSets: 3, defaultReps: "10", ynzoWeight: undefined, veerWeight: undefined },

  // CORE
  { id: "ab-crunch-mc", name: "Abdominal Crunch Machine", muscleGroup: "core", equipment: "machine", defaultSets: 3, defaultReps: "15", ynzoWeight: "55", veerWeight: undefined },
  { id: "lower-back-mc", name: "Lower Back Machine", muscleGroup: "core", equipment: "machine", defaultSets: 3, defaultReps: "12", ynzoWeight: "50", veerWeight: undefined },
  { id: "pectoral-element", name: "Pectoral Element", muscleGroup: "chest", equipment: "machine", defaultSets: 3, defaultReps: "12", ynzoWeight: "40", veerWeight: undefined },
];

export function getExerciseById(id: string): GymExercise | undefined {
  return exerciseLibrary.find((e) => e.id === id);
}

export function getExercisesByMuscleGroup(group: MuscleGroup): GymExercise[] {
  return exerciseLibrary.filter((e) => e.muscleGroup === group);
}

export interface WarmupInterval {
  label: string;
  minutes: number;
}

export interface WarmupConfig {
  type: "fiets" | "loopband" | "roeier" | "geen";
  intervals: WarmupInterval[];
}

export type WarmupActivityType = "fiets" | "loopband" | "roeier";

export interface WarmupActivity {
  type: WarmupActivityType;
  time?: string;
  distance?: string;
}

export const warmupTypeLabels: Record<WarmupActivityType, string> = {
  fiets: "Fietsen",
  loopband: "Loopband",
  roeier: "Roeien",
};

export const warmupTypeEmoji: Record<WarmupActivityType, string> = {
  fiets: "\u{1F6B2}",
  loopband: "\u{1F3C3}",
  roeier: "\u{1F6A3}",
};

export const defaultWarmups: Record<string, WarmupConfig> = {
  bike5: {
    type: "fiets",
    intervals: [{ label: "Rustig fietsen", minutes: 5 }],
  },
  bikeInterval: {
    type: "fiets",
    intervals: [
      { label: "Warmup", minutes: 5 },
      { label: "Snel", minutes: 4 },
      { label: "Rustig", minutes: 2 },
      { label: "Snel", minutes: 4 },
      { label: "Rustig", minutes: 2 },
      { label: "Snel", minutes: 4 },
      { label: "Rustig", minutes: 2 },
    ],
  },
  treadmill5: {
    type: "loopband",
    intervals: [{ label: "Rustig lopen", minutes: 5 }],
  },
  rowing5: {
    type: "roeier",
    intervals: [{ label: "Rustig roeien", minutes: 5 }],
  },
  none: {
    type: "geen",
    intervals: [],
  },
};

export interface GymTrainingExercise {
  exerciseId: string;
  sets: number;
  reps: string;
}

export interface GymTrainingTemplate {
  id: string;
  name: string;
  description: string;
  muscleGroups: MuscleGroup[];
  exercises: GymTrainingExercise[];
  warmupKey: string;
}

export const presetTrainings: GymTrainingTemplate[] = [
  {
    id: "preset-push-power",
    name: "Push Power",
    description: "Borst, schouders en triceps",
    muscleGroups: ["chest", "shoulders", "triceps"],
    warmupKey: "bike5",
    exercises: [
      { exerciseId: "chest-press", sets: 3, reps: "10" },
      { exerciseId: "incline-db-press", sets: 3, reps: "10" },
      { exerciseId: "shoulder-press-mc", sets: 3, reps: "10" },
      { exerciseId: "high-low-cable-fly", sets: 3, reps: "12" },
      { exerciseId: "tricep-rope-ext", sets: 3, reps: "12" },
    ],
  },
  {
    id: "preset-pull-power",
    name: "Pull Power",
    description: "Rug en biceps",
    muscleGroups: ["back", "biceps"],
    warmupKey: "bike5",
    exercises: [
      { exerciseId: "lat-pulldown", sets: 3, reps: "10" },
      { exerciseId: "low-row", sets: 3, reps: "10" },
      { exerciseId: "barbell-row", sets: 3, reps: "10" },
      { exerciseId: "rear-delt-fly-cable", sets: 3, reps: "12" },
      { exerciseId: "arm-curl-mc", sets: 3, reps: "10" },
    ],
  },
  {
    id: "preset-upper-mix",
    name: "Upper Body Mix",
    description: "Complete bovenlichaam sessie",
    muscleGroups: ["chest", "back", "shoulders"],
    warmupKey: "bike5",
    exercises: [
      { exerciseId: "incline-db-press", sets: 3, reps: "10" },
      { exerciseId: "cable-seated-row", sets: 3, reps: "12" },
      { exerciseId: "db-shoulder-press", sets: 3, reps: "10" },
      { exerciseId: "pec-deck-fly", sets: 3, reps: "12" },
      { exerciseId: "hammer-curl-db", sets: 3, reps: "10" },
    ],
  },
  {
    id: "preset-push-legs",
    name: "Push + Benen",
    description: "Push training met beenwerk erbij",
    muscleGroups: ["chest", "shoulders", "legs"],
    warmupKey: "bikeInterval",
    exercises: [
      { exerciseId: "chest-press", sets: 3, reps: "10" },
      { exerciseId: "db-shoulder-press", sets: 3, reps: "10" },
      { exerciseId: "high-low-cable-fly", sets: 3, reps: "12" },
      { exerciseId: "leg-press", sets: 3, reps: "10" },
      { exerciseId: "leg-extension", sets: 3, reps: "12" },
    ],
  },
  {
    id: "preset-pull-legs",
    name: "Pull + Benen",
    description: "Rug training met beenwerk erbij",
    muscleGroups: ["back", "biceps", "legs"],
    warmupKey: "bikeInterval",
    exercises: [
      { exerciseId: "vertical-traction", sets: 3, reps: "10" },
      { exerciseId: "low-row", sets: 3, reps: "10" },
      { exerciseId: "rear-delt-row-mc", sets: 3, reps: "12" },
      { exerciseId: "leg-curl", sets: 3, reps: "12" },
      { exerciseId: "leg-press", sets: 3, reps: "10" },
    ],
  },
  {
    id: "preset-full-body",
    name: "Full Body",
    description: "Alles een beetje",
    muscleGroups: ["chest", "back", "shoulders", "legs", "core"],
    warmupKey: "bikeInterval",
    exercises: [
      { exerciseId: "chest-press", sets: 3, reps: "10" },
      { exerciseId: "low-row", sets: 3, reps: "10" },
      { exerciseId: "shoulder-press-mc", sets: 3, reps: "10" },
      { exerciseId: "leg-press", sets: 3, reps: "10" },
      { exerciseId: "ab-crunch-mc", sets: 3, reps: "15" },
    ],
  },
];

export function getCoachTip(
  sessions: { completedAt: string; muscleGroups: string[] }[],
  daysSinceStrength?: number,
): string {
  const days = daysSinceStrength;

  if (days == null) {
    return "Eerste krachttraining in de app? Begin rustig, focus op techniek, en bouw op.";
  }

  const lastGroups = sessions.length > 0
    ? sessions[0].muscleGroups.map((g) => muscleGroupLabels[g as MuscleGroup] || g)
    : [];
  const lastGroupStr = lastGroups.slice(0, 2).join(" en ");

  const now = new Date();
  const thisWeekSessions = sessions.filter((s) => {
    const diff = Math.floor((now.getTime() - new Date(s.completedAt).getTime()) / (1000 * 60 * 60 * 24));
    return diff < 7;
  }).length;

  if (days === 0) {
    if (lastGroupStr) {
      return `Vandaag al ${lastGroupStr} gedaan. Rust is ook training. Morgen weer.`;
    }
    return "Vandaag al getraind. Rust is ook training. Morgen weer.";
  }

  if (days === 1) {
    if (thisWeekSessions >= 3) {
      return `${thisWeekSessions} sessies deze week, sterke discipline. Pak vandaag een andere spiergroep${lastGroupStr ? ` dan ${lastGroupStr}` : ""}.`;
    }
    return `Gisteren getraind${lastGroupStr ? ` (${lastGroupStr})` : ""}. Goed ritme, pak vandaag iets anders.`;
  }

  if (days === 2) {
    return `Twee dagen rust${lastGroupStr ? ` na ${lastGroupStr}` : ""}. Perfect hersteld, klaar voor de volgende.`;
  }

  if (days <= 4) {
    return `${days} dagen geleden getraind. Goed moment om weer te gaan.`;
  }

  if (days <= 7) {
    return "Je laatste training was lang genoeg geleden om alles weer te trainen. Full body is een goede keuze.";
  }

  if (days <= 14) {
    return "Meer dan een week geleden. Pak een full body, dan train je alles weer even aan.";
  }

  return "Even niet in de gym geweest. Begin met full body, dan is alles weer wakker. Ga gewoon.";
}

export function suggestNextTraining(
  recentSessions: { trainingId: string; muscleGroups: string[] }[],
  daysSinceLastSession?: number,
): GymTrainingTemplate {
  const fullBody = presetTrainings.find((t) => t.id === "preset-full-body")!;

  if (recentSessions.length === 0 || (daysSinceLastSession != null && daysSinceLastSession >= 5)) {
    return fullBody;
  }

  const groupCounts: Record<MuscleGroup, number> = {
    chest: 0, back: 0, shoulders: 0, biceps: 0, triceps: 0, legs: 0, core: 0,
  };
  for (const s of recentSessions) {
    for (const g of s.muscleGroups) {
      if (g in groupCounts) groupCounts[g as MuscleGroup]++;
    }
  }

  const recentIds = new Set(recentSessions.slice(0, 2).map((s) => s.trainingId));

  let bestTraining = presetTrainings[0];
  let bestScore = -Infinity;

  for (const training of presetTrainings) {
    let score = 0;
    for (const mg of training.muscleGroups) {
      score += 3 - groupCounts[mg];
    }
    score = score / training.muscleGroups.length;

    if (recentIds.has(training.id)) {
      score -= 10;
    }

    if (score > bestScore) {
      bestScore = score;
      bestTraining = training;
    }
  }

  return bestTraining;
}

// --- Coach / Personal Trainer ---

export interface CoachFocusOption {
  id: string;
  label: string;
  description: string;
  groups: MuscleGroup[];
}

export const coachFocusOptions: CoachFocusOption[] = [
  { id: "full-body", label: "Full body", description: "Alles een beetje", groups: ["chest", "back", "shoulders", "legs", "core"] },
  { id: "push", label: "Push", description: "Borst, schouders, triceps", groups: ["chest", "shoulders", "triceps"] },
  { id: "pull", label: "Pull", description: "Rug, biceps", groups: ["back", "biceps"] },
  { id: "upper", label: "Bovenlichaam", description: "Borst, rug, schouders", groups: ["chest", "back", "shoulders"] },
  { id: "legs", label: "Benen", description: "Benen en core", groups: ["legs", "core"] },
  { id: "chest", label: "Borst", description: "Focus op borst", groups: ["chest"] },
  { id: "back", label: "Rug", description: "Focus op rug", groups: ["back"] },
  { id: "shoulders", label: "Schouders", description: "Focus op schouders", groups: ["shoulders"] },
];

export interface CoachSession {
  name: string;
  muscleGroups: MuscleGroup[];
  exercises: GymTrainingExercise[];
  warmupActivities: WarmupActivity[];
}

export function generateCoachExercises(
  focusGroups: MuscleGroup[],
  recentExerciseIds: Set<string>,
): GymTrainingExercise[] {
  const targetTotal = 6;
  const perGroup = new Map<MuscleGroup, number>();

  if (focusGroups.length === 1) {
    perGroup.set(focusGroups[0], 5);
  } else if (focusGroups.length === 2) {
    perGroup.set(focusGroups[0], 3);
    perGroup.set(focusGroups[1], 3);
  } else if (focusGroups.length === 3) {
    perGroup.set(focusGroups[0], 2);
    perGroup.set(focusGroups[1], 2);
    perGroup.set(focusGroups[2], 2);
  } else {
    for (const g of focusGroups) perGroup.set(g, 1);
    let remaining = targetTotal - focusGroups.length;
    for (const g of focusGroups) {
      if (remaining <= 0) break;
      perGroup.set(g, (perGroup.get(g) || 1) + 1);
      remaining--;
    }
  }

  const result: GymTrainingExercise[] = [];

  for (const group of focusGroups) {
    const count = perGroup.get(group) || 1;
    const candidates = exerciseLibrary
      .filter((e) => e.muscleGroup === group)
      .sort((a, b) => {
        let sa = 0, sb = 0;
        if (a.ynzoWeight) sa += 2;
        if (b.ynzoWeight) sb += 2;
        if (!recentExerciseIds.has(a.id)) sa += 1;
        if (!recentExerciseIds.has(b.id)) sb += 1;
        return sb - sa;
      });

    for (const ex of candidates.slice(0, count)) {
      result.push({
        exerciseId: ex.id,
        sets: ex.defaultSets,
        reps: ex.defaultReps,
      });
    }
  }

  return result.slice(0, targetTotal);
}
