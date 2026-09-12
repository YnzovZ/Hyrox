"use client";

import { useState } from "react";
import { stations, Station } from "@/lib/data";

function StationDetail({ station, onClose }: { station: Station; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center" onClick={onClose}>
      <div
        className="animate-fade-in w-full max-w-lg rounded-t-2xl bg-white p-6 sm:rounded-2xl dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <span className="text-3xl">{station.icon}</span>
            <h2 className="mt-1 text-xl font-bold">{station.name}</h2>
            <p className="text-sm text-amber-600 dark:text-amber-400">
              Station {station.id} {station.distance ? `- ${station.distance}` : ""}{station.reps ? `- ${station.reps} reps` : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-300">{station.description}</p>

        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Tips
        </h3>
        <ul className="mb-4 space-y-1.5">
          {station.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
              <span className="mt-0.5 text-amber-500">-</span>
              {tip}
            </li>
          ))}
        </ul>

        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Spiergroepen
        </h3>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {station.muscles.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {muscle}
            </span>
          ))}
        </div>

        {station.videoUrl && (
          <a
            href={station.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Bekijk tutorial video
          </a>
        )}
      </div>
    </div>
  );
}

export default function StationsPage() {
  const [selected, setSelected] = useState<Station | null>(null);

  return (
    <main className="mx-auto max-w-lg px-4 pt-8">
      <header className="mb-6">
        <h1 className="text-xl font-bold tracking-tight">Hyrox Stations</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          8 stations, 8 runs. Dit is wat je te wachten staat.
        </p>
      </header>

      <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          Elke Hyrox race bestaat uit 8 rondes van 1 km hardlopen, afgewisseld met 8 functionele workout stations.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {stations.map((station) => (
          <button
            key={station.id}
            onClick={() => setSelected(station)}
            className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 text-left transition-all hover:border-amber-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-amber-700"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-2xl dark:bg-zinc-800">
              {station.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                  Station {station.id}
                </span>
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                {station.name}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {station.distance || `${station.reps} reps`}
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-zinc-300 dark:text-zinc-600">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}
      </div>

      {selected && <StationDetail station={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
