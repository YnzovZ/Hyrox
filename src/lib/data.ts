export type WorkoutType = "run" | "strength" | "hyrox" | "recovery";
export type Difficulty = "easy" | "moderate" | "hard" | "race";

export interface Exercise {
  name: string;
  sets?: number;
  reps?: string;
  duration?: string;
  distance?: string;
  weight?: string;
  rest?: string;
  notes?: string;
  videoUrl?: string;
}

export interface Workout {
  id: string;
  day: number;
  week: number;
  title: string;
  type: WorkoutType;
  difficulty: Difficulty;
  duration: string;
  description: string;
  exercises: Exercise[];
}

export interface Station {
  id: number;
  name: string;
  distance?: string;
  reps?: string;
  icon: string;
  description: string;
  tips: string[];
  muscles: string[];
  videoUrl?: string;
}

export const stations: Station[] = [
  {
    id: 1,
    name: "SkiErg",
    distance: "1000m",
    icon: "🎿",
    description: "Simuleer langlaufen op de SkiErg. Trek het touw naar beneden met je hele lichaam.",
    tips: [
      "Gebruik je core en lats, niet alleen je armen",
      "Houd een constant tempo aan",
      "Buig licht door je knieen bij elke trek",
    ],
    muscles: ["Lats", "Triceps", "Core", "Hamstrings"],
    videoUrl: "https://www.youtube.com/watch?v=t8teWM7jbDI",
  },
  {
    id: 2,
    name: "Sled Push",
    distance: "50m",
    icon: "🏋️",
    description: "Duw de slee over 50 meter. Laag blijven en doorduwen.",
    tips: [
      "Houd je armen gestrekt en duw vanuit je benen",
      "Blijf laag, borst naar de grond",
      "Korte, krachtige stappen",
    ],
    muscles: ["Quads", "Glutes", "Schouders", "Core"],
    videoUrl: "https://www.youtube.com/watch?v=yKAxMSmHrd0",
  },
  {
    id: 3,
    name: "Sled Pull",
    distance: "50m",
    icon: "🪢",
    description: "Trek de slee naar je toe over 50 meter met het touw.",
    tips: [
      "Ga in een lage squat-positie zitten",
      "Trek hand over hand, snel en ritmisch",
      "Gebruik je rug en biceps",
    ],
    muscles: ["Rug", "Biceps", "Onderarmen", "Core"],
    videoUrl: "https://www.youtube.com/watch?v=WgRM2e5U6H0",
  },
  {
    id: 4,
    name: "Burpee Broad Jumps",
    distance: "80m",
    icon: "🐸",
    description: "Combinatie van een burpee met een brede sprong vooruit over 80 meter.",
    tips: [
      "Val gecontroleerd, spring explosief",
      "Gebruik je armen voor momentum bij de sprong",
      "Houd een constant ritme aan",
    ],
    muscles: ["Full body", "Quads", "Core", "Schouders"],
    videoUrl: "https://www.youtube.com/watch?v=W5gc1Inyha0",
  },
  {
    id: 5,
    name: "Rowing",
    distance: "1000m",
    icon: "🚣",
    description: "Row 1000 meter op de roeimachine.",
    tips: [
      "80% benen, 20% armen",
      "Drive met je benen, lean back, dan armen",
      "Houd een split van 1:55-2:10 aan",
    ],
    muscles: ["Benen", "Rug", "Biceps", "Core"],
    videoUrl: "https://www.youtube.com/watch?v=gvM-WuRfbkY",
  },
  {
    id: 6,
    name: "Farmers Carry",
    distance: "200m",
    icon: "🧳",
    description: "Draag twee kettlebells of dumbbells over 200 meter.",
    tips: [
      "Schouders naar achteren, borst vooruit",
      "Korte, snelle stappen",
      "Adem rustig door, niet inhouden",
    ],
    muscles: ["Onderarmen", "Traps", "Core", "Schouders"],
    videoUrl: "https://www.youtube.com/watch?v=lLAw6fUccKA",
  },
  {
    id: 7,
    name: "Sandbag Lunges",
    distance: "100m",
    icon: "🏃",
    description: "Lunges met een sandbag over je schouder, 100 meter.",
    tips: [
      "Wissel de sandbag regelmatig van schouder",
      "Knie raakt bijna de grond bij elke lunge",
      "Houd je bovenlichaam rechtop",
    ],
    muscles: ["Quads", "Glutes", "Core", "Schouders"],
    videoUrl: "https://www.youtube.com/watch?v=29lLj4p6Slo",
  },
  {
    id: 8,
    name: "Wall Balls",
    reps: "75-100",
    icon: "🏐",
    description: "Squat en gooi de medicine ball naar het doel. 75 reps (vrouwen) of 100 reps (mannen).",
    tips: [
      "Gebruik de impuls van de squat voor de throw",
      "Vang de bal op en ga direct door in de squat",
      "Breek op in sets als het nodig is: 25-25-25",
    ],
    muscles: ["Quads", "Schouders", "Triceps", "Core"],
    videoUrl: "https://www.youtube.com/watch?v=t3-CS4e4mus",
  },
];

const exerciseVideos: Record<string, string> = {
  "Plank": "https://www.youtube.com/watch?v=ASdvN_XEl_c",
  "Dead Bug": "https://www.youtube.com/watch?v=bxn9FBrt4-A",
  "Side Plank": "https://www.youtube.com/watch?v=iNbH7_edNI8",
  "Goblet Squat": "https://www.youtube.com/watch?v=MxsFDhcyFyE",
  "Romanian Deadlift": "https://www.youtube.com/watch?v=2SHsk9AzdjA",
  "Overhead Press": "https://www.youtube.com/watch?v=F3QY5vMz_6I",
  "Bent Over Row": "https://www.youtube.com/watch?v=FWJR5Ve8bnQ",
  "Farmers Walk": "https://www.youtube.com/watch?v=lLAw6fUccKA",
  "Front Squat": "https://www.youtube.com/watch?v=wyDbagKS7Rg",
  "Sled Push simulatie (Prowler)": "https://www.youtube.com/watch?v=yKAxMSmHrd0",
  "Cable Row": "https://www.youtube.com/watch?v=xQNrFHEMhI4",
  "Walking Lunges": "https://www.youtube.com/watch?v=_qSuiZ62vqI",
  "Lat Pulldown": "https://www.youtube.com/watch?v=CAwf7n6Luuc",
  "Trap Bar Deadlift": "https://www.youtube.com/watch?v=ZIjM09eQH-Q",
  "Sled Push": "https://www.youtube.com/watch?v=yKAxMSmHrd0",
  "Sled Pull (rope)": "https://www.youtube.com/watch?v=WgRM2e5U6H0",
  "Sled Pull": "https://www.youtube.com/watch?v=WgRM2e5U6H0",
  "Wall Ball": "https://www.youtube.com/watch?v=t3-CS4e4mus",
  "Wall Balls": "https://www.youtube.com/watch?v=t3-CS4e4mus",
  "Sandbag Hold Squats": "https://www.youtube.com/watch?v=29lLj4p6Slo",
  "Sandbag Lunges": "https://www.youtube.com/watch?v=29lLj4p6Slo",
  "SkiErg": "https://www.youtube.com/watch?v=t8teWM7jbDI",
  "Rowing": "https://www.youtube.com/watch?v=gvM-WuRfbkY",
  "Burpee Broad Jumps": "https://www.youtube.com/watch?v=W5gc1Inyha0",
  "Farmers Carry": "https://www.youtube.com/watch?v=lLAw6fUccKA",
  "Kettlebell Swings": "https://www.youtube.com/watch?v=YSxHifyI6s8",
  "Box Jumps": "https://www.youtube.com/watch?v=G-bxQY57mKc",
  "Burpees": "https://www.youtube.com/watch?v=qLBImHhCXSw",
};

export function generateTrainingPlan(): Workout[] {
  const workouts: Workout[] = [];

  const weekPlans: {
    phase: string;
    days: Omit<Workout, "id" | "week">[];
  }[] = [
    {
      phase: "Base 1",
      days: [
        {
          day: 1,
          title: "Easy Run + Core",
          type: "run",
          difficulty: "easy",
          duration: "45 min",
          description: "Bouw je aerobe basis op met een ontspannen duurloop.",
          exercises: [
            { name: "Easy Run", duration: "30 min", notes: "Praattempo" },
            { name: "Plank", sets: 3, duration: "45 sec", rest: "30 sec" },
            { name: "Dead Bug", sets: 3, reps: "10 per kant", rest: "30 sec" },
            { name: "Side Plank", sets: 2, duration: "30 sec per kant", rest: "30 sec" },
          ],
        },
        {
          day: 2,
          title: "Kracht Basis",
          type: "strength",
          difficulty: "moderate",
          duration: "50 min",
          description: "Basisoefeningen om kracht op te bouwen voor de Hyrox-stations.",
          exercises: [
            { name: "Goblet Squat", sets: 4, reps: "12", rest: "60 sec" },
            { name: "Romanian Deadlift", sets: 4, reps: "10", rest: "60 sec" },
            { name: "Overhead Press", sets: 3, reps: "10", rest: "60 sec" },
            { name: "Bent Over Row", sets: 4, reps: "10", rest: "60 sec" },
            { name: "Farmers Walk", distance: "4x 40m", rest: "60 sec" },
          ],
        },
        {
          day: 4,
          title: "Intervals",
          type: "run",
          difficulty: "hard",
          duration: "40 min",
          description: "Intervaltraining om je snelheid en uithoudingsvermogen te verbeteren.",
          exercises: [
            { name: "Warm-up jog", duration: "10 min" },
            { name: "Intervals", sets: 6, distance: "400m", rest: "90 sec", notes: "80-85% effort" },
            { name: "Cool-down jog", duration: "10 min" },
          ],
        },
        {
          day: 5,
          title: "Hyrox Intro",
          type: "hyrox",
          difficulty: "moderate",
          duration: "55 min",
          description: "Kennismaken met de Hyrox-stations. Focus op techniek.",
          exercises: [
            { name: "Run", distance: "1 km", notes: "Matig tempo" },
            { name: "SkiErg", distance: "500m" },
            { name: "Run", distance: "1 km" },
            { name: "Wall Balls", reps: "30", notes: "Focus op techniek" },
            { name: "Run", distance: "1 km" },
            { name: "Rowing", distance: "500m" },
            { name: "Cool-down", duration: "5 min" },
          ],
        },
      ],
    },
    {
      phase: "Base 2",
      days: [
        {
          day: 1,
          title: "Tempo Run",
          type: "run",
          difficulty: "moderate",
          duration: "45 min",
          description: "Tempo run om je lactaatdrempel te verleggen.",
          exercises: [
            { name: "Warm-up", duration: "10 min", notes: "Easy jog" },
            { name: "Tempo Run", duration: "20 min", notes: "Comfortabel hard, 75-80% effort" },
            { name: "Cool-down", duration: "10 min" },
          ],
        },
        {
          day: 2,
          title: "Push/Pull Kracht",
          type: "strength",
          difficulty: "moderate",
          duration: "55 min",
          description: "Focus op push- en pull-bewegingen die je nodig hebt bij Hyrox.",
          exercises: [
            { name: "Front Squat", sets: 4, reps: "8", rest: "90 sec" },
            { name: "Sled Push simulatie (Prowler)", distance: "4x 25m", rest: "90 sec" },
            { name: "Cable Row", sets: 4, reps: "12", rest: "60 sec" },
            { name: "Walking Lunges", sets: 3, reps: "12 per been", rest: "60 sec", weight: "Met dumbbells" },
            { name: "Lat Pulldown", sets: 3, reps: "12", rest: "60 sec" },
          ],
        },
        {
          day: 4,
          title: "Hill Sprints",
          type: "run",
          difficulty: "hard",
          duration: "35 min",
          description: "Heuvelsprints voor explosieve beenkracht.",
          exercises: [
            { name: "Warm-up jog", duration: "10 min" },
            { name: "Hill Sprints", sets: 8, duration: "30 sec", rest: "90 sec walk terug", notes: "90% effort" },
            { name: "Cool-down jog", duration: "10 min" },
          ],
        },
        {
          day: 6,
          title: "Hyrox Halve Sim",
          type: "hyrox",
          difficulty: "hard",
          duration: "60 min",
          description: "Halve Hyrox-simulatie. 4 stations met runs.",
          exercises: [
            { name: "Run", distance: "1 km" },
            { name: "SkiErg", distance: "1000m" },
            { name: "Run", distance: "1 km" },
            { name: "Burpee Broad Jumps", distance: "40m" },
            { name: "Run", distance: "1 km" },
            { name: "Rowing", distance: "1000m" },
            { name: "Run", distance: "1 km" },
            { name: "Wall Balls", reps: "50" },
          ],
        },
      ],
    },
    {
      phase: "Build 1",
      days: [
        {
          day: 1,
          title: "Long Run",
          type: "run",
          difficulty: "moderate",
          duration: "55 min",
          description: "Langere duurloop voor aerobe capaciteit.",
          exercises: [
            { name: "Long Run", duration: "50 min", notes: "Praattempo, gelijkmatig" },
            { name: "Stretching", duration: "5 min" },
          ],
        },
        {
          day: 2,
          title: "Hyrox Kracht",
          type: "strength",
          difficulty: "hard",
          duration: "55 min",
          description: "Zwaardere kracht specifiek voor Hyrox-stations.",
          exercises: [
            { name: "Trap Bar Deadlift", sets: 5, reps: "5", rest: "2 min" },
            { name: "Sled Push", distance: "4x 50m", rest: "2 min" },
            { name: "Sled Pull (rope)", distance: "4x 25m", rest: "90 sec" },
            { name: "Wall Ball", sets: 3, reps: "20", rest: "90 sec" },
            { name: "Sandbag Hold Squats", sets: 3, reps: "8", rest: "90 sec" },
          ],
        },
        {
          day: 4,
          title: "Run Intervals + SkiErg",
          type: "hyrox",
          difficulty: "hard",
          duration: "50 min",
          description: "Combineer run intervals met SkiErg voor race-specifiek werk.",
          exercises: [
            { name: "Warm-up", duration: "10 min" },
            { name: "Run 1 km + SkiErg 500m", sets: 3, rest: "2 min", notes: "Race tempo" },
            { name: "Cool-down", duration: "10 min" },
          ],
        },
        {
          day: 6,
          title: "Hyrox 6-Station Sim",
          type: "hyrox",
          difficulty: "hard",
          duration: "75 min",
          description: "Zes stations met volle afstanden.",
          exercises: [
            { name: "Run", distance: "1 km" },
            { name: "SkiErg", distance: "1000m" },
            { name: "Run", distance: "1 km" },
            { name: "Sled Push", distance: "50m" },
            { name: "Run", distance: "1 km" },
            { name: "Sled Pull", distance: "50m" },
            { name: "Run", distance: "1 km" },
            { name: "Rowing", distance: "1000m" },
            { name: "Run", distance: "1 km" },
            { name: "Farmers Carry", distance: "200m" },
            { name: "Run", distance: "1 km" },
            { name: "Wall Balls", reps: "75" },
          ],
        },
      ],
    },
    {
      phase: "Build 2",
      days: [
        {
          day: 1,
          title: "Tempo Intervals",
          type: "run",
          difficulty: "hard",
          duration: "45 min",
          description: "Langere tempo-intervallen op wedstrijdtempo.",
          exercises: [
            { name: "Warm-up", duration: "10 min" },
            { name: "Tempo Intervals", sets: 4, distance: "1 km", rest: "2 min", notes: "Race pace" },
            { name: "Cool-down", duration: "10 min" },
          ],
        },
        {
          day: 2,
          title: "Krachtcircuit",
          type: "strength",
          difficulty: "hard",
          duration: "50 min",
          description: "Circuit training met Hyrox-specifieke oefeningen.",
          exercises: [
            { name: "Circuit (3 rondes)", notes: "Minimale rust tussen oefeningen, 2 min rust tussen rondes" },
            { name: "Wall Balls", reps: "20" },
            { name: "Kettlebell Swings", reps: "15" },
            { name: "Box Jumps", reps: "10" },
            { name: "Sled Push", distance: "25m" },
            { name: "Rowing", distance: "250m" },
            { name: "Burpees", reps: "10" },
          ],
        },
        {
          day: 4,
          title: "Race Pace Run",
          type: "run",
          difficulty: "hard",
          duration: "40 min",
          description: "Run op je beoogde wedstrijdtempo.",
          exercises: [
            { name: "Warm-up", duration: "10 min" },
            { name: "Race Pace Run", duration: "20 min", notes: "Het tempo dat je wil lopen op raceday" },
            { name: "Cool-down", duration: "10 min" },
          ],
        },
        {
          day: 6,
          title: "Volle Hyrox Simulatie",
          type: "hyrox",
          difficulty: "race",
          duration: "90 min",
          description: "Complete Hyrox-simulatie. Alle 8 stations, alle afstanden.",
          exercises: [
            { name: "Run", distance: "1 km" },
            { name: "SkiErg", distance: "1000m" },
            { name: "Run", distance: "1 km" },
            { name: "Sled Push", distance: "50m" },
            { name: "Run", distance: "1 km" },
            { name: "Sled Pull", distance: "50m" },
            { name: "Run", distance: "1 km" },
            { name: "Burpee Broad Jumps", distance: "80m" },
            { name: "Run", distance: "1 km" },
            { name: "Rowing", distance: "1000m" },
            { name: "Run", distance: "1 km" },
            { name: "Farmers Carry", distance: "200m" },
            { name: "Run", distance: "1 km" },
            { name: "Sandbag Lunges", distance: "100m" },
            { name: "Run", distance: "1 km" },
            { name: "Wall Balls", reps: "100" },
          ],
        },
      ],
    },
    {
      phase: "Peak 1",
      days: [
        {
          day: 1,
          title: "Speed Work",
          type: "run",
          difficulty: "hard",
          duration: "40 min",
          description: "Korte, snelle intervallen voor topsnelheid.",
          exercises: [
            { name: "Warm-up", duration: "10 min" },
            { name: "Intervals", sets: 8, distance: "200m", rest: "60 sec", notes: "90% effort" },
            { name: "Cool-down", duration: "10 min" },
          ],
        },
        {
          day: 2,
          title: "Station Drills",
          type: "hyrox",
          difficulty: "hard",
          duration: "50 min",
          description: "Focus op snelheid en efficiency per station.",
          exercises: [
            { name: "SkiErg", distance: "1000m", notes: "Time trial" },
            { name: "Rest", duration: "3 min" },
            { name: "Rowing", distance: "1000m", notes: "Time trial" },
            { name: "Rest", duration: "3 min" },
            { name: "Wall Balls", reps: "75", notes: "Time trial" },
            { name: "Rest", duration: "3 min" },
            { name: "Burpee Broad Jumps", distance: "80m", notes: "Time trial" },
          ],
        },
        {
          day: 4,
          title: "Threshold Run",
          type: "run",
          difficulty: "hard",
          duration: "45 min",
          description: "Run net onder je maximale aerobe drempel.",
          exercises: [
            { name: "Warm-up", duration: "10 min" },
            { name: "Threshold Run", duration: "25 min", notes: "Net onder lactaatdrempel" },
            { name: "Cool-down", duration: "10 min" },
          ],
        },
        {
          day: 6,
          title: "Race Rehearsal",
          type: "hyrox",
          difficulty: "race",
          duration: "90 min",
          description: "Volledige dress rehearsal. Race-tempo, race-gewichten.",
          exercises: [
            { name: "Volledige Hyrox", notes: "Alle 8 runs + 8 stations op race-tempo" },
            { name: "Noteer je totaaltijd en splittijden", notes: "Gebruik de timer" },
          ],
        },
      ],
    },
    {
      phase: "Peak 2",
      days: [
        {
          day: 1,
          title: "Fartlek Run",
          type: "run",
          difficulty: "moderate",
          duration: "40 min",
          description: "Speelse tempoafwisseling om fris te blijven.",
          exercises: [
            { name: "Fartlek Run", duration: "35 min", notes: "Wissel elke 3-5 min tussen easy en tempo" },
            { name: "Stretching", duration: "5 min" },
          ],
        },
        {
          day: 3,
          title: "Race Specifiek",
          type: "hyrox",
          difficulty: "hard",
          duration: "50 min",
          description: "Combinaties van stations die je lastig vindt.",
          exercises: [
            { name: "Run 1 km + Sled Push 50m", sets: 2, rest: "3 min" },
            { name: "Run 1 km + Sandbag Lunges 100m", sets: 2, rest: "3 min" },
            { name: "Run 1 km + Wall Balls 50", sets: 1 },
          ],
        },
        {
          day: 5,
          title: "Easy Recovery Run",
          type: "recovery",
          difficulty: "easy",
          duration: "30 min",
          description: "Lichte herstelrun. Houd het rustig.",
          exercises: [
            { name: "Easy Run", duration: "20 min", notes: "Echt heel makkelijk" },
            { name: "Foam Rolling", duration: "10 min" },
          ],
        },
      ],
    },
    {
      phase: "Taper 1",
      days: [
        {
          day: 1,
          title: "Shakeout Run",
          type: "run",
          difficulty: "easy",
          duration: "30 min",
          description: "Lichte run met een paar strides.",
          exercises: [
            { name: "Easy Run", duration: "20 min" },
            { name: "Strides", sets: 4, distance: "100m", rest: "Walk back", notes: "Soepel en snel" },
          ],
        },
        {
          day: 3,
          title: "Station Touch",
          type: "hyrox",
          difficulty: "moderate",
          duration: "35 min",
          description: "Korte, snelle doorloop van elk station. Halve afstanden.",
          exercises: [
            { name: "SkiErg", distance: "500m" },
            { name: "Sled Push", distance: "25m" },
            { name: "Sled Pull", distance: "25m" },
            { name: "Burpee Broad Jumps", distance: "40m" },
            { name: "Rowing", distance: "500m" },
            { name: "Farmers Carry", distance: "100m" },
            { name: "Sandbag Lunges", distance: "50m" },
            { name: "Wall Balls", reps: "30" },
          ],
        },
        {
          day: 5,
          title: "Recovery",
          type: "recovery",
          difficulty: "easy",
          duration: "30 min",
          description: "Actief herstel. Licht bewegen, stretchen.",
          exercises: [
            { name: "Light Walk", duration: "15 min" },
            { name: "Yoga/Stretching", duration: "15 min" },
          ],
        },
      ],
    },
    {
      phase: "Race Week",
      days: [
        {
          day: 1,
          title: "Shakeout",
          type: "run",
          difficulty: "easy",
          duration: "20 min",
          description: "Heel lichte shakeout. Houd energie over.",
          exercises: [
            { name: "Easy Jog", duration: "15 min" },
            { name: "Strides", sets: 3, distance: "80m", notes: "Ontspannen" },
          ],
        },
        {
          day: 3,
          title: "Mobiliteit",
          type: "recovery",
          difficulty: "easy",
          duration: "20 min",
          description: "Mobiliteitswerk. Houd alles soepel.",
          exercises: [
            { name: "Dynamic Stretching", duration: "10 min" },
            { name: "Foam Rolling", duration: "10 min" },
          ],
        },
        {
          day: 6,
          title: "RACE DAY",
          type: "hyrox",
          difficulty: "race",
          duration: "60-90 min",
          description: "Dit is het. Alles gegeven in de training, nu laten zien. Veel succes.",
          exercises: [
            { name: "Hyrox Race", notes: "8x 1km run + 8 stations. Alles of niets." },
          ],
        },
      ],
    },
  ];

  weekPlans.forEach((weekPlan, weekIndex) => {
    weekPlan.days.forEach((day) => {
      workouts.push({
        ...day,
        id: `w${weekIndex + 1}d${day.day}`,
        week: weekIndex + 1,
        exercises: day.exercises.map((ex) => ({
          ...ex,
          videoUrl: ex.videoUrl ?? exerciseVideos[ex.name],
        })),
      });
    });
  });

  return workouts;
}

export const weekPhases = [
  "Base 1",
  "Base 2",
  "Build 1",
  "Build 2",
  "Peak 1",
  "Peak 2",
  "Taper 1",
  "Race Week",
];

export const dayNames = ["", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
