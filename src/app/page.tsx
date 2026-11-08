"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BosuReminder from "@/components/BosuReminder";
import { generateTrainingPlan, weekPhases, getWeekDateRange, getWorkoutDate, getDaysUntilRaceDay, formatWorkoutDate, RACE_DAY } from "@/lib/data";
import { getCalendarWeek, getCompletedWorkouts, getSwappedWorkouts, getCustomWorkoutsForWeek, getRecentGymSessions, type CompletedGymSession } from "@/lib/storage";

const typeColors: Record<string, string> = {
  run: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  strength: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  hyrox: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  other: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300",
};

const typeLabels: Record<string, string> = {
  run: "Run",
  strength: "Kracht",
  hyrox: "Hyrox",
  other: "Anders",
};

export default function Home() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [weekCompleted, setWeekCompleted] = useState(0);
  const [weekTotal, setWeekTotal] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [recentSessions, setRecentSessions] = useState<CompletedGymSession[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const week = getCalendarWeek();
    setCurrentWeek(week);

    const workouts = generateTrainingPlan();
    const completed = getCompletedWorkouts();
    const customWorkouts = getCustomWorkoutsForWeek(week);
    const weekWorkouts = workouts.filter((w) => w.week === week);

    setWeekCompleted(
      weekWorkouts.filter((w) => completed.some((c) => c.workoutId === w.id)).length + customWorkouts.length
    );
    setWeekTotal(weekWorkouts.length + customWorkouts.length);
    setCompletedCount(completed.length);
    setTotalWorkouts(workouts.length);
    setRecentSessions(getRecentGymSessions(3));
  }, []);

  const workouts = generateTrainingPlan();
  const progress = totalWorkouts > 0 ? (completedCount / totalWorkouts) * 100 : 0;
  const daysUntilRace = getDaysUntilRaceDay();
  const weeksUntilRace = Math.floor(daysUntilRace / 7);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const completed = mounted ? getCompletedWorkouts() : [];
  const upcomingWorkouts = workouts
    .filter((w) => {
      const wDate = getWorkoutDate(w.week, w.day);
      return wDate >= today && !completed.some((c) => c.workoutId === w.id);
    })
    .sort((a, b) => {
      const dateA = getWorkoutDate(a.week, a.day);
      const dateB = getWorkoutDate(b.week, b.day);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 3);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 pt-8 pb-12">
      <header className="mb-8">
        <div className="mb-1 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500">
            <svg width="20" height="24" viewBox="0 0 100 122" fill="none">
              <path d="M30 50C28 40 26 28 28 20C32 6 68 6 72 20C74 28 72 40 70 50" stroke="white" strokeWidth="5" strokeLinecap="round"/>
              <path d="M38 48C37 42 36 30 38 24C40 16 60 16 62 24C64 30 63 42 62 48" stroke="white" strokeWidth="5" strokeLinecap="round"/>
              <path d="M30 50C22 52 10 62 10 78C10 96 28 112 50 112C72 112 90 96 90 78C90 62 78 52 70 50" stroke="white" strokeWidth="5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Gym</h1>
            <p className="text-base text-zinc-500 dark:text-zinc-400">18-weken plan</p>
          </div>
        </div>
      </header>

      <section className="mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-5 text-white shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-amber-100">
              Week {currentWeek} van 18
            </p>
            <h2 className="text-xl font-bold">{weekPhases[currentWeek - 1]}</h2>
            <p className="text-sm text-amber-100">{getWeekDateRange(currentWeek)}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{weekCompleted}/{weekTotal}</p>
            <p className="text-sm text-amber-100">workouts</p>
          </div>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-amber-700/40">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-1.5 text-sm text-amber-100">
          {completedCount} van {totalWorkouts} workouts voltooid
        </p>
      </section>

      <BosuReminder />

      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Aftellen naar race day
          </h2>
          <span className="text-sm text-zinc-400 dark:text-zinc-500">
            {RACE_DAY.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}
          </span>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-3 flex items-center gap-4">
            <div className="flex flex-col items-center rounded-xl bg-amber-50 px-4 py-2 dark:bg-amber-950/30">
              <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">{daysUntilRace}</span>
              <span className="text-xs font-medium text-amber-600/70 dark:text-amber-400/70">dagen</span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-zinc-50 px-4 py-2 dark:bg-zinc-800">
              <span className="text-3xl font-bold text-zinc-700 dark:text-zinc-200">{weeksUntilRace}</span>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">weken</span>
            </div>
          </div>
          {upcomingWorkouts.length > 0 && (
            <div className="border-t border-zinc-100 pt-3 dark:border-zinc-800">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Eerstvolgende trainingen</p>
              <div className="flex flex-col gap-2">
                {upcomingWorkouts.map((w) => {
                  const wDate = getWorkoutDate(w.week, w.day);
                  const isToday = wDate.getTime() === today.getTime();
                  return (
                    <Link
                      key={w.id}
                      href={`/workout/${w.id}`}
                      className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-zinc-50 active:scale-[0.98] dark:hover:bg-zinc-800"
                    >
                      <span className={`w-16 text-sm font-medium ${isToday ? "text-amber-600 dark:text-amber-400" : "text-zinc-400 dark:text-zinc-500"}`}>
                        {isToday ? "vandaag" : formatWorkoutDate(wDate)}
                      </span>
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[w.type]}`}>
                        {typeLabels[w.type] || w.type}
                      </span>
                      <span className="flex-1 truncate text-sm font-medium text-zinc-700 dark:text-zinc-200">
                        {w.title}
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-zinc-300 dark:text-zinc-600">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-base font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Snel starten
        </h2>
        <div className="flex flex-col gap-3">
          <Link
            href="/training"
            className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-amber-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-amber-700"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-amber-500">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <div className="flex-1">
              <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Weekplanning</span>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Bekijk, plan en pas je trainingen aan</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-sm font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                {weekCompleted}/{weekTotal}
              </span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-zinc-300 dark:text-zinc-600">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </Link>
          <Link
            href="/gym"
            className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-amber-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-amber-700"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-amber-500">
              <path d="M6.5 6.5h11" />
              <path d="M6.5 17.5h11" />
              <rect x="2" y="8.5" width="4" height="7" rx="1" />
              <rect x="18" y="8.5" width="4" height="7" rx="1" />
              <path d="M6.5 12h11" />
            </svg>
            <div className="flex-1">
              <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Gym training</span>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Start een kracht- of coach-training</p>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-zinc-300 dark:text-zinc-600">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>
      </section>

      {recentSessions.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-base font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Recente gym sessies
          </h2>
          <div className="flex flex-col gap-2">
            {recentSessions.map((s) => {
              const date = new Date(s.completedAt);
              const isToday = new Date().toDateString() === date.toDateString();
              const isYesterday = new Date(Date.now() - 86400000).toDateString() === date.toDateString();
              const dayLabel = isToday
                ? "Vandaag"
                : isYesterday
                  ? "Gisteren"
                  : date.toLocaleDateString("nl-NL", { weekday: "short", day: "numeric", month: "short" });
              const timeLabel = date.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
              return (
                <Link
                  key={s.id}
                  href={`/gym/session/${s.id}`}
                  className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 transition-all hover:border-zinc-300 hover:shadow-sm active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                >
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {s.trainingName}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {dayLabel} om {timeLabel} &middot; {s.exercises.length} oefeningen
                    </p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300 dark:text-zinc-600">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
