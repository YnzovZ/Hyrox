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
  "Seated Dumbbell Press": "https://www.youtube.com/watch?v=qEwKCR5JCog",
  "Back Squat": "https://www.youtube.com/watch?v=ultWZbUMPL8",
  "Calf Raise Excentrisch": "https://www.youtube.com/watch?v=YMa3bQzUvZ8",
};

export interface ExerciseAlternative {
  name: string;
  notes: string;
  machine: boolean;
}

export const exerciseAlternatives: Record<string, ExerciseAlternative[]> = {
  "Back Squat": [
    { name: "Leg Press", notes: "Machine. Zelfde spiergroepen, minder belasting voor je rug.", machine: true },
    { name: "Hack Squat Machine", notes: "Machine. Squat-beweging met rugondersteuning.", machine: true },
    { name: "Goblet Squat", notes: "Kettlebell of dumbbell voor je borst. Lichter alternatief.", machine: false },
  ],
  "Goblet Squat": [
    { name: "Leg Press", notes: "Machine. Zelfde spiergroepen, minder belasting voor je rug.", machine: true },
    { name: "Hack Squat Machine", notes: "Machine. Squat-beweging met rugondersteuning.", machine: true },
    { name: "Dumbbell Squat", notes: "Dumbbells langs je zij, breed staan.", machine: false },
  ],
  "Romanian Deadlift": [
    { name: "Leg Curl Machine", notes: "Machine. Isoleert je hamstrings.", machine: true },
    { name: "Hyperextensie", notes: "Rug en hamstrings. Gebruik het apparaat in de gym.", machine: false },
    { name: "Dumbbell Romanian Deadlift", notes: "Zelfde beweging, dumbbells in plaats van barbell.", machine: false },
  ],
  "Overhead Press": [
    { name: "Shoulder Press Machine", notes: "Machine. Zelfde beweging, meer stabiliteit.", machine: true },
    { name: "Seated Dumbbell Press", notes: "Zittend op een bankje (60 graden), dumbbells omhoog drukken.", machine: false },
    { name: "Landmine Press", notes: "Barbell in de hoek, eenzijdig drukken.", machine: false },
  ],
  "Seated Dumbbell Press": [
    { name: "Shoulder Press Machine", notes: "Machine. Zelfde beweging, meer stabiliteit.", machine: true },
    { name: "Landmine Press", notes: "Barbell in de hoek, eenzijdig drukken.", machine: false },
    { name: "Lateral Raise", notes: "Dumbbells zijwaarts heffen. Lichter alternatief.", machine: false },
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
    // WEEK 1 - Base 1
    {
      phase: "Base 1",
      days: [
        {
          day: 2,
          title: "Easy Run + Core",
          type: "run",
          difficulty: "easy",
          duration: "40 min",
          description: "Start rustig. Bouw je aerobe basis op met een ontspannen duurloop.",
          exercises: [
            { name: "Easy Run", duration: "30 min", notes: "Praattempo, je moet kunnen praten" },
            { name: "Plank", sets: 3, duration: "30 sec", rest: "30 sec" },
            { name: "Dead Bug", sets: 3, reps: "8 per kant", rest: "30 sec" },
          ],
        },
        {
          day: 4,
          title: "Kracht Basis",
          type: "strength",
          difficulty: "easy",
          duration: "45 min",
          description: "Leer de basisbewegingen. Focus op techniek, niet op gewicht.",
          exercises: [
            { name: "Goblet Squat", sets: 3, reps: "10", rest: "60 sec" },
            { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "60 sec" },
            { name: "Seated Dumbbell Press", sets: 3, reps: "10", rest: "60 sec", notes: "Bankje op 60 graden" },
            { name: "Bent Over Row", sets: 3, reps: "10", rest: "60 sec" },
          ],
        },
        {
          day: 6,
          title: "Hyrox Kennismaking",
          type: "hyrox",
          difficulty: "easy",
          duration: "40 min",
          description: "Eerste kennismaking met de Hyrox-stations. Rustig tempo, focus op beweging.",
          exercises: [
            { name: "Run", distance: "1 km", notes: "Rustig tempo" },
            { name: "SkiErg", distance: "500m", notes: "Leer de beweging" },
            { name: "Run", distance: "1 km" },
            { name: "Rowing", distance: "500m", notes: "Focus op techniek" },
            { name: "Cool-down", duration: "5 min" },
          ],
        },
      ],
    },
    // WEEK 2 - Base 1
    {
      phase: "Base 1",
      days: [
        {
          day: 2,
          title: "Easy Run + Core",
          type: "run",
          difficulty: "easy",
          duration: "45 min",
          description: "Iets langer dan vorige week. Houd het praattempo aan.",
          exercises: [
            { name: "Easy Run", duration: "35 min", notes: "Praattempo" },
            { name: "Plank", sets: 3, duration: "40 sec", rest: "30 sec" },
            { name: "Dead Bug", sets: 3, reps: "10 per kant", rest: "30 sec" },
            { name: "Side Plank", sets: 2, duration: "25 sec per kant", rest: "30 sec" },
          ],
        },
        {
          day: 4,
          title: "Kracht + Farmers Walk",
          type: "strength",
          difficulty: "easy",
          duration: "50 min",
          description: "Basiskracht met je eerste Hyrox-specifieke oefening: de farmers walk.",
          exercises: [
            { name: "Goblet Squat", sets: 3, reps: "10", rest: "60 sec" },
            { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "60 sec" },
            { name: "Seated Dumbbell Press", sets: 3, reps: "10", rest: "60 sec", notes: "Bankje op 60 graden" },
            { name: "Bent Over Row", sets: 3, reps: "10", rest: "60 sec" },
            { name: "Farmers Walk", distance: "4x 30m", rest: "60 sec" },
          ],
        },
        {
          day: 6,
          title: "Hyrox Stations Leren",
          type: "hyrox",
          difficulty: "easy",
          duration: "45 min",
          description: "Twee nieuwe stations erbij: wall balls en burpee broad jumps.",
          exercises: [
            { name: "Run", distance: "1 km" },
            { name: "Wall Balls", reps: "15", notes: "Leer de timing van squat naar throw" },
            { name: "Run", distance: "1 km" },
            { name: "Burpee Broad Jumps", distance: "20m", notes: "Rustig ritme" },
            { name: "Run", distance: "1 km" },
            { name: "Cool-down", duration: "5 min" },
          ],
        },
      ],
    },
    // WEEK 3 - Base 1
    {
      phase: "Base 1",
      days: [
        {
          day: 2,
          title: "Intervals Intro",
          type: "run",
          difficulty: "moderate",
          duration: "40 min",
          description: "Je eerste interval training. Korte blokken net boven je comforttempo.",
          exercises: [
            { name: "Warm-up jog", duration: "10 min" },
            { name: "Intervals", sets: 4, distance: "400m", rest: "2 min", notes: "70-75% effort" },
            { name: "Cool-down jog", duration: "10 min" },
          ],
        },
        {
          day: 4,
          title: "Kracht Opbouw",
          type: "strength",
          difficulty: "moderate",
          duration: "50 min",
          description: "Iets meer volume. Je lichaam went aan de belasting.",
          exercises: [
            { name: "Back Squat", sets: 3, reps: "8", rest: "90 sec", notes: "Licht gewicht, techniek eerst" },
            { name: "Romanian Deadlift", sets: 3, reps: "10", rest: "60 sec" },
            { name: "Seated Dumbbell Press", sets: 3, reps: "10", rest: "60 sec", notes: "Bankje op 60 graden" },
            { name: "Lat Pulldown", sets: 3, reps: "10", rest: "60 sec" },
            { name: "Farmers Walk", distance: "4x 40m", rest: "60 sec" },
          ],
        },
        {
          day: 6,
          title: "Halve Hyrox Sim",
          type: "hyrox",
          difficulty: "moderate",
          duration: "50 min",
          description: "Vier stations achter elkaar met runs. Je eerste mini-simulatie.",
          exercises: [
            { name: "Run", distance: "1 km" },
            { name: "SkiErg", distance: "750m" },
            { name: "Run", distance: "1 km" },
            { name: "Rowing", distance: "750m" },
            { name: "Run", distance: "1 km" },
            { name: "Wall Balls", reps: "20" },
            { name: "Run", distance: "1 km" },
            { name: "Farmers Carry", distance: "100m" },
          ],
        },
      ],
    },
    // WEEK 4 - Base 2
    {
      phase: "Base 2",
      days: [
        {
          day: 2,
          title: "Tempo Run",
          type: "run",
          difficulty: "moderate",
          duration: "45 min",
          description: "Tempo run om je lactaatdrempel te verleggen. Comfortabel hard.",
          exercises: [
            { name: "Warm-up", duration: "10 min", notes: "Easy jog" },
            { name: "Tempo Run", duration: "20 min", notes: "Comfortabel hard, 70-75% effort" },
            { name: "Cool-down", duration: "10 min" },
          ],
        },
        {
          day: 4,
          title: "Push/Pull Kracht",
          type: "strength",
          difficulty: "moderate",
          duration: "50 min",
          description: "Focus op push- en pull-bewegingen die je nodig hebt bij Hyrox.",
          exercises: [
            { name: "Back Squat", sets: 3, reps: "8", rest: "90 sec" },
            { name: "Sled Push simulatie (Prowler)", distance: "4x 25m", rest: "90 sec" },
            { name: "Cable Row", sets: 3, reps: "12", rest: "60 sec" },
            { name: "Walking Lunges", sets: 3, reps: "10 per been", rest: "60 sec", weight: "Met dumbbells" },
            { name: "Lat Pulldown", sets: 3, reps: "12", rest: "60 sec" },
          ],
        },
        {
          day: 6,
          title: "Hyrox 5 Stations",
          type: "hyrox",
          difficulty: "moderate",
          duration: "55 min",
          description: "Vijf stations met runs. Volume gaat omhoog.",
          exercises: [
            { name: "Run", distance: "1 km" },
            { name: "SkiErg", distance: "1000m" },
            { name: "Run", distance: "1 km" },
            { name: "Burpee Broad Jumps", distance: "30m" },
            { name: "Run", distance: "1 km" },
            { name: "Rowing", distance: "1000m" },
            { name: "Run", distance: "1 km" },
            { name: "Sandbag Lunges", distance: "40m" },
            { name: "Run", distance: "1 km" },
            { name: "Wall Balls", reps: "30" },
          ],
        },
      ],
    },
    // WEEK 5 - Base 2
    {
      phase: "Base 2",
      days: [
        {
          day: 2,
          title: "Heuvel Repeats",
          type: "run",
          difficulty: "moderate",
          duration: "35 min",
          description: "Korte heuvelloopjes voor beenkracht. Gecontroleerd, geen sprints.",
          exercises: [
            { name: "Warm-up jog", duration: "10 min" },
            { name: "Hill Repeats", sets: 4, duration: "30 sec", rest: "2 min walk terug", notes: "75% effort, geen sprint" },
            { name: "Cool-down jog", duration: "10 min" },
          ],
        },
        {
          day: 4,
          title: "Kracht + Sled Work",
          type: "strength",
          difficulty: "moderate",
          duration: "55 min",
          description: "Sled push en pull erbij. Dit worden je sterkste wapens op race day.",
          exercises: [
            { name: "Trap Bar Deadlift", sets: 3, reps: "8", rest: "2 min" },
            { name: "Sled Push", distance: "4x 25m", rest: "90 sec" },
            { name: "Sled Pull (rope)", distance: "4x 25m", rest: "90 sec" },
            { name: "Bulgarian Split Squat", sets: 3, reps: "8 per been", rest: "60 sec" },
            { name: "Bent Over Row", sets: 3, reps: "10", rest: "60 sec" },
          ],
        },
        {
          day: 6,
          title: "Halve Sim met Sled",
          type: "hyrox",
          difficulty: "moderate",
          duration: "55 min",
          description: "Halve Hyrox-simulatie met sled push en pull erbij.",
          exercises: [
            { name: "Run", distance: "1 km" },
            { name: "SkiErg", distance: "1000m" },
            { name: "Run", distance: "1 km" },
            { name: "Sled Push", distance: "50m" },
            { name: "Run", distance: "1 km" },
            { name: "Sled Pull", distance: "50m" },
            { name: "Run", distance: "1 km" },
            { name: "Wall Balls", reps: "35" },
          ],
        },
      ],
    },
    // WEEK 6 - Base 2
    {
      phase: "Base 2",
      days: [
        {
          day: 2,
          title: "Intervals Opbouw",
          type: "run",
          difficulty: "moderate",
          duration: "45 min",
          description: "Meer intervals, iets langer. Je hardloopvorm groeit.",
          exercises: [
            { name: "Warm-up jog", duration: "10 min" },
            { name: "Intervals", sets: 5, distance: "400m", rest: "2 min", notes: "75% effort" },
            { name: "Cool-down jog", duration: "10 min" },
          ],
        },
        {
          day: 4,
          title: "Circuit Training",
          type: "strength",
          difficulty: "moderate",
          duration: "50 min",
          description: "Je eerste circuit. Iets minder rust, meer conditioneel werk.",
          exercises: [
            { name: "Wall Balls", reps: "12", notes: "Direct door naar volgende oefening" },
            { name: "Kettlebell Swings", reps: "12" },
            { name: "Push-ups", reps: "8" },
            { name: "Rowing", distance: "250m" },
            { name: "Step-ups", reps: "8 per been" },
            { name: "Plank", duration: "40 sec", notes: "3 rondes totaal, 2 min rust tussen rondes" },
          ],
        },
        {
          day: 6,
          title: "6-Station Sim",
          type: "hyrox",
          difficulty: "moderate",
          duration: "60 min",
          description: "Zes stations. Volume gaat omhoog, maar neem je rust.",
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
            { name: "Farmers Carry", distance: "150m" },
            { name: "Run", distance: "1 km" },
            { name: "Wall Balls", reps: "40" },
          ],
        },
      ],
    },
    // WEEK 7 - Build 1
    {
      phase: "Build 1",
      days: [
        {
          day: 2,
          title: "Long Run",
          type: "run",
          difficulty: "moderate",
          duration: "50 min",
          description: "Langere duurloop. Je aerobe motor moet stevig zijn voor 8 km op race day.",
          exercises: [
            { name: "Long Run", duration: "45 min", notes: "Praattempo, gelijkmatig" },
            { name: "Stretching", duration: "5 min" },
          ],
        },
        {
          day: 4,
          title: "Hyrox Kracht",
          type: "strength",
          difficulty: "moderate",
          duration: "55 min",
          description: "Compound lifts gericht op Hyrox-stations. Stevig maar controleerbaar gewicht.",
          exercises: [
            { name: "Trap Bar Deadlift", sets: 4, reps: "6", rest: "2 min" },
            { name: "Sled Push", distance: "4x 30m", rest: "2 min" },
            { name: "Sled Pull (rope)", distance: "4x 25m", rest: "90 sec" },
            { name: "Wall Ball", sets: 3, reps: "15", rest: "90 sec" },
            { name: "Sandbag Hold Squats", sets: 3, reps: "8", rest: "90 sec" },
          ],
        },
        {
          day: 6,
          title: "Run + Station Combos",
          type: "hyrox",
          difficulty: "moderate",
          duration: "50 min",
          description: "Combineer run intervals met stations. Wen aan de overgang run-station.",
          exercises: [
            { name: "Warm-up", duration: "10 min" },
            { name: "Run 1 km + SkiErg 500m", sets: 3, rest: "3 min", notes: "Stevig tempo" },
            { name: "Cool-down", duration: "10 min" },
          ],
        },
      ],
    },
    // WEEK 8 - Build 1
    {
      phase: "Build 1",
      days: [
        {
          day: 2,
          title: "Tempo Intervals",
          type: "run",
          difficulty: "moderate",
          duration: "45 min",
          description: "Langere tempo-intervallen. Je went aan hardlopen op inspanning.",
          exercises: [
            { name: "Warm-up", duration: "10 min" },
            { name: "Tempo Intervals", sets: 3, distance: "800m", rest: "2 min", notes: "75% effort" },
            { name: "Cool-down", duration: "10 min" },
          ],
        },
        {
          day: 4,
          title: "Kracht Circuit",
          type: "strength",
          difficulty: "moderate",
          duration: "50 min",
          description: "Kracht en uithoudingsvermogen combineren. Goed tempo, geen haast.",
          exercises: [
            { name: "Dumbbell Thruster", sets: 3, reps: "10", rest: "60 sec" },
            { name: "Step-ups", sets: 3, reps: "10 per been", rest: "60 sec" },
            { name: "Kettlebell Swings", sets: 3, reps: "12", rest: "60 sec" },
            { name: "Sled Push", distance: "3x 25m", rest: "90 sec" },
            { name: "Walking Lunges", sets: 3, reps: "10 per been", rest: "60 sec", weight: "Met dumbbells" },
          ],
        },
        {
          day: 6,
          title: "7-Station Sim",
          type: "hyrox",
          difficulty: "moderate",
          duration: "65 min",
          description: "Zeven van de acht stations. Neem je tijd, focus op technieken afwisselen.",
          exercises: [
            { name: "Run", distance: "1 km" },
            { name: "SkiErg", distance: "1000m" },
            { name: "Run", distance: "1 km" },
            { name: "Sled Push", distance: "50m" },
            { name: "Run", distance: "1 km" },
            { name: "Sled Pull", distance: "50m" },
            { name: "Run", distance: "1 km" },
            { name: "Burpee Broad Jumps", distance: "50m" },
            { name: "Run", distance: "1 km" },
            { name: "Rowing", distance: "1000m" },
            { name: "Run", distance: "1 km" },
            { name: "Farmers Carry", distance: "150m" },
            { name: "Run", distance: "1 km" },
            { name: "Wall Balls", reps: "50" },
          ],
        },
      ],
    },
    // WEEK 9 - Build 1
    {
      phase: "Build 1",
      days: [
        {
          day: 2,
          title: "Fartlek Run",
          type: "run",
          difficulty: "moderate",
          duration: "45 min",
          description: "Speelse tempoafwisseling. Harder als het goed voelt, rustiger als het moet.",
          exercises: [
            { name: "Fartlek Run", duration: "40 min", notes: "Wissel elke 3-5 min tussen easy en tempo" },
            { name: "Stretching", duration: "5 min" },
          ],
        },
        {
          day: 4,
          title: "Kracht Uithoudingsvermogen",
          type: "strength",
          difficulty: "moderate",
          duration: "50 min",
          description: "Hogere reps, focus op volhouden. Train je spieren om door te gaan.",
          exercises: [
            { name: "Back Squat", sets: 3, reps: "10", rest: "90 sec" },
            { name: "Hip Thrust", sets: 3, reps: "12", rest: "60 sec" },
            { name: "Cable Row", sets: 3, reps: "12", rest: "60 sec" },
            { name: "Seated Dumbbell Press", sets: 3, reps: "10", rest: "60 sec", notes: "Bankje op 60 graden" },
            { name: "Farmers Walk", distance: "4x 40m", rest: "60 sec" },
          ],
        },
        {
          day: 6,
          title: "Recovery + Mobiliteit",
          type: "recovery",
          difficulty: "easy",
          duration: "35 min",
          description: "Herstelweek na een drukke build-fase. Geef je lichaam rust.",
          exercises: [
            { name: "Easy Run", duration: "20 min", notes: "Heel makkelijk" },
            { name: "Yoga/Stretching", duration: "15 min" },
          ],
        },
      ],
    },
    // WEEK 10 - Build 2
    {
      phase: "Build 2",
      days: [
        {
          day: 2,
          title: "Easy Run + Core",
          type: "run",
          difficulty: "easy",
          duration: "40 min",
          description: "Fris starten na de hersteldag. Bouw rustig op.",
          exercises: [
            { name: "Easy Run", duration: "30 min", notes: "Praattempo" },
            { name: "Plank", sets: 3, duration: "45 sec", rest: "30 sec" },
            { name: "Side Plank", sets: 2, duration: "30 sec per kant", rest: "30 sec" },
            { name: "Dead Bug", sets: 3, reps: "10 per kant", rest: "30 sec" },
          ],
        },
        {
          day: 4,
          title: "Hyrox Kracht Stevig",
          type: "strength",
          difficulty: "moderate",
          duration: "55 min",
          description: "Stevige compound lifts. Controleerbaar gewicht, goede vorm.",
          exercises: [
            { name: "Trap Bar Deadlift", sets: 4, reps: "5", rest: "2 min" },
            { name: "Back Squat", sets: 3, reps: "8", rest: "90 sec" },
            { name: "Sled Push", distance: "4x 30m", rest: "2 min" },
            { name: "Sled Pull", distance: "4x 30m", rest: "2 min" },
            { name: "Wall Ball", sets: 3, reps: "20", rest: "90 sec" },
          ],
        },
        {
          day: 6,
          title: "Station Tempo Work",
          type: "hyrox",
          difficulty: "moderate",
          duration: "55 min",
          description: "Stations op een stevig tempo. Leer je pacing.",
          exercises: [
            { name: "Run", distance: "1 km", notes: "Stevig tempo" },
            { name: "SkiErg", distance: "1000m", notes: "Noteer je tijd" },
            { name: "Run", distance: "1 km" },
            { name: "Rowing", distance: "1000m", notes: "Noteer je tijd" },
            { name: "Run", distance: "1 km" },
            { name: "Wall Balls", reps: "50", notes: "Noteer je tijd" },
            { name: "Run", distance: "1 km" },
          ],
        },
      ],
    },
    // WEEK 11 - Build 2
    {
      phase: "Build 2",
      days: [
        {
          day: 2,
          title: "Tempo Run",
          type: "run",
          difficulty: "moderate",
          duration: "40 min",
          description: "Run op je beoogde wedstrijdtempo. Dit is het tempo voor race day.",
          exercises: [
            { name: "Warm-up", duration: "10 min" },
            { name: "Tempo Run", duration: "20 min", notes: "Het tempo dat je wil lopen op raceday, 75% effort" },
            { name: "Cool-down", duration: "10 min" },
          ],
        },
        {
          day: 4,
          title: "Krachtcircuit Hyrox",
          type: "strength",
          difficulty: "moderate",
          duration: "50 min",
          description: "Circuit training met Hyrox-oefeningen. Doorwerken met voldoende rust.",
          exercises: [
            { name: "Wall Balls", reps: "15", notes: "Direct door" },
            { name: "Kettlebell Swings", reps: "12" },
            { name: "Step-ups", reps: "8 per been" },
            { name: "Sled Push", distance: "25m" },
            { name: "Rowing", distance: "250m" },
            { name: "Push-ups", reps: "8", notes: "3 rondes totaal, 2 min rust tussen rondes" },
          ],
        },
        {
          day: 6,
          title: "Volle Hyrox Simulatie",
          type: "hyrox",
          difficulty: "hard",
          duration: "80 min",
          description: "Je eerste volledige simulatie. Alle 8 stations. Neem je tijd, noteer je totaaltijd.",
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
            { name: "Wall Balls", reps: "75" },
          ],
        },
      ],
    },
    // WEEK 12 - Build 2
    {
      phase: "Build 2",
      days: [
        {
          day: 2,
          title: "Recovery Run",
          type: "recovery",
          difficulty: "easy",
          duration: "35 min",
          description: "Herstel na de volle simulatie. Echt rustig aan doen.",
          exercises: [
            { name: "Easy Run", duration: "25 min", notes: "Heel makkelijk" },
            { name: "Foam Rolling", duration: "10 min" },
          ],
        },
        {
          day: 4,
          title: "Zwakke Stations",
          type: "hyrox",
          difficulty: "moderate",
          duration: "50 min",
          description: "Extra werk op de stations die je het lastigst vindt.",
          exercises: [
            { name: "Run 1 km + Sled Push 50m", sets: 2, rest: "3 min" },
            { name: "Run 1 km + Sandbag Lunges 50m", sets: 2, rest: "3 min" },
            { name: "Run 1 km + Wall Balls 30", sets: 1 },
          ],
        },
        {
          day: 6,
          title: "Recovery + Mobiliteit",
          type: "recovery",
          difficulty: "easy",
          duration: "30 min",
          description: "Rustweek na een zware build-fase. Laat je lichaam herstellen.",
          exercises: [
            { name: "Easy Run", duration: "15 min", notes: "Heel makkelijk" },
            { name: "Yoga/Stretching", duration: "15 min" },
          ],
        },
      ],
    },
    // WEEK 13 - Peak 1
    {
      phase: "Peak 1",
      days: [
        {
          day: 2,
          title: "Intervals Stevig",
          type: "run",
          difficulty: "moderate",
          duration: "40 min",
          description: "Korte intervallen met goed tempo. Scherp worden.",
          exercises: [
            { name: "Warm-up", duration: "10 min" },
            { name: "Intervals", sets: 6, distance: "200m", rest: "90 sec", notes: "80% effort" },
            { name: "Cool-down", duration: "10 min" },
          ],
        },
        {
          day: 4,
          title: "Station Time Trials",
          type: "hyrox",
          difficulty: "moderate",
          duration: "50 min",
          description: "Elk station op tijd. Meet je vooruitgang sinds week 10.",
          exercises: [
            { name: "SkiErg", distance: "1000m", notes: "Time trial, noteer je tijd" },
            { name: "Rest", duration: "3 min" },
            { name: "Rowing", distance: "1000m", notes: "Time trial" },
            { name: "Rest", duration: "3 min" },
            { name: "Wall Balls", reps: "50", notes: "Time trial" },
            { name: "Rest", duration: "3 min" },
            { name: "Burpee Broad Jumps", distance: "50m", notes: "Time trial" },
          ],
        },
        {
          day: 6,
          title: "Halve Sim Stevig",
          type: "hyrox",
          difficulty: "moderate",
          duration: "55 min",
          description: "Halve simulatie op een goed tempo. Geen record, wel focus.",
          exercises: [
            { name: "Run", distance: "1 km" },
            { name: "SkiErg", distance: "1000m" },
            { name: "Run", distance: "1 km" },
            { name: "Sled Push", distance: "50m" },
            { name: "Run", distance: "1 km" },
            { name: "Sled Pull", distance: "50m" },
            { name: "Run", distance: "1 km" },
            { name: "Rowing", distance: "1000m" },
          ],
        },
      ],
    },
    // WEEK 14 - Peak 1
    {
      phase: "Peak 1",
      days: [
        {
          day: 2,
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
          day: 4,
          title: "Kracht Fijn Slijpen",
          type: "strength",
          difficulty: "moderate",
          duration: "45 min",
          description: "Krachtig en efficiënt. Focus op Hyrox-specifieke bewegingen.",
          exercises: [
            { name: "Trap Bar Deadlift", sets: 3, reps: "6", rest: "2 min" },
            { name: "Medicine Ball Slam", sets: 3, reps: "8", rest: "60 sec" },
            { name: "Kettlebell Swings", sets: 3, reps: "12", rest: "60 sec" },
            { name: "Walking Lunges", sets: 3, reps: "10 per been", rest: "60 sec" },
            { name: "Dumbbell Thruster", sets: 3, reps: "10", rest: "60 sec" },
          ],
        },
        {
          day: 6,
          title: "Threshold Run + Stations",
          type: "hyrox",
          difficulty: "moderate",
          duration: "50 min",
          description: "Run op stevig tempo, direct gevolgd door stations. Race-simulatie light.",
          exercises: [
            { name: "Warm-up", duration: "5 min" },
            { name: "Tempo Run", duration: "12 min", notes: "Stevig, 75-80% effort" },
            { name: "SkiErg", distance: "1000m" },
            { name: "Sled Push", distance: "50m" },
            { name: "Rowing", distance: "1000m" },
            { name: "Wall Balls", reps: "40" },
            { name: "Cool-down", duration: "5 min" },
          ],
        },
      ],
    },
    // WEEK 15 - Peak 1
    {
      phase: "Peak 1",
      days: [
        {
          day: 2,
          title: "Tempo Intervals",
          type: "run",
          difficulty: "moderate",
          duration: "45 min",
          description: "Langere intervallen op stevig tempo. Je lichaam moet dit kennen.",
          exercises: [
            { name: "Warm-up", duration: "10 min" },
            { name: "Tempo Intervals", sets: 3, distance: "1 km", rest: "2 min", notes: "75-80% effort" },
            { name: "Cool-down", duration: "10 min" },
          ],
        },
        {
          day: 4,
          title: "Hyrox Kracht Verfijning",
          type: "strength",
          difficulty: "moderate",
          duration: "50 min",
          description: "Hyrox-specifieke kracht. Laatste stevige krachttraining voor de taper.",
          exercises: [
            { name: "Trap Bar Deadlift", sets: 3, reps: "6", rest: "2 min" },
            { name: "Sled Push", distance: "3x 50m", rest: "2 min" },
            { name: "Sled Pull", distance: "3x 50m", rest: "2 min" },
            { name: "Wall Ball", sets: 3, reps: "20", rest: "90 sec" },
            { name: "Sandbag Lunges", distance: "3x 30m", rest: "90 sec" },
          ],
        },
        {
          day: 6,
          title: "Laatste Volle Sim",
          type: "hyrox",
          difficulty: "hard",
          duration: "80 min",
          description: "Je laatste volledige simulatie. Geef alles, dit is je benchmark. Vergelijk met week 11.",
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
            { name: "Wall Balls", reps: "75" },
          ],
        },
      ],
    },
    // WEEK 16 - Peak 2
    {
      phase: "Peak 2",
      days: [
        {
          day: 2,
          title: "Recovery Run",
          type: "recovery",
          difficulty: "easy",
          duration: "35 min",
          description: "Herstel na de volle simulatie. Rustig aan doen.",
          exercises: [
            { name: "Easy Run", duration: "25 min", notes: "Echt ontspannen" },
            { name: "Foam Rolling", duration: "10 min" },
          ],
        },
        {
          day: 4,
          title: "Station Drills",
          type: "hyrox",
          difficulty: "moderate",
          duration: "45 min",
          description: "Verfijn je techniek per station. Focus op efficiency.",
          exercises: [
            { name: "SkiErg", distance: "500m", notes: "Techniek check" },
            { name: "Rest", duration: "2 min" },
            { name: "Sled Push", distance: "50m", notes: "Pacing oefenen" },
            { name: "Rest", duration: "2 min" },
            { name: "Sled Pull", distance: "50m" },
            { name: "Rest", duration: "2 min" },
            { name: "Burpee Broad Jumps", distance: "30m" },
            { name: "Rest", duration: "2 min" },
            { name: "Rowing", distance: "500m" },
            { name: "Rest", duration: "2 min" },
            { name: "Farmers Carry", distance: "100m" },
            { name: "Rest", duration: "2 min" },
            { name: "Sandbag Lunges", distance: "50m" },
            { name: "Rest", duration: "2 min" },
            { name: "Wall Balls", reps: "25" },
          ],
        },
        {
          day: 6,
          title: "Race Specifiek",
          type: "hyrox",
          difficulty: "moderate",
          duration: "50 min",
          description: "Combinaties van stations die je lastig vindt, op stevig tempo.",
          exercises: [
            { name: "Run 1 km + Sled Push 50m", sets: 2, rest: "3 min" },
            { name: "Run 1 km + Sandbag Lunges 50m", sets: 2, rest: "3 min" },
            { name: "Run 1 km + Wall Balls 30", sets: 1 },
          ],
        },
      ],
    },
    // WEEK 17 - Taper
    {
      phase: "Taper",
      days: [
        {
          day: 2,
          title: "Shakeout Run",
          type: "run",
          difficulty: "easy",
          duration: "30 min",
          description: "Lichte run met een paar strides om scherp te blijven.",
          exercises: [
            { name: "Easy Run", duration: "20 min" },
            { name: "Strides", sets: 4, distance: "100m", rest: "Walk back", notes: "Soepel en snel" },
          ],
        },
        {
          day: 4,
          title: "Station Touch",
          type: "hyrox",
          difficulty: "easy",
          duration: "35 min",
          description: "Korte, snelle doorloop van elk station. Halve afstanden. Houd het licht.",
          exercises: [
            { name: "SkiErg", distance: "500m" },
            { name: "Sled Push", distance: "25m" },
            { name: "Sled Pull", distance: "25m" },
            { name: "Burpee Broad Jumps", distance: "30m" },
            { name: "Rowing", distance: "500m" },
            { name: "Farmers Carry", distance: "100m" },
            { name: "Sandbag Lunges", distance: "50m" },
            { name: "Wall Balls", reps: "25" },
          ],
        },
        {
          day: 6,
          title: "Recovery",
          type: "recovery",
          difficulty: "easy",
          duration: "30 min",
          description: "Actief herstel. Licht bewegen, stretchen, mentaal voorbereiden.",
          exercises: [
            { name: "Light Walk", duration: "15 min" },
            { name: "Yoga/Stretching", duration: "15 min" },
          ],
        },
      ],
    },
    // WEEK 18 - Race Week
    {
      phase: "Race Week",
      days: [
        {
          day: 2,
          title: "Shakeout",
          type: "run",
          difficulty: "easy",
          duration: "20 min",
          description: "Heel lichte shakeout. Houd energie over voor vrijdag.",
          exercises: [
            { name: "Easy Jog", duration: "15 min" },
            { name: "Strides", sets: 3, distance: "80m", notes: "Ontspannen" },
          ],
        },
        {
          day: 4,
          title: "Mobiliteit",
          type: "recovery",
          difficulty: "easy",
          duration: "20 min",
          description: "Mobiliteitswerk. Houd alles soepel voor de race.",
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
          description: "Dit is het. 18 weken training komen samen. Geniet ervan, Ynzo.",
          exercises: [
            { name: "Hyrox Race", notes: "8x 1km run + 8 stations. Geniet ervan." },
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
  "Base 1",
  "Base 1",
  "Base 1",
  "Base 2",
  "Base 2",
  "Base 2",
  "Build 1",
  "Build 1",
  "Build 1",
  "Build 2",
  "Build 2",
  "Build 2",
  "Peak 1",
  "Peak 1",
  "Peak 1",
  "Peak 2",
  "Taper",
  "Race Week",
];

export const dayNames = ["", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
