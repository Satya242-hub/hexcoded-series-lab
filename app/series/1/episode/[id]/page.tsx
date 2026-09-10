"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Episode = {
  id: number;
  title: string;
  description: string;
  duration: string;
};

type SeriesDNA = {
  seriesName: string;
  characterName: string;
  appearance: string;
  faceReference: string | null;
  fullBodyReference: string | null;
  aspectRatio: string;
  visualLook: string;
  colorGrade: string;
};

export default function EpisodePreview() {
  const params = useParams();

  const episodeId = Number(params.id);

  const [episode, setEpisode] = useState<Episode | null>(null);
  const [seriesDNA, setSeriesDNA] = useState<SeriesDNA | null>(null);

  useEffect(() => {
    const savedEpisodes = localStorage.getItem(
      "hexcoded-series-episodes"
    );

    const savedDNA = localStorage.getItem(
      "hexcoded-series-dna"
    );

    if (savedEpisodes) {
      try {
        const allEpisodes: Episode[] = JSON.parse(savedEpisodes);

        const selectedEpisode = allEpisodes.find(
          (item) => item.id === episodeId
        );

        if (selectedEpisode) {
          setEpisode(selectedEpisode);
        }
      } catch {
        console.error("Could not load episodes.");
      }
    }

    if (savedDNA) {
      try {
        setSeriesDNA(JSON.parse(savedDNA));
      } catch {
        console.error("Could not load Series DNA.");
      }
    }
  }, [episodeId]);

  const episodeTitle =
    episode?.title || "Episode not found";

  const episodeDescription =
    episode?.description ||
    "This episode could not be found.";

  const episodeNumber = episode?.id || episodeId;

  const hasCharacter =
    Boolean(seriesDNA?.characterName) ||
    Boolean(seriesDNA?.appearance);

  const hasAppearance =
    Boolean(seriesDNA?.appearance);

  const hasVisualLook =
    Boolean(seriesDNA?.visualLook);

  const hasColorGrade =
    Boolean(seriesDNA?.colorGrade);

  const consistencyPassed =
    hasCharacter &&
    hasAppearance &&
    hasVisualLook &&
    hasColorGrade;

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black">
      {/* HEADER */}
      <header className="border-b bg-white px-8 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <div className="text-xl font-semibold">
              HexCoded
            </div>

            <div className="text-xs text-gray-500">
              Series Lab
            </div>
          </div>

          <div className="text-sm text-gray-500">
            Episode Preview
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-8 py-10">
        {/* BACK */}
        <a
          href="/series/1"
          className="text-sm text-gray-500 hover:text-black"
        >
          ← Back to Series Studio
        </a>

        {/* TITLE */}
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            {seriesDNA?.seriesName || "The Last Signal"} · Episode{" "}
            {episodeNumber}
          </p>

          <h1 className="mt-2 text-3xl font-semibold">
            {episodeTitle}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
            {episodeDescription}
          </p>
        </div>

        {/* EPISODE PREVIEW */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Episode Preview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Series DNA applied to this episode
              </p>
            </div>

            <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
              Generated
            </span>
          </div>

          {/* IMAGE */}
          <div className="mt-8 flex justify-center">
            <img
              src="/episode-hidden-door.png"
              alt={`${episodeTitle} episode preview`}
              className="h-auto w-full max-w-3xl rounded-2xl shadow-sm"
            />
          </div>

          {/* ACTIONS */}
          <div className="mt-6 flex gap-3">
            <a
              href="/series/1"
              className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-center text-sm font-medium hover:bg-gray-50"
            >
              Back to Series
            </a>

            <button
              type="button"
              className="flex-1 rounded-xl bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Regenerate
            </button>
          </div>
        </div>

        {/* SERIES DNA CHECK */}
        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_320px]">
          {/* SERIES DNA APPLIED */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">
              Series DNA applied
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              The episode uses the identity defined for this series.
            </p>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <span className="text-sm text-gray-600">
                  Character appearance
                </span>

                <span className="text-sm font-semibold">
                  {hasCharacter ? "✓" : "—"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <span className="text-sm text-gray-600">
                  Clothing
                </span>

                <span className="text-sm font-semibold">
                  {hasAppearance ? "✓" : "—"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <span className="text-sm text-gray-600">
                  Visual style
                </span>

                <span className="text-sm font-semibold">
                  {hasVisualLook ? "✓" : "—"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                <span className="text-sm text-gray-600">
                  Color grade
                </span>

                <span className="text-sm font-semibold">
                  {hasColorGrade ? "✓" : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* CONSISTENCY CHECK */}
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">
              Consistency Check
            </h2>

            <div className="mt-5 rounded-xl border-2 border-black bg-gray-50 p-5">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-sm text-white">
                  {consistencyPassed ? "✓" : "!"}
                </div>

                <p className="text-sm font-semibold">
                  {consistencyPassed
                    ? "Passed"
                    : "Needs review"}
                </p>
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {consistencyPassed
                  ? "All required Series DNA identity settings are defined for this episode."
                  : "Some Series DNA identity settings are missing. Review the series setup before generating."}
              </p>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Character
                </span>

                <span className="font-medium">
                  {seriesDNA?.characterName || "Maya"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Visual look
                </span>

                <span className="font-medium">
                  {seriesDNA?.visualLook || "Cinematic"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Color grade
                </span>

                <span className="font-medium">
                  {seriesDNA?.colorGrade || "Neutral"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Aspect ratio
                </span>

                <span className="font-medium">
                  {seriesDNA?.aspectRatio || "9:16"}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

