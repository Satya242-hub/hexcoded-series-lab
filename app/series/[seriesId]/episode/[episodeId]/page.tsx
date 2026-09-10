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

const defaultEpisodes: Episode[] = [
  {
    id: 1,
    title: "The Signal",
    description:
      "Maya discovers a mysterious signal in the city.",
    duration: "15–30 sec",
  },
  {
    id: 2,
    title: "The Message",
    description:
      "The signal reveals a message meant specifically for Maya.",
    duration: "15–30 sec",
  },
  {
    id: 3,
    title: "The Source",
    description:
      "Maya follows the signal to an abandoned facility.",
    duration: "30–60 sec",
  },
  {
    id: 4,
    title: "The Hidden Door",
    description:
      "Maya follows the mysterious signal into an abandoned subway station and discovers a hidden door glowing with the same symbol as the signal.",
    duration: "30–60 sec",
  },
];

const defaultSeriesDNA: SeriesDNA = {
  seriesName: "The Last Signal",
  characterName: "Maya",
  appearance:
    "Maya has shoulder-length dark hair and an expressive face. She wears a dark jacket with simple neutral clothing.",
  faceReference: "demo-face-reference",
  fullBodyReference: null,
  aspectRatio: "9:16",
  visualLook: "Cinematic",
  colorGrade: "Neutral",
};

export default function EpisodePreview() {
  const params = useParams();

  const episodeId = Number(params.episodeId);

  const [episode, setEpisode] = useState<Episode | null>(null);
  const [seriesDNA, setSeriesDNA] =
    useState<SeriesDNA>(defaultSeriesDNA);

  const [regenerating, setRegenerating] = useState(false);
  const [regenerated, setRegenerated] = useState(false);

  useEffect(() => {
    const savedEpisodes = localStorage.getItem(
      "hexcoded-series-episodes"
    );

    const savedDNA = localStorage.getItem(
      "hexcoded-series-dna"
    );

    /*
     * Load the selected episode.
     * Use saved episodes first, then fall back to the demo episode
     * matching the URL.
     */
    if (savedEpisodes) {
      try {
        const allEpisodes: Episode[] =
          JSON.parse(savedEpisodes);

        const selectedEpisode = allEpisodes.find(
          (item) => item.id === episodeId
        );

        setEpisode(
          selectedEpisode ||
            defaultEpisodes.find(
              (item) => item.id === episodeId
            ) ||
            null
        );
      } catch {
        setEpisode(
          defaultEpisodes.find(
            (item) => item.id === episodeId
          ) || null
        );
      }
    } else {
      setEpisode(
        defaultEpisodes.find(
          (item) => item.id === episodeId
        ) || null
      );
    }

    /*
     * Load saved Series DNA.
     */
    if (savedDNA) {
      try {
        const parsedDNA = JSON.parse(savedDNA);

        setSeriesDNA({
          ...defaultSeriesDNA,
          ...parsedDNA,
        });
      } catch {
        setSeriesDNA(defaultSeriesDNA);
      }
    }
  }, [episodeId]);

  const episodeTitle =
    episode?.title || "Episode not found";

  const episodeDescription =
    episode?.description ||
    "This episode could not be found.";

  const episodeNumber =
    episode?.id || episodeId;

  const hasCharacter =
    Boolean(seriesDNA.characterName) &&
    Boolean(seriesDNA.faceReference);

  const hasAppearance =
    Boolean(seriesDNA.appearance);

  const hasVisualLook =
    Boolean(seriesDNA.visualLook);

  const hasColorGrade =
    Boolean(seriesDNA.colorGrade);

  const consistencyPassed =
    hasCharacter &&
    hasAppearance &&
    hasVisualLook &&
    hasColorGrade;

  const handleRegenerate = () => {
    setRegenerating(true);
    setRegenerated(false);

    setTimeout(() => {
      setRegenerating(false);
      setRegenerated(true);
    }, 1200);
  };

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
            {seriesDNA.seriesName} · Episode {episodeNumber}
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
              onClick={handleRegenerate}
              disabled={regenerating}
              className="flex-1 rounded-xl bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {regenerating
                ? "Regenerating..."
                : "Regenerate"}
            </button>
          </div>

          {/* REGENERATED STATUS */}
          {regenerated && (
            <div className="mt-4 rounded-xl border border-black bg-gray-50 p-4 text-sm">
              <p className="font-semibold">
                Regenerated ✓
              </p>

              <p className="mt-1 text-gray-600">
                Episode regenerated using the current Series DNA.
              </p>
            </div>
          )}
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
                  {seriesDNA.characterName}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Visual look
                </span>

                <span className="font-medium">
                  {seriesDNA.visualLook}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Color grade
                </span>

                <span className="font-medium">
                  {seriesDNA.colorGrade}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Aspect ratio
                </span>

                <span className="font-medium">
                  {seriesDNA.aspectRatio}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

