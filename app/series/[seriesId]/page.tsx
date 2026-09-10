"use client";

import { useEffect, useState } from "react";

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

type Episode = {
  id: number;
  title: string;
  description: string;
  duration: string;
};

export default function SeriesStudio() {
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [episodeIdea, setEpisodeIdea] = useState("");
  const [duration, setDuration] = useState("15–30 sec");

  const [seriesDNA, setSeriesDNA] = useState<SeriesDNA | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    const savedDNA = localStorage.getItem(
      "hexcoded-series-dna"
    );

    if (savedDNA) {
      try {
        setSeriesDNA(JSON.parse(savedDNA));
      } catch {
        console.error("Could not load Series DNA.");
      }
    }

    const savedEpisodes = localStorage.getItem(
      "hexcoded-series-episodes"
    );

    if (savedEpisodes) {
      try {
        setEpisodes(JSON.parse(savedEpisodes));
      } catch {
        console.error("Could not load episodes.");
      }
    } else {
      const demoEpisodes: Episode[] = [
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
      ];

      setEpisodes(demoEpisodes);

      localStorage.setItem(
        "hexcoded-series-episodes",
        JSON.stringify(demoEpisodes)
      );
    }
  }, []);

  const handleGenerateEpisode = () => {
    if (!episodeTitle.trim() || !episodeIdea.trim()) {
      return;
    }

    const newEpisode: Episode = {
      id: episodes.length + 1,
      title: episodeTitle.trim(),
      description: episodeIdea.trim(),
      duration,
    };

    const updatedEpisodes = [...episodes, newEpisode];

    setEpisodes(updatedEpisodes);

    localStorage.setItem(
      "hexcoded-series-episodes",
      JSON.stringify(updatedEpisodes)
    );

    localStorage.setItem(
      "hexcoded-current-episode",
      JSON.stringify(newEpisode)
    );

    setGenerated(true);
  };

  const latestEpisode =
    episodes[episodes.length - 1];

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black">
      {/* HEADER */}
      <header className="border-b bg-white px-8 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="text-xl font-semibold">
            HexCoded
          </div>

          <div className="text-sm text-gray-500">
            Series Lab · Series Studio
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-8 py-10">
        {/* BACK */}
        <a
          href="/"
          className="text-sm text-gray-500 hover:text-black"
        >
          ← Back to Your Series
        </a>

        {/* TITLE */}
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">
              {seriesDNA?.seriesName || "The Last Signal"}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Series Studio
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
              Series DNA ✓ Locked
            </span>

            <a
              href="/series/create"
              className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Edit Series DNA
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8">
            {/* SERIES DNA */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">
                Series DNA
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                The identity carried into future episode
                generations.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">
                    CHARACTER
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {seriesDNA?.characterName || "Maya"}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">
                    FACE REFERENCE
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {seriesDNA?.faceReference
                      ? "Added ✓"
                      : "Demo reference"}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">
                    VISUAL LOOK
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {seriesDNA?.visualLook || "Cinematic"}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">
                    COLOR GRADE
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {seriesDNA?.colorGrade || "Neutral"}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">
                    ASPECT RATIO
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {seriesDNA?.aspectRatio || "9:16"}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">
                    APPEARANCE & CLOTHING
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {seriesDNA?.appearance || "Defined"}
                  </p>
                </div>
              </div>
            </div>

            {/* GENERATE EPISODE */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">
                Generate Episode
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Create a new episode using your locked Series DNA.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="text-sm font-medium">
                    Episode title
                  </label>

                  <input
                    type="text"
                    value={episodeTitle}
                    onChange={(e) =>
                      setEpisodeTitle(e.target.value)
                    }
                    placeholder="Example: The Hidden Door"
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Episode idea
                  </label>

                  <textarea
                    value={episodeIdea}
                    onChange={(e) =>
                      setEpisodeIdea(e.target.value)
                    }
                    placeholder="Describe what happens in this episode..."
                    className="mt-2 h-32 w-full resize-none rounded-xl border border-gray-300 p-4 text-sm outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Duration
                  </label>

                  <select
                    value={duration}
                    onChange={(e) =>
                      setDuration(e.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm"
                  >
                    <option>15–30 sec</option>
                    <option>30–60 sec</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerateEpisode}
                  disabled={
                    !episodeTitle.trim() ||
                    !episodeIdea.trim()
                  }
                  className="w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  Generate Episode
                </button>
              </div>

              {generated && latestEpisode && (
                <div className="mt-6 rounded-xl border-2 border-black bg-gray-50 p-5">
                  <p className="text-sm font-semibold">
                    Episode generated ✓
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    Series DNA applied to this episode.
                  </p>

                  <div className="mt-4 rounded-xl bg-white p-4">
                    <p className="text-xs font-medium text-gray-500">
                      EPISODE {latestEpisode.id}
                    </p>

                    <p className="mt-1 text-base font-semibold">
                      {latestEpisode.title}
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                      {latestEpisode.description}
                    </p>
                  </div>

                  <a
                    href={`/series/1/episode/${latestEpisode.id}`}
                    className="mt-4 block w-full rounded-xl border-2 border-black px-4 py-3 text-center text-sm font-semibold hover:bg-black hover:text-white"
                  >
                    View Episode
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* EPISODES */}
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-lg font-semibold">
              Episodes
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Episodes created in this series.
            </p>

            <div className="mt-5 space-y-3">
              {episodes.map((episode) => (
                <div
                  key={episode.id}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <p className="text-xs font-medium text-gray-500">
                    EPISODE {episode.id}
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {episode.title}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    {episode.description}
                  </p>

                  <p className="mt-3 text-xs text-gray-400">
                    {episode.duration}
                  </p>

                  <a
                    href={`/series/1/episode/${episode.id}`}
                    className="mt-3 inline-block text-xs font-medium text-black underline"
                  >
                    Open episode
                  </a>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

