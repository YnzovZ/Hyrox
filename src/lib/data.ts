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
  isBonus?: boolean;
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
  "Step-ups": "https://www.youtube.com/watch?v=dQqApCGd5Cw",
  "Burpees": "https://www.youtube.com/watch?v=qLBImHhCXSw",
  "Bulgarian Split Squat": "https://www.youtube.com/watch?v=2C-uNgKwPLE",
  "Hip Thrust": "https://www.youtube.com/watch?v=SEdqd1n0cvg",
  "Push-ups": "https://www.youtube.com/watch?v=IODxDxX7oi4",
  "Mountain Climbers": "https://www.youtube.com/watch?v=nmwgirgXLYM",
  "Dumbbell Thruster": "https://www.youtube.com/watch?v=UjPZ4lCMsZo",
  "Battle Ropes": "https://www.youtube.com/watch?v=eibq9HsCOKY",
  "Medicine Ball Slam": "https://www.youtube.com/watch?v=jAQg20sDVpo",
  "Back Squat": "https://www.youtube.com/watch?v=ultWZbUMPL8",
  "Calf Raise Excentrisch": "https://www.youtube.com/watch?v=YMa3bQzUvZ8",
};

export interface ExerciseAlternative {
  name: string;
  notes: string;
  machine: boolean;
}

export const exerciseAlternatives: Record<string, ExerciseAlternative[]> = {
  "Goblet Squat": [
    { name: "Leg Press", notes: "Machine. Zelfde spiergroepen, minder belasting voor je rug.", machine: true },
    { name: "Hack Squat Machine", notes: "Machine. Squat-beweging met rugondersteuning.", machine: true },
    { name: "Dumbbell Squat", notes: "Dumbbells langs je zij, breed staan.", machine: false },
  ],
  "Back Squat": [
    { name: "Leg Press", notes: "Machine. Zelfde spiergroepen, minder belasting voor je rug.", machine: true },
    { name: "Hack Squat Machine", notes: "Machine. Squat-beweging met rugondersteuning.", machine: true },
    { name: "Goblet Squat", notes: "Kettlebell of dumbbell voor je borst. Lichter alternatief.", machine: false },
  ],
  "Romanian Deadlift": [
    { name: "Leg Curl Machine", notes: "Machine. Isoleert je hamstrings.", machine: true },
    { name: "Hyperextensie", notes: "Rug en hamstrings. Gebruik het apparaat in de gym.", machine: false },
    { name: "Dumbbell Romanian Deadlift", notes: "Zelfde beweging, dumbbells in plaats van barbell.", machine: false },
  ],
  "Overhead Press": [
    { name: "Shoulder Press Machine", notes: "Machine. Zelfde beweging, meer stabiliteit.", machine: true },
    { name: "Dumbbell Shoulder Press", notes: "Zittend op een bankje, dumbbells omhoog drukken.", machine: false },
    { name: "Landmine Press", notes: "Barbell in de hoek, eenzijdig drukken.", machine: false },
  ],
  "Bent Over Row": [
    { name: "Seated Row Machine", notes: "Machine. Zelfde trekbeweging, ondersteund.", machine: true },
    { name: "Single Arm Dumbbell Row", notes: "Eenhandig, knie en hand op bankje.", machine: false },
    { name: "T-Bar Row", notes: "Barbell in de hoek, met V-grip trekken.", machine: false },
  ],
  "Front Squat": [
    { name: "Leg Press", notes: "Machine. Minder belasting voor polsen en schouders.", machine: true },
    { name: "Hack Squat Machine", notes: "Machine. Squat-patroon met rugondersteuning.", machine: true },
    { name: "Goblet Squat", notes: "Kettlebell of dumbbell voor je borst.", machine: false },
  ],
  "Lat Pulldown": [
    { name: "Assisted Pull-up Machine", notes: "Machine. Bouw toe naar volledige pull-ups.", machine: true },
    { name: "Cable Pullover", notes: "Cable machine, isoleert je lats.", machine: true },
    { name: "Resistance Band Pull-down", notes: "Band over een hoog punt, naar beneden trekken.", machine: false },
  ],
  "Trap Bar Deadlift": [
    { name: "Leg Press", notes: "Machine. Zelfde spiergroepen, veiliger voor je rug.", machine: true },
    { name: "Smith Machine Deadlift", notes: "Machine. Geeft een vast pad, meer stabiliteit.", machine: true },
    { name: "Dumbbell Deadlift", notes: "Dumbbells langs je zij, zelfde beweging.", machine: false },
  ],
  "Cable Row": [
    { name: "Seated Row Machine", notes: "Machine. Vaste greep, makkelijker aan te passen.", machine: true },
    { name: "Single Arm Dumbbell Row", notes: "Eenhandig, knie op bankje.", machine: false },
    { name: "Chest Supported Row", notes: "Liggend op een schuine bank, dumbbells trekken.", machine: false },
  ],
  "Walking Lunges": [
    { name: "Leg Press (enkel been)", notes: "Machine. Een been tegelijk, zelfde spiergroepen.", machine: true },
    { name: "Smith Machine Lunges", notes: "Machine. Lunges met extra stabiliteit.", machine: true },
    { name: "Reverse Lunges", notes: "Stap naar achteren i.p.v. naar voren. Minder belasting voor knieen.", machine: false },
  ],
  "Bulgarian Split Squat": [
    { name: "Leg Press (enkel been)", notes: "Machine. Een been tegelijk drukken.", machine: true },
    { name: "Smith Machine Split Squat", notes: "Machine. Zelfde beweging met stabiliteit.", machine: true },
    { name: "Reverse Lunges", notes: "Stap naar achteren, wissel per been.", machine: false },
  ],
  "Hip Thrust": [
    { name: "Hip Thrust Machine", notes: "Machine. Zelfde beweging, makkelijke instelling.", machine: true },
    { name: "Leg Curl Machine", notes: "Machine. Traint hamstrings en glutes.", machine: true },
    { name: "Glute Bridge", notes: "Op de grond, barbell of dumbbell op je heupen.", machine: false },
  ],
  "Kettlebell Swings": [
    { name: "Cable Pull Through", notes: "Cable machine. Zelfde heupextensie-beweging.", machine: true },
    { name: "Hip Thrust Machine", notes: "Machine. Traint dezelfde spiergroepen.", machine: true },
    { name: "Dumbbell Swings", notes: "Zelfde beweging met een dumbbell.", machine: false },
  ],
  "Push-ups": [
    { name: "Chest Press Machine", notes: "Machine. Zelfde duwbeweging, instelbaar gewicht.", machine: true },
    { name: "Dumbbell Bench Press", notes: "Liggend op een bankje, dumbbells omhoog drukken.", machine: false },
    { name: "Incline Push-ups", notes: "Handen op een bankje, makkelijker dan op de grond.", machine: false },
  ],
  "Step-ups": [
    { name: "Leg Press", notes: "Machine. Zelfde spiergroepen, minder balans nodig.", machine: true },
    { name: "Leg Extension Machine", notes: "Machine. Isoleert je quadriceps.", machine: true },
    { name: "Reverse Lunges", notes: "Stap naar achteren, wissel per been.", machine: false },
  ],
  "Dumbbell Thruster": [
    { name: "Leg Press + Shoulder Press Machine", notes: "Machine. Splits de beweging op in twee machines.", machine: true },
    { name: "Barbell Thruster", notes: "Zelfde beweging met een barbell.", machine: false },
    { name: "Goblet Squat + Press", notes: "Squat met kettlebell, druk omhoog aan de top.", machine: false },
  ],
  "Medicine Ball Slam": [
    { name: "Cable Woodchop", notes: "Cable machine. Vergelijkbare explosieve kernbeweging.", machine: true },
    { name: "Battle Ropes", notes: "Touwen op en neer slaan, zelfde intensiteit.", machine: false },
    { name: "Dumbbell Snatch", notes: "Explosief een dumbbell van de grond naar boven.", machine: false },
  ],
  "Wall Ball": [
    { name: "Leg Press + Shoulder Press Machine", notes: "Machine. Splits de squat-throw op in twee bewegingen.", machine: true },
    { name: "Dumbbell Thruster", notes: "Squat + press in een beweging met dumbbells.", machine: false },
    { name: "Goblet Squat + Press", notes: "Kettlebell squat, druk omhoog.", machine: false },
  ],
  "Wall Balls": [
    { name: "Leg Press + Shoulder Press Machine", notes: "Machine. Splits de squat-throw op in twee bewegingen.", machine: true },
    { name: "Dumbbell Thruster", notes: "Squat + press in een beweging met dumbbells.", machine: false },
    { name: "Goblet Squat + Press", notes: "Kettlebell squat, druk omhoog.", machine: false },
  ],
  "Sandbag Hold Squats": [
    { name: "Leg Press", notes: "Machine. Minder belasting voor schouders en rug.", machine: true },
    { name: "Hack Squat Machine", notes: "Machine. Squat met rugondersteuning.", machine: true },
    { name: "Goblet Squat", notes: "Kettlebell of dumbbell voor je borst.", machine: false },
  ],
  "Sled Push simulatie (Prowler)": [
    { name: "Leg Press (hoge reps)", notes: "Machine. Hoge herhalingen met lager gewicht.", machine: true },
    { name: "Incline Treadmill Walk", notes: "Loopband op steile helling, stevig doorlopen.", machine: true },
    { name: "Dumbbell Walking Lunges", notes: "Lunges met dumbbells over afstand.", machine: false },
  ],
  "Sled Push": [
    { name: "Leg Press (hoge reps)", notes: "Machine. Hoge herhalingen met lager gewicht.", machine: true },
    { name: "Incline Treadmill Walk", notes: "Loopband op steile helling, stevig doorlopen.", machine: true },
    { name: "Dumbbell Walking Lunges", notes: "Lunges met dumbbells over afstand.", machine: false },
  ],
  "Sled Pull (rope)": [
    { name: "Seated Row Machine (hoge reps)", notes: "Machine. Hoge herhalingen om dezelfde trekbeweging te trainen.", machine: true },
    { name: "Lat Pulldown (hoge reps)", notes: "Machine. Traint dezelfde trekspieren.", machine: true },
    { name: "Resistance Band Rows", notes: "Band om een vast punt, naar je toe trekken.", machine: false },
  ],
  "Sled Pull": [
    { name: "Seated Row Machine (hoge reps)", notes: "Machine. Hoge herhalingen, zelfde trekbeweging.", machine: true },
    { name: "Lat Pulldown (hoge reps)", notes: "Machine. Traint dezelfde trekspieren.", machine: true },
    { name: "Resistance Band Rows", notes: "Band om een vast punt, naar je toe trekken.", machine: false },
  ],
  "Farmers Walk": [
    { name: "Trap Bar Carry", notes: "Trap bar oppakken en lopen. Meer gewicht mogelijk.", machine: false },
    { name: "Dumbbell Carry", notes: "Zware dumbbells langs je zij, lopen.", machine: false },
    { name: "Grip Trainer + Incline Walk", notes: "Machine. Grip trainen apart, cardio op de loopband.", machine: true },
  ],
  "Farmers Carry": [
    { name: "Trap Bar Carry", notes: "Trap bar oppakken en lopen. Meer gewicht mogelijk.", machine: false },
    { name: "Dumbbell Carry", notes: "Zware dumbbells langs je zij, lopen.", machine: false },
    { name: "Grip Trainer + Incline Walk", notes: "Machine. Grip trainen apart, cardio op de loopband.", machine: true },
  ],
};

const bonusPool: Exercise[] = [
  { name: "Calf Raises", sets: 3, reps: "15", notes: "Rustig tempo, volledige range", isBonus: true },
  { name: "Face Pulls", sets: 3, reps: "15", notes: "Licht gewicht, schouderbladen samentrekken", isBonus: true },
  { name: "Pallof Press", sets: 3, reps: "10 per kant", notes: "Core anti-rotatie", isBonus: true },
  { name: "Dead Bug", sets: 3, reps: "10 per kant", notes: "Langzaam en gecontroleerd", isBonus: true },
  { name: "Banded Lateral Walk", sets: 3, reps: "12 per kant", notes: "Heupstabiliteit", isBonus: true },
  { name: "Side Plank", sets: 2, duration: "30 sec per kant", notes: "Core en heupstabiliteit", isBonus: true },
];

export function generateTrainingPlan(): Workout[] {
  const workouts: Workout[] = [];

  const weekPlans: {
    phase: string;
    days: Omit<Workout, "id" | "week">[];
  }[] = [
    // WEEK 1 - Opbouw Week 1 (10-17 aug)
    {
      phase: "Opbouw",
      days: [
        {
          day: 1,
          title: "Zone 1 Duurloop",
          type: "run",
          difficulty: "easy",
          duration: "45 min",
          description: "Herstart na rugrust. Praattempo, voorzichtig opbouwen. HR onder 145.",
          exercises: [
            { name: "Warming-up lopen", duration: "10 min", notes: "Standaard: wandelen, leg swings, A/B-skip, strides" },
            { name: "Zone 1 Run", duration: "35 min", notes: "7:00-7:30/km. Praattest = volledig zinnen spreken. Eerste week terug, voorzichtig." },
            { name: "Cooling-down lopen", duration: "8 min", notes: "Standaard: uitlopen, stretches, pigeon pose" },
          ],
        },
        {
          day: 3,
          title: "Intervaltraining",
          type: "run",
          difficulty: "moderate",
          duration: "42 min",
          description: "VO2max intervals. Noteer hoe de rug aanvoelt tijdens en na.",
          exercises: [
            { name: "Inlopen", duration: "8 min" },
            { name: "Intervals", sets: 5, duration: "3 min", rest: "90 sec wandelrust", notes: "@ 5:20/km" },
            { name: "Uitlopen", duration: "5 min" },
          ],
        },
        {
          day: 4,
          title: "Kracht Voorzichtige Herstart",
          type: "strength",
          difficulty: "easy",
          duration: "55 min",
          description: "Geen bovenlichaam. Techniek prioriteit, geen heroiek.",
          exercises: [
            { name: "Warming-up gym", duration: "8 min", notes: "Standaard: roeier, clamshells, hip thrusts, dead bugs, inchworms" },
            { name: "Back Squat", sets: 4, reps: "5", weight: "70% 1RM", rest: "2 min", notes: "Techniek prioriteit" },
            { name: "Romanian Deadlift", sets: 3, reps: "6", weight: "Licht", rest: "90 sec", notes: "Gecontroleerd" },
            { name: "Bulgarian Split Squat", sets: 3, reps: "8/been", weight: "Licht", rest: "90 sec" },
            { name: "Hip Thrust", sets: 4, reps: "10", weight: "Matig", rest: "90 sec" },
            { name: "Sled Push", sets: 3, distance: "20m", weight: "Matig", rest: "90 sec", notes: "Bovenrug neutraal, stop bij pijn" },
            { name: "Farmers Carry", sets: 3, distance: "35m", weight: "Licht", rest: "60 sec" },
            { name: "Calf Raise Excentrisch", sets: 3, reps: "12/been", rest: "60 sec" },
            { name: "Cooling-down gym", duration: "6 min", notes: "Standaard: pigeon pose, heupflexor, kuit, child's pose" },
          ],
        },
        {
          day: 6,
          title: "Hyrox Run-Station Circuit",
          type: "hyrox",
          difficulty: "moderate",
          duration: "48 min",
          description: "3 rondes run-station. Tempo 7:00-7:20/km. 90 sec rust na station.",
          exercises: [
            { name: "Warming-up lopen", duration: "10 min", notes: "Standaard: wandelen, leg swings, A/B-skip, strides" },
            { name: "Run 1km + SkiErg 500m + Run 1km + 20 Wall Balls 9kg", sets: 3, rest: "90 sec", notes: "Tempo 7:00-7:20/km" },
            { name: "Cooling-down lopen", duration: "8 min", notes: "Standaard: uitlopen, stretches, pigeon pose" },
          ],
        },
      ],
    },
    // WEEK 2 - Opbouw Week 2 (18-25 aug)
    {
      phase: "Opbouw",
      days: [
        {
          day: 1,
          title: "Zone 1 Lange Duurloop",
          type: "run",
          difficulty: "easy",
          duration: "55 min",
          description: "Eerste keer boven de 5km uitgerust. 7:00-7:20/km, ~7km.",
          exercises: [
            { name: "Warming-up lopen", duration: "10 min", notes: "Standaard: wandelen, leg swings, A/B-skip, strides" },
            { name: "Zone 1 Run", duration: "50 min", notes: "7:00-7:20/km. Eerste keer boven 5km." },
            { name: "Cooling-down lopen", duration: "8 min", notes: "Standaard: uitlopen, stretches, pigeon pose" },
          ],
        },
        {
          day: 3,
          title: "Intervaltraining Zwaarder",
          type: "run",
          difficulty: "moderate",
          duration: "45 min",
          description: "Eén minuut langer dan week 1. Noteer gemiddeld tempo per interval.",
          exercises: [
            { name: "Inlopen", duration: "8 min" },
            { name: "Intervals", sets: 5, duration: "4 min", rest: "90 sec wandelrust", notes: "@ 5:10-5:20/km" },
            { name: "Uitlopen", duration: "5 min" },
          ],
        },
        {
          day: 4,
          title: "Kracht Opbouw",
          type: "strength",
          difficulty: "moderate",
          duration: "60 min",
          description: "Zwaarder dan week 1. Opbouw in volume en gewicht.",
          exercises: [
            { name: "Warming-up gym", duration: "8 min", notes: "Standaard: roeier, clamshells, hip thrusts, dead bugs, inchworms" },
            { name: "Back Squat", sets: 5, reps: "5", weight: "75% 1RM", rest: "2 min" },
            { name: "Romanian Deadlift", sets: 4, reps: "5", weight: "Zwaarder", rest: "2 min" },
            { name: "Bulgarian Split Squat", sets: 4, reps: "8/been", weight: "Zwaarder", rest: "90 sec" },
            { name: "Hip Thrust", sets: 4, reps: "10", weight: "Zwaarder", rest: "90 sec", notes: "2 sec hold" },
            { name: "Sled Push", sets: 4, distance: "20m", weight: "Zwaarder dan W1", rest: "90 sec" },
            { name: "Farmers Carry", sets: 4, distance: "40m", weight: "Racegewicht", rest: "60 sec" },
            { name: "Walking Lunges", sets: 3, reps: "10/been", rest: "60 sec" },
            { name: "Calf Raise Excentrisch", sets: 3, reps: "15/been", rest: "60 sec" },
            { name: "Cooling-down gym", duration: "6 min", notes: "Standaard: pigeon pose, heupflexor, kuit, child's pose" },
          ],
        },
        {
          day: 6,
          title: "Hyrox Piramide",
          type: "hyrox",
          difficulty: "moderate",
          duration: "55 min",
          description: "Piramide format met mannengewichten. 3x op en neer, elke ronde sneller.",
          exercises: [
            { name: "Warming-up lopen", duration: "10 min", notes: "Standaard: wandelen, leg swings, A/B-skip, strides" },
            { name: "Piramide: 5 BBJ + 10 Wall Balls 9kg + 15 Sled Pull + 200m Run (op en neer)", sets: 3, rest: "2 min", notes: "Neer = omgekeerde volgorde. Elke ronde iets sneller." },
            { name: "Rowing", distance: "500m", notes: "Finisher - zo snel mogelijk" },
            { name: "Cooling-down lopen", duration: "8 min", notes: "Standaard: uitlopen, stretches, pigeon pose" },
          ],
        },
      ],
    },
    // WEEK 3 - Opbouw Week 3 (26 aug - 1 sept)
    {
      phase: "Opbouw",
      days: [
        {
          day: 1,
          title: "Lange Duurloop ~10km",
          type: "run",
          difficulty: "easy",
          duration: "75 min",
          description: "Sleutelrun voor Dam tot Dam. Pijnvrij 10km afmaken = klaar voor 16km.",
          exercises: [
            { name: "Warming-up lopen", duration: "10 min", notes: "Standaard: wandelen, leg swings, A/B-skip, strides" },
            { name: "Zone 1 Run", duration: "65 min", notes: "7:00-7:15/km. ~9-10km. Zone 1 tempo." },
            { name: "Cooling-down lopen", duration: "8 min", notes: "Standaard: uitlopen, stretches, pigeon pose" },
          ],
        },
        {
          day: 3,
          title: "Drempel Intervals",
          type: "run",
          difficulty: "moderate",
          duration: "48 min",
          description: "Eerste echte drempeltraining. Comfortabel oncomfortabel.",
          exercises: [
            { name: "Inlopen", duration: "10 min" },
            { name: "Intervals", sets: 3, duration: "8 min", rest: "2 min wandelrust", notes: "Drempel @ 5:00-5:10/km" },
            { name: "Uitlopen", duration: "5 min" },
          ],
        },
        {
          day: 4,
          title: "Kracht 78% 1RM",
          type: "strength",
          difficulty: "moderate",
          duration: "63 min",
          description: "Langste duurloop achter de rug. Kracht op 78% - stevige sessie.",
          exercises: [
            { name: "Warming-up gym", duration: "8 min", notes: "Standaard: roeier, clamshells, hip thrusts, dead bugs, inchworms" },
            { name: "Back Squat", sets: 5, reps: "5", weight: "78% 1RM", rest: "2.5 min" },
            { name: "Romanian Deadlift", sets: 4, reps: "5", weight: "Zwaar", rest: "2 min" },
            { name: "Bulgarian Split Squat", sets: 4, reps: "6/been", weight: "Barbell", rest: "2 min" },
            { name: "Hip Thrust", sets: 4, reps: "8", rest: "90 sec", notes: "2 sec hold" },
            { name: "Sled Push", sets: 4, distance: "20m", weight: "Zwaar", rest: "90 sec", notes: "Lage positie" },
            { name: "Farmers Carry", sets: 4, distance: "40m", weight: "Racegewicht", rest: "60 sec" },
            { name: "Walking Lunges", sets: 3, reps: "10/been", rest: "60 sec" },
            { name: "Calf Raise Excentrisch", sets: 3, reps: "15/been", rest: "60 sec" },
            { name: "Cooling-down gym", duration: "6 min", notes: "Standaard: pigeon pose, heupflexor, kuit, child's pose" },
          ],
        },
        {
          day: 6,
          title: "Hyrox EMOM",
          type: "hyrox",
          difficulty: "moderate",
          duration: "55 min",
          description: "EMOM format met mannengewichten. Pas reps aan: 10-15 sec rust per minuut.",
          exercises: [
            { name: "Warming-up lopen", duration: "10 min", notes: "Standaard: wandelen, leg swings, A/B-skip, strides" },
            { name: "Wall Balls", reps: "20", weight: "9kg", notes: "EMOM 20 min (5 rondes) - Min 1" },
            { name: "Burpee Broad Jumps", reps: "10", notes: "EMOM 20 min - Min 2" },
            { name: "SkiErg", distance: "200m", notes: "EMOM 20 min - Min 3" },
            { name: "Run", distance: "400m", notes: "EMOM 20 min - Min 4" },
            { name: "Sled Push 20m + Sled Pull 20m", notes: "EMOM 15 min (5 rondes) - Min 1. 2 min rust voor dit blok." },
            { name: "Farmers Carry", distance: "50m", notes: "EMOM 15 min - Min 2" },
            { name: "Sandbag Lunges", reps: "25", notes: "EMOM 15 min - Min 3" },
            { name: "Rowing", distance: "500m", notes: "Finisher - zo snel mogelijk" },
            { name: "Cooling-down lopen", duration: "8 min", notes: "Standaard: uitlopen, stretches, pigeon pose" },
          ],
        },
      ],
    },
    // WEEK 4 - Piek Week 1 (Dam tot Dam race week)
    {
      phase: "Piek",
      days: [
        {
          day: 1,
          title: "Zone 1 Rustig",
          type: "run",
          difficulty: "easy",
          duration: "35 min",
          description: "Bewust rustig voor Dam tot Dam race zaterdag.",
          exercises: [
            { name: "Zone 1 Run", duration: "30 min", notes: "7:00-7:20/km. Rustig houden voor race." },
          ],
        },
        {
          day: 3,
          title: "Race-Activatie Run",
          type: "run",
          difficulty: "easy",
          duration: "25 min",
          description: "Benen losgooien voor Dam tot Dam. Vrijdag: geen training, koolhydraten laden.",
          exercises: [
            { name: "Inlopen", duration: "5 min" },
            { name: "Intervals", sets: 2, distance: "1 km", rest: "2 min", notes: "@ 6:30/km. Rustig, activatie." },
            { name: "Uitlopen", duration: "5 min" },
          ],
        },
        {
          day: 4,
          title: "Kracht Licht voor Race",
          type: "strength",
          difficulty: "easy",
          duration: "45 min",
          description: "Lichte activatie voor Dam tot Dam. Geen zware belasting.",
          exercises: [
            { name: "Warming-up gym", duration: "8 min", notes: "Standaard: roeier, clamshells, hip thrusts, dead bugs, inchworms" },
            { name: "Back Squat", sets: 3, reps: "4", weight: "72% 1RM", rest: "2 min" },
            { name: "Romanian Deadlift", sets: 3, reps: "5", weight: "Licht", rest: "90 sec" },
            { name: "Hip Thrust", sets: 3, reps: "8", rest: "90 sec" },
            { name: "Farmers Carry", sets: 2, distance: "35m", weight: "Activatie", rest: "60 sec" },
            { name: "Cooling-down gym", duration: "6 min", notes: "Standaard: pigeon pose, heupflexor, kuit, child's pose" },
          ],
        },
        {
          day: 6,
          title: "Dam tot Dam 10 Mijl",
          type: "run",
          difficulty: "race",
          duration: "1:45-1:50",
          description: "Dam tot Dam 16,09 km. Dit is geen A-race, Hyrox is 26 november. Na race: geen kracht of Hyrox komende 7 dagen.",
          exercises: [
            { name: "Dam tot Dam Race", distance: "16,09 km", notes: "Doeltempo: 6:30-6:45/km. Eerste 5km op 6:45/km, tweede helft 6:30/km als goed voelt. Eindtijd ~1:45-1:50." },
          ],
        },
      ],
    },
    // WEEK 5 - Piek Week 2 (Deload na D2D)
    {
      phase: "Piek",
      days: [
        {
          day: 2,
          title: "Kracht Zeer Licht",
          type: "strength",
          difficulty: "easy",
          duration: "40 min",
          description: "Verplichte deload na Dam tot Dam. Geen intensiteit.",
          exercises: [
            { name: "Warming-up gym", duration: "8 min", notes: "Standaard: roeier, clamshells, hip thrusts, dead bugs, inchworms" },
            { name: "Back Squat", sets: 3, reps: "4", weight: "68% 1RM", rest: "2 min" },
            { name: "Romanian Deadlift", sets: 2, reps: "6", weight: "Onderhoud", rest: "90 sec" },
            { name: "Hip Thrust", sets: 3, reps: "10", weight: "Activatie", rest: "60 sec" },
            { name: "Farmers Carry", sets: 2, distance: "30m", weight: "Licht", rest: "60 sec" },
            { name: "Cooling-down gym", duration: "6 min", notes: "Standaard: pigeon pose, heupflexor, kuit, child's pose" },
          ],
        },
        {
          day: 4,
          title: "Hyrox Activatie Licht",
          type: "hyrox",
          difficulty: "easy",
          duration: "35 min",
          description: "Heel lichte activatie. Stop na 2 rondes.",
          exercises: [
            { name: "Rowing 500m + 15 Wall Balls 9kg + Run 400m", sets: 2, notes: "Rustig. @ 6:30/km. Stop na 2 rondes." },
          ],
        },
        {
          day: 6,
          title: "Herstelrun Zone 1",
          type: "recovery",
          difficulty: "easy",
          duration: "35 min",
          description: "Herstel na Dam tot Dam. Als benen zwaar zijn: 20 min wandelen.",
          exercises: [
            { name: "Zone 1 Run", duration: "25 min", notes: "7:00-7:20/km. Als benen zwaar: 20 min wandelen." },
          ],
        },
        {
          day: 7,
          title: "Zone 1 Ultra Rustig",
          type: "run",
          difficulty: "easy",
          duration: "25 min",
          description: "Ultra rustig. Herstel staat centraal.",
          exercises: [
            { name: "Zone 1 Run", duration: "18 min", notes: "7:00-7:20/km. Ultra rustig." },
          ],
        },
      ],
    },
    // WEEK 6 - Piek Week 3 (Echte piekfase start)
    {
      phase: "Piek",
      days: [
        {
          day: 2,
          title: "Kracht 82% 1RM",
          type: "strength",
          difficulty: "hard",
          duration: "67 min",
          description: "Eerste zware piekfase kracht. 82% 1RM. Echte piekfase start.",
          exercises: [
            { name: "Warming-up gym", duration: "8 min", notes: "Standaard: roeier, clamshells, hip thrusts, dead bugs, inchworms" },
            { name: "Back Squat", sets: 5, reps: "4", weight: "82% 1RM", rest: "2.5 min" },
            { name: "Romanian Deadlift", sets: 4, reps: "4", weight: "Zwaarder", rest: "2.5 min" },
            { name: "Bulgarian Split Squat", sets: 4, reps: "5/been", weight: "Zwaarder", rest: "2 min" },
            { name: "Hip Thrust", sets: 4, reps: "8", rest: "90 sec", notes: "1.5 rep methode. Max bilactivatie." },
            { name: "Sled Push", sets: 4, distance: "25m", rest: "90 sec" },
            { name: "Sled Pull", sets: 4, distance: "20m", rest: "90 sec", notes: "Touwgreep" },
            { name: "Farmers Carry", sets: 4, distance: "50m", weight: "10% boven racegewicht", rest: "60 sec" },
            { name: "Walking Lunges", sets: 4, reps: "10/been", rest: "60 sec" },
            { name: "Cooling-down gym", duration: "6 min", notes: "Standaard: pigeon pose, heupflexor, kuit, child's pose" },
          ],
        },
        {
          day: 4,
          title: "Volledige Race-Simulatie #1",
          type: "hyrox",
          difficulty: "hard",
          duration: "75 min",
          description: "Eerste volledige simulatie. Alle 8 stations, mannengewichten. Noteer ELKE km-tijd en elk station apart. Sub 1:25 sim = sub 1:20 race.",
          exercises: [
            { name: "Warming-up lopen", duration: "10 min", notes: "Standaard: wandelen, leg swings, A/B-skip, strides" },
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
            { name: "Wall Balls", reps: "100", weight: "9kg" },
            { name: "Cooling-down lopen", duration: "8 min", notes: "Standaard: uitlopen, stretches, pigeon pose" },
          ],
        },
        {
          day: 6,
          title: "Drempel + Racepace Combo",
          type: "run",
          difficulty: "moderate",
          duration: "55 min",
          description: "Loopbenchmark. Noteer elke split.",
          exercises: [
            { name: "Zone 1 Run", duration: "10 min", notes: "Warming-up" },
            { name: "Intervals", sets: 3, distance: "1 km", rest: "90 sec", notes: "Drempel @ 4:55-5:05/km" },
            { name: "Intervals", sets: 3, distance: "1 km", rest: "90 sec", notes: "Racepace @ 5:10-5:20/km" },
            { name: "Uitlopen", duration: "5 min" },
          ],
        },
        {
          day: 7,
          title: "Zone 1",
          type: "run",
          difficulty: "easy",
          duration: "40 min",
          description: "Rustige Zone 1 na drempel + sim.",
          exercises: [
            { name: "Zone 1 Run", duration: "30 min", notes: "6:15-6:25/km" },
          ],
        },
      ],
    },
    // WEEK 7 - Piek Week 4 (Deload)
    {
      phase: "Piek",
      days: [
        {
          day: 2,
          title: "Kracht Deload",
          type: "strength",
          difficulty: "easy",
          duration: "48 min",
          description: "Volume -40%, intensiteit hoog. Deload week.",
          exercises: [
            { name: "Warming-up gym", duration: "8 min", notes: "Standaard: roeier, clamshells, hip thrusts, dead bugs, inchworms" },
            { name: "Back Squat", sets: 3, reps: "4", weight: "79% 1RM", rest: "2 min" },
            { name: "Romanian Deadlift", sets: 3, reps: "4", weight: "Onderhoud", rest: "90 sec" },
            { name: "Hip Thrust", sets: 3, reps: "8", rest: "90 sec" },
            { name: "Sled Push", sets: 3, distance: "20m", weight: "Racegewicht", rest: "90 sec" },
            { name: "Farmers Carry", sets: 3, distance: "35m", rest: "60 sec" },
            { name: "Cooling-down gym", duration: "6 min", notes: "Standaard: pigeon pose, heupflexor, kuit, child's pose" },
          ],
        },
        {
          day: 4,
          title: "Lichte Sim 4 Stations",
          type: "hyrox",
          difficulty: "easy",
          duration: "45 min",
          description: "Lichte simulatie op 80% tempo. Deload week.",
          exercises: [
            { name: "Run 1km + SkiErg 500m + Run 1km + 20 Wall Balls 9kg", sets: 2, rest: "2 min", notes: "80% tempo" },
          ],
        },
        {
          day: 6,
          title: "Korte Zone 1 + Activatie",
          type: "run",
          difficulty: "easy",
          duration: "38 min",
          description: "Zone 1 met korte versnellingen. Deload week.",
          exercises: [
            { name: "Zone 1 Run", duration: "25 min" },
            { name: "Intervals", sets: 3, distance: "200m", notes: "Versnelling @ 4:20/km" },
          ],
        },
        {
          day: 7,
          title: "Zone 1",
          type: "run",
          difficulty: "easy",
          duration: "28 min",
          description: "Rustige Zone 1.",
          exercises: [
            { name: "Zone 1 Run", duration: "20 min", notes: "6:25/km" },
          ],
        },
      ],
    },
    // WEEK 8 - Piek Week 5 (Kracht 85%)
    {
      phase: "Piek",
      days: [
        {
          day: 2,
          title: "Kracht 85-87% 1RM",
          type: "strength",
          difficulty: "hard",
          duration: "70 min",
          description: "Zwaarste krachtsessie tot nu toe. 85-87% 1RM.",
          exercises: [
            { name: "Warming-up gym", duration: "8 min", notes: "Standaard: roeier, clamshells, hip thrusts, dead bugs, inchworms" },
            { name: "Back Squat", sets: 5, reps: "3", weight: "85-87% 1RM", rest: "3 min" },
            { name: "Romanian Deadlift", sets: 4, reps: "3", weight: "Zwaarst ooit", rest: "3 min" },
            { name: "Bulgarian Split Squat", sets: 4, reps: "4/been", weight: "Maximaal gewicht", rest: "2 min" },
            { name: "Hip Thrust", sets: 5, reps: "6", weight: "Zwaarst", rest: "2 min", notes: "2 sec hold" },
            { name: "Sled Push", sets: 4, distance: "25m", weight: "Zwaarst ooit", rest: "90 sec" },
            { name: "Sled Pull", sets: 4, distance: "25m", weight: "Zwaarst ooit", rest: "90 sec" },
            { name: "Farmers Carry", sets: 5, distance: "60m", weight: "15% boven racegewicht", rest: "60 sec" },
            { name: "Walking Lunges", sets: 4, reps: "10/been", weight: "Zwaarst", rest: "60 sec" },
            { name: "Cooling-down gym", duration: "6 min", notes: "Standaard: pigeon pose, heupflexor, kuit, child's pose" },
          ],
        },
        {
          day: 4,
          title: "Tabata + Roeier",
          type: "hyrox",
          difficulty: "hard",
          duration: "60 min",
          description: "Tabata blokken met mannengewichten. Hoge intensiteit.",
          exercises: [
            { name: "Warming-up lopen", duration: "10 min", notes: "Standaard: wandelen, leg swings, A/B-skip, strides" },
            { name: "Wall Balls", weight: "9kg", notes: "Tabata 1: 8x 20 sec werk / 10 sec rust (4 min totaal)" },
            { name: "Burpee Broad Jumps", notes: "Tabata 2: 8x 20 sec werk / 10 sec rust (4 min totaal). 2 min rust voor dit blok." },
            { name: "Rowing", sets: 5, distance: "300m", rest: "60 sec", notes: "Zo snel mogelijk per 300m. 2 min rust voor dit blok." },
            { name: "Sled Pull 20m + Farmers Carry 50m + 20 Sandbag Lunges", sets: 3, notes: "Circuit" },
            { name: "Cooling-down lopen", duration: "8 min", notes: "Standaard: uitlopen, stretches, pigeon pose" },
          ],
        },
        {
          day: 6,
          title: "Lange Duurloop + VO2max",
          type: "run",
          difficulty: "hard",
          duration: "68 min",
          description: "Zone 1 gevolgd door VO2max blokken. Slaap 8+ uur, koolhydraten voor de sessie.",
          exercises: [
            { name: "Zone 1 Run", duration: "40 min" },
            { name: "Intervals", sets: 5, duration: "4 min", rest: "3 min wandelrust", notes: "VO2max @ 90-95%" },
          ],
        },
        {
          day: 7,
          title: "Zone 1",
          type: "run",
          difficulty: "easy",
          duration: "42 min",
          description: "Rustige Zone 1 na zware week.",
          exercises: [
            { name: "Zone 1 Run", duration: "32 min", notes: "6:15/km" },
          ],
        },
      ],
    },
    // WEEK 9 - Piek Week 6 (Tweede simulatie)
    {
      phase: "Piek",
      days: [
        {
          day: 2,
          title: "Kracht Onderhoud Hoog",
          type: "strength",
          difficulty: "hard",
          duration: "65 min",
          description: "Kracht onderhoud op hoog niveau. 84% 1RM. Racepace scherpst ooit.",
          exercises: [
            { name: "Warming-up gym", duration: "8 min", notes: "Standaard: roeier, clamshells, hip thrusts, dead bugs, inchworms" },
            { name: "Back Squat", sets: 4, reps: "3", weight: "84% 1RM", rest: "2.5 min" },
            { name: "Romanian Deadlift", sets: 4, reps: "4", weight: "Zwaar", rest: "2.5 min" },
            { name: "Hip Thrust", sets: 4, reps: "8", rest: "90 sec", notes: "1.5 rep methode" },
            { name: "Sled Push", sets: 4, distance: "25m", weight: "Zwaarst tot nu toe", rest: "90 sec" },
            { name: "Sled Pull", sets: 4, distance: "25m", weight: "Zwaarst tot nu toe", rest: "90 sec" },
            { name: "Farmers Carry", sets: 4, distance: "50m", weight: "Racegewicht", rest: "60 sec" },
            { name: "Walking Lunges", sets: 3, reps: "10/been", rest: "60 sec" },
            { name: "Cooling-down gym", duration: "6 min", notes: "Standaard: pigeon pose, heupflexor, kuit, child's pose" },
          ],
        },
        {
          day: 4,
          title: "Volledige Race-Simulatie #2",
          type: "hyrox",
          difficulty: "hard",
          duration: "75 min",
          description: "Tweede volledige simulatie. Racetempo, negatieve splits. Vergelijk met sim #1.",
          exercises: [
            { name: "Warming-up lopen", duration: "10 min", notes: "Standaard: wandelen, leg swings, A/B-skip, strides" },
            { name: "Run", distance: "1 km", notes: "Start 5:35/km" },
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
            { name: "Run", distance: "1 km", notes: "Eindig 5:15/km. Negatieve splits." },
            { name: "Wall Balls", reps: "100", weight: "9kg" },
            { name: "Cooling-down lopen", duration: "8 min", notes: "Standaard: uitlopen, stretches, pigeon pose" },
          ],
        },
        {
          day: 6,
          title: "Racepace Piek",
          type: "run",
          difficulty: "moderate",
          duration: "55 min",
          description: "Racepace scherpst ooit.",
          exercises: [
            { name: "Inlopen", duration: "10 min" },
            { name: "Intervals", sets: 5, distance: "1 km", rest: "90 sec", notes: "@ 5:05-5:15/km" },
            { name: "Intervals", sets: 1, distance: "400m", notes: "All-out" },
            { name: "Uitlopen", duration: "5 min" },
          ],
        },
        {
          day: 7,
          title: "Zone 1",
          type: "run",
          difficulty: "easy",
          duration: "42 min",
          description: "Rustige Zone 1 na sim #2.",
          exercises: [
            { name: "Zone 1 Run", duration: "32 min", notes: "6:12/km" },
          ],
        },
      ],
    },
    // WEEK 10 - Piek Week 7 (Zwaarste week)
    {
      phase: "Piek",
      days: [
        {
          day: 2,
          title: "Kracht Zwaarste Week Ooit",
          type: "strength",
          difficulty: "hard",
          duration: "72 min",
          description: "Zwaarste krachtsessie ooit. 87% 1RM. Alles op het maximum.",
          exercises: [
            { name: "Warming-up gym", duration: "8 min", notes: "Standaard: roeier, clamshells, hip thrusts, dead bugs, inchworms" },
            { name: "Back Squat", sets: 5, reps: "3", weight: "87% 1RM", rest: "3 min" },
            { name: "Romanian Deadlift", sets: 4, reps: "3", weight: "Zwaarst ooit", rest: "3 min" },
            { name: "Bulgarian Split Squat", sets: 4, reps: "4/been", weight: "Maximaal gewicht", rest: "2 min" },
            { name: "Hip Thrust", sets: 5, reps: "6", weight: "Zwaarst", rest: "2 min", notes: "2 sec hold" },
            { name: "Sled Push", sets: 4, distance: "25m", weight: "Zwaarst ooit", rest: "90 sec" },
            { name: "Sled Pull", sets: 4, distance: "25m", weight: "Zwaarst ooit", rest: "90 sec" },
            { name: "Farmers Carry", sets: 5, distance: "60m", weight: "15% boven racegewicht", rest: "60 sec" },
            { name: "Walking Lunges", sets: 4, reps: "10/been", weight: "Zwaarst", rest: "60 sec" },
            { name: "Cooling-down gym", duration: "6 min", notes: "Standaard: pigeon pose, heupflexor, kuit, child's pose" },
          ],
        },
        {
          day: 4,
          title: "AMRAP Blokken",
          type: "hyrox",
          difficulty: "hard",
          duration: "60 min",
          description: "AMRAP blokken met mannengewichten. Noteer ronden.",
          exercises: [
            { name: "Warming-up lopen", duration: "10 min", notes: "Standaard: wandelen, leg swings, A/B-skip, strides" },
            { name: "Rowing 300m + 20 Wall Balls 9kg + 10 BBJ", duration: "15 min", notes: "AMRAP Blok 1: zo veel mogelijk rondes. Noteer ronden." },
            { name: "Actief Herstel", duration: "3 min" },
            { name: "Run 1km + Sled Push 25m + Sled Pull 25m + Farmers Carry 50m", duration: "15 min", notes: "AMRAP Blok 2: zo veel mogelijk rondes. Noteer ronden." },
            { name: "SkiErg", distance: "500m", notes: "Finisher - zo snel mogelijk. 2 min rust voor finisher." },
            { name: "Cooling-down lopen", duration: "8 min", notes: "Standaard: uitlopen, stretches, pigeon pose" },
          ],
        },
        {
          day: 6,
          title: "VO2max + Drempel Combo",
          type: "run",
          difficulty: "hard",
          duration: "62 min",
          description: "VO2max en drempel gecombineerd. Zwaarste loopweek.",
          exercises: [
            { name: "Inlopen", duration: "10 min" },
            { name: "Intervals", sets: 5, duration: "4 min", rest: "3 min", notes: "VO2max @ 90-95%" },
            { name: "Intervals", sets: 4, distance: "1 km", rest: "90 sec", notes: "Drempel @ 4:50-5:00/km" },
            { name: "Uitlopen", duration: "5 min" },
          ],
        },
        {
          day: 7,
          title: "Zone 1",
          type: "run",
          difficulty: "easy",
          duration: "45 min",
          description: "Rustige Zone 1 na zwaarste week.",
          exercises: [
            { name: "Zone 1 Run", duration: "35 min", notes: "6:10/km" },
          ],
        },
      ],
    },
    // WEEK 11 - Piek Week 8 (Deload)
    {
      phase: "Piek",
      days: [
        {
          day: 2,
          title: "Kracht Deload",
          type: "strength",
          difficulty: "easy",
          duration: "48 min",
          description: "Deload week. Herstel en kracht onderhoud.",
          exercises: [
            { name: "Warming-up gym", duration: "8 min", notes: "Standaard: roeier, clamshells, hip thrusts, dead bugs, inchworms" },
            { name: "Back Squat", sets: 3, reps: "3", weight: "80% 1RM", rest: "2 min" },
            { name: "Romanian Deadlift", sets: 3, reps: "4", rest: "90 sec" },
            { name: "Hip Thrust", sets: 3, reps: "8", rest: "90 sec" },
            { name: "Sled Push", sets: 3, distance: "20m", weight: "Racegewicht", rest: "90 sec" },
            { name: "Farmers Carry", sets: 3, distance: "35m", rest: "60 sec" },
            { name: "Cooling-down gym", duration: "6 min", notes: "Standaard: pigeon pose, heupflexor, kuit, child's pose" },
          ],
        },
        {
          day: 4,
          title: "Piramide Licht",
          type: "hyrox",
          difficulty: "easy",
          duration: "45 min",
          description: "Lichte piramide op 80% tempo. Deload week.",
          exercises: [
            { name: "Piramide: 5 BBJ + 10 Wall Balls 9kg + Sled Pull 20m + 200m Run (op en neer)", sets: 3, rest: "2 min", notes: "80% tempo. Neer = omgekeerde volgorde." },
          ],
        },
        {
          day: 6,
          title: "Racepace Opfrissing",
          type: "run",
          difficulty: "moderate",
          duration: "40 min",
          description: "Voelt makkelijker dan week 9? Dan op schema.",
          exercises: [
            { name: "Inlopen", duration: "10 min" },
            { name: "Intervals", sets: 3, distance: "1 km", rest: "90 sec", notes: "@ 5:10/km" },
            { name: "Uitlopen", duration: "5 min" },
          ],
        },
        {
          day: 7,
          title: "Zone 1",
          type: "run",
          difficulty: "easy",
          duration: "30 min",
          description: "Rustige Zone 1. Deload week.",
          exercises: [
            { name: "Zone 1 Run", duration: "22 min", notes: "6:25/km" },
          ],
        },
      ],
    },
    // WEEK 12 - Piek Week 9 (Derde simulatie + PR poging)
    {
      phase: "Piek",
      days: [
        {
          day: 2,
          title: "Kracht Finale Piek",
          type: "strength",
          difficulty: "hard",
          duration: "72 min",
          description: "Zwaarste krachtsessie ooit. Zelfde als week 10 - alles eruit.",
          exercises: [
            { name: "Warming-up gym", duration: "8 min", notes: "Standaard: roeier, clamshells, hip thrusts, dead bugs, inchworms" },
            { name: "Back Squat", sets: 5, reps: "3", weight: "87% 1RM", rest: "3 min" },
            { name: "Romanian Deadlift", sets: 4, reps: "3", weight: "Zwaarst ooit", rest: "3 min" },
            { name: "Bulgarian Split Squat", sets: 4, reps: "4/been", weight: "Maximaal gewicht", rest: "2 min" },
            { name: "Hip Thrust", sets: 5, reps: "6", weight: "Zwaarst", rest: "2 min", notes: "2 sec hold" },
            { name: "Sled Push", sets: 4, distance: "25m", weight: "Zwaarst ooit", rest: "90 sec" },
            { name: "Sled Pull", sets: 4, distance: "25m", weight: "Zwaarst ooit", rest: "90 sec" },
            { name: "Farmers Carry", sets: 5, distance: "60m", weight: "15% boven racegewicht", rest: "60 sec" },
            { name: "Walking Lunges", sets: 4, reps: "10/been", weight: "Zwaarst", rest: "60 sec" },
            { name: "Cooling-down gym", duration: "6 min", notes: "Standaard: pigeon pose, heupflexor, kuit, child's pose" },
          ],
        },
        {
          day: 4,
          title: "Volledige Race-Simulatie #3 PR",
          type: "hyrox",
          difficulty: "hard",
          duration: "80 min",
          description: "Derde en laatste volledige simulatie. PR poging. Alles eruit, negatieve splits. Schrijf race-strategie op na afloop.",
          exercises: [
            { name: "Warming-up lopen", duration: "10 min", notes: "Standaard: wandelen, leg swings, A/B-skip, strides" },
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
            { name: "Wall Balls", reps: "100", weight: "9kg" },
            { name: "Cooling-down lopen", duration: "8 min", notes: "Standaard: uitlopen, stretches, pigeon pose" },
          ],
        },
        {
          day: 6,
          title: "Laatste Lange Duurloop",
          type: "run",
          difficulty: "easy",
          duration: "62 min",
          description: "Laatste lange Zone 1 run voor de taper.",
          exercises: [
            { name: "Zone 1 Run", duration: "50 min", notes: "6:10/km" },
          ],
        },
        {
          day: 7,
          title: "Zone 1",
          type: "run",
          difficulty: "easy",
          duration: "40 min",
          description: "Rustige Zone 1.",
          exercises: [
            { name: "Zone 1 Run", duration: "30 min", notes: "6:15/km" },
          ],
        },
      ],
    },
    // WEEK 13 - Piek Week 10 (Taper start)
    {
      phase: "Piek",
      days: [
        {
          day: 2,
          title: "Kracht Taper Activatie",
          type: "strength",
          difficulty: "moderate",
          duration: "45 min",
          description: "Volume -50%, intensiteit hoog. Taper start. Stop voor falen.",
          exercises: [
            { name: "Warming-up gym", duration: "8 min", notes: "Standaard: roeier, clamshells, hip thrusts, dead bugs, inchworms" },
            { name: "Back Squat", sets: 3, reps: "3", weight: "83% 1RM", rest: "2.5 min", notes: "Stop voor falen" },
            { name: "Romanian Deadlift", sets: 2, reps: "4", weight: "Onderhoud", rest: "2 min" },
            { name: "Hip Thrust", sets: 2, reps: "8", weight: "Activatie", rest: "90 sec" },
            { name: "Sled Push", sets: 2, distance: "20m", weight: "Racegewicht", rest: "90 sec" },
            { name: "Farmers Carry", sets: 2, distance: "30m", weight: "Racegewicht", rest: "60 sec" },
            { name: "Cooling-down gym", duration: "6 min", notes: "Standaard: pigeon pose, heupflexor, kuit, child's pose" },
          ],
        },
        {
          day: 4,
          title: "Race-Activatie Hyrox",
          type: "hyrox",
          difficulty: "moderate",
          duration: "40 min",
          description: "Racetempo activatie. Voelt makkelijk = correct.",
          exercises: [
            { name: "Run 1km + SkiErg 500m", notes: "Racetempo" },
            { name: "Run 1km + Sled Push", notes: "Racetempo" },
            { name: "Run 1km + 25 Wall Balls 9kg", notes: "Racetempo. Voelt makkelijk = correct." },
          ],
        },
        {
          day: 6,
          title: "Racepace Activatie",
          type: "run",
          difficulty: "moderate",
          duration: "38 min",
          description: "Racepace activatie met versnellingen.",
          exercises: [
            { name: "Inlopen", duration: "8 min" },
            { name: "Intervals", sets: 3, distance: "1 km", rest: "90 sec", notes: "@ 5:10-5:15/km" },
            { name: "Intervals", sets: 3, distance: "200m", notes: "Versnelling @ 4:20/km" },
            { name: "Uitlopen", duration: "5 min" },
          ],
        },
        {
          day: 7,
          title: "Zone 1 Ultra Rustig",
          type: "run",
          difficulty: "easy",
          duration: "25 min",
          description: "Ultra rustig. Taper modus.",
          exercises: [
            { name: "Zone 1 Run", duration: "18 min", notes: "6:20/km" },
          ],
        },
      ],
    },
    // WEEK 14 - Taper Week 11
    {
      phase: "Taper",
      days: [
        {
          day: 2,
          title: "Kracht Activatie",
          type: "strength",
          difficulty: "moderate",
          duration: "40 min",
          description: "Volume -50%, intensiteit hoog. Vertrouwen opbouwen.",
          exercises: [
            { name: "Warming-up gym", duration: "8 min", notes: "Standaard: roeier, clamshells, hip thrusts, dead bugs, inchworms" },
            { name: "Back Squat", sets: 3, reps: "3", weight: "82% 1RM", rest: "2 min" },
            { name: "Romanian Deadlift", sets: 2, reps: "4", weight: "Onderhoud", rest: "90 sec" },
            { name: "Hip Thrust", sets: 2, reps: "8", rest: "90 sec" },
            { name: "Sled Push", sets: 2, distance: "20m", weight: "Racegewicht", rest: "90 sec" },
            { name: "Farmers Carry", sets: 2, distance: "30m", weight: "Racegewicht", rest: "60 sec" },
            { name: "Cooling-down gym", duration: "6 min", notes: "Standaard: pigeon pose, heupflexor, kuit, child's pose" },
          ],
        },
        {
          day: 4,
          title: "Activatie Sim Kort",
          type: "hyrox",
          difficulty: "easy",
          duration: "38 min",
          description: "Korte activatie. Moet makkelijk voelen - als zwaar: te hard gegaan.",
          exercises: [
            { name: "Run 1km + Sled Push + Farmers Carry 50m + 20 Wall Balls 9kg", sets: 2, notes: "Racetempo. Moet makkelijk voelen." },
          ],
        },
        {
          day: 6,
          title: "Racepace Kort",
          type: "run",
          difficulty: "moderate",
          duration: "32 min",
          description: "Korte racepace activatie met versnellingen.",
          exercises: [
            { name: "Inlopen", duration: "8 min" },
            { name: "Intervals", sets: 2, distance: "1 km", rest: "90 sec", notes: "@ 5:10/km" },
            { name: "Intervals", sets: 3, distance: "200m", notes: "Versnelling @ 4:20/km" },
            { name: "Uitlopen", duration: "5 min" },
          ],
        },
        {
          day: 7,
          title: "Laatste Zone 1",
          type: "run",
          difficulty: "easy",
          duration: "22 min",
          description: "Laatste Zone 1 run voor race week.",
          exercises: [
            { name: "Zone 1 Run", duration: "15 min", notes: "6:25/km" },
          ],
        },
      ],
    },
    // WEEK 15 - Race Week 12
    {
      phase: "Race Week",
      days: [
        {
          day: 2,
          title: "Laatste Kracht Activatie",
          type: "strength",
          difficulty: "easy",
          duration: "30 min",
          description: "Allerlaatste kracht. Na dinsdag: geen zware training meer. Woensdag wandelen 20 min.",
          exercises: [
            { name: "Warming-up gym", duration: "8 min", notes: "Standaard: roeier, clamshells, hip thrusts, dead bugs, inchworms" },
            { name: "Back Squat", sets: 2, reps: "3", weight: "79% 1RM", rest: "2 min" },
            { name: "Hip Thrust", sets: 2, reps: "8", rest: "90 sec" },
            { name: "Sled Push", sets: 2, distance: "20m", weight: "Racegewicht", rest: "90 sec" },
            { name: "Farmers Carry", sets: 2, distance: "30m", weight: "Racegewicht", rest: "60 sec" },
            { name: "Cooling-down gym", duration: "6 min", notes: "Standaard: pigeon pose, heupflexor, kuit, child's pose" },
          ],
        },
        {
          day: 4,
          title: "Race-Activatie Run",
          type: "run",
          difficulty: "easy",
          duration: "25 min",
          description: "Laatste run voor race day. Benen losgooien.",
          exercises: [
            { name: "Inlopen", duration: "5 min" },
            { name: "Intervals", sets: 2, distance: "1 km", rest: "2 min", notes: "@ 5:15/km" },
            { name: "Intervals", sets: 3, distance: "200m", notes: "Versnelling @ 4:20/km" },
            { name: "Uitlopen", duration: "5 min" },
          ],
        },
        {
          day: 6,
          title: "RACE DAY",
          type: "hyrox",
          difficulty: "race",
          duration: "60-80 min",
          description: "Hyrox Solo sub 1:20. Looptempo 5:25-5:30/km gemiddeld, negatieve splits. Ronde 1-4: 5:35/km. Ronde 5-8: 5:15/km. Aanvallen: sled push, sled pull, farmers carry. Consistent houden: ski erg, roeier, wallballs. Getraind op 9kg wallballs, race 6kg voelt makkelijk. Pijn in ronde 6-7 hoort erbij. Sub 1:25 in laatste sim = sub 1:20 op race-dag.",
          exercises: [
            { name: "Hyrox Race", notes: "8x 1km run + 8 stations. Negatieve splits: ronde 1-4 op 5:35/km, ronde 5-8 op 5:15/km. Aanvallen op sled push, sled pull, farmers carry. Wallballs getraind op 9kg, race op 6kg." },
          ],
        },
      ],
    },
  ];

  let bonusIndex = 0;
  weekPlans.forEach((weekPlan, weekIndex) => {
    weekPlan.days.forEach((day) => {
      const exercises: Exercise[] = day.exercises.map((ex) => ({
        ...ex,
        videoUrl: ex.videoUrl ?? exerciseVideos[ex.name],
      }));
      if (day.type === "strength") {
        exercises.push({ ...bonusPool[bonusIndex % bonusPool.length] });
        bonusIndex++;
      }
      workouts.push({
        ...day,
        id: `w${weekIndex + 1}d${day.day}`,
        week: weekIndex + 1,
        exercises,
      });
    });
  });

  return workouts;
}

export const weekPhases = [
  "Opbouw",      // 1
  "Opbouw",      // 2
  "Opbouw",      // 3
  "Piek",        // 4
  "Piek",        // 5
  "Piek",        // 6
  "Piek",        // 7
  "Piek",        // 8
  "Piek",        // 9
  "Piek",        // 10
  "Piek",        // 11
  "Piek",        // 12
  "Piek",        // 13
  "Taper",       // 14
  "Race Week",   // 15
];

export const dayNames = ["", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
