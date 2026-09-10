"use client";

import { useEffect, useState } from "react";

type SavedSeriesDNA = {
  seriesName?: string;
  characterName?: string;
  appearance?: string;
  faceReference?: string | null;
  fullBodyReference?: string | null;
  aspectRatio?: string;
  visualLook?: string;
  colorGrade?: string;
};

export default function CreateSeries() {
  const [seriesName, setSeriesName] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [appearance, setAppearance] = useState("");

  const [faceFile, setFaceFile] = useState<File | null>(null);
  const [fullBodyFile, setFullBodyFile] = useState<File | null>(null);

  const [facePreview, setFacePreview] = useState<string | null>(null);
  const [fullBodyPreview, setFullBodyPreview] = useState<string | null>(null);

  const [savedFaceName, setSavedFaceName] = useState<string | null>(null);
  const [savedFullBodyName, setSavedFullBodyName] =
    useState<string | null>(null);

  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [visualLook, setVisualLook] = useState("Cinematic");
  const [colorGrade, setColorGrade] = useState("Neutral");

  const [created, setCreated] = useState(false);
  const [appearanceSaved, setAppearanceSaved] = useState(false);

  // LOAD SAVED SERIES DNA
  useEffect(() => {
    const savedDNA = localStorage.getItem("hexcoded-series-dna");

    if (!savedDNA) return;

    try {
      const data: SavedSeriesDNA = JSON.parse(savedDNA);

      setSeriesName(data.seriesName || "");
      setCharacterName(data.characterName || "");
      setAppearance(data.appearance || "");

      setSavedFaceName(data.faceReference || null);
      setSavedFullBodyName(data.fullBodyReference || null);

      setAspectRatio(data.aspectRatio || "9:16");
      setVisualLook(data.visualLook || "Cinematic");
      setColorGrade(data.colorGrade || "Neutral");
    } catch {
      console.error("Could not load saved Series DNA.");
    }
  }, []);

  const saveSeriesDNA = () => {
    const seriesDNA = {
      seriesName,
      characterName,
      appearance,
      faceReference: faceFile?.name || savedFaceName || null,
      fullBodyReference:
        fullBodyFile?.name || savedFullBodyName || null,
      aspectRatio,
      visualLook,
      colorGrade,
    };

    localStorage.setItem(
      "hexcoded-series-dna",
      JSON.stringify(seriesDNA)
    );

    return seriesDNA;
  };

  const handleFaceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFaceFile(file);
    setSavedFaceName(file.name);
    setFacePreview(URL.createObjectURL(file));
    setAppearanceSaved(false);
  };

  const handleFullBodyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFullBodyFile(file);
    setSavedFullBodyName(file.name);
    setFullBodyPreview(URL.createObjectURL(file));
    setAppearanceSaved(false);
  };

  const handleSaveAppearance = () => {
    saveSeriesDNA();
    setAppearanceSaved(true);
  };

  const handleCreateSeries = () => {
    saveSeriesDNA();
    setCreated(true);
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black">
      <header className="border-b bg-white px-8 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="text-xl font-semibold">
            HexCoded
          </div>

          <div className="text-sm text-gray-500">
            Series Lab
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-8 py-10">
        <a
          href="/"
          className="text-sm text-gray-500 hover:text-black"
        >
          ← Back to Your Series
        </a>

        <div className="mt-6">
          <h1 className="text-3xl font-semibold">
            Create Series
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Define your characters and visual identity once.
            HexCoded uses this as your Series DNA.
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {/* SERIES DETAILS */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">
                Series details
              </h2>

              <div className="mt-5">
                <label className="text-sm font-medium">
                  Series name
                </label>

                <input
                  type="text"
                  value={seriesName}
                  onChange={(e) => {
                    setSeriesName(e.target.value);
                    setAppearanceSaved(false);
                  }}
                  placeholder="Example: The Last Signal"
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>
            </div>

            {/* CHARACTER */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div>
                <h2 className="text-lg font-semibold">
                  Character
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Define the character that should remain consistent
                  across episodes.
                </p>
              </div>

              <div className="mt-5">
                <label className="text-sm font-medium">
                  Character name
                </label>

                <input
                  type="text"
                  value={characterName}
                  onChange={(e) => {
                    setCharacterName(e.target.value);
                    setAppearanceSaved(false);
                  }}
                  placeholder="Example: Maya"
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              {/* FACE REFERENCE */}
              <div className="mt-6">
                <label className="text-sm font-medium">
                  Face reference
                </label>

                <p className="mt-1 text-xs text-gray-500">
                  Required for character consistency
                </p>

                <div className="mt-3">
                  <label className="inline-flex cursor-pointer items-center rounded-xl bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800">
                    Choose Image

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFaceChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {(faceFile || savedFaceName) && (
                  <p className="mt-2 text-xs text-gray-500">
                    Selected: {faceFile?.name || savedFaceName}
                  </p>
                )}

                {facePreview && (
                  <div className="mt-4 overflow-hidden rounded-xl border bg-gray-50">
                    <img
                      src={facePreview}
                      alt="Face reference preview"
                      className="max-h-72 w-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* FULL BODY */}
              <div className="mt-6">
                <label className="text-sm font-medium">
                  Full-body reference
                </label>

                <p className="mt-1 text-xs text-gray-500">
                  Optional — add a full-body reference to help
                  maintain body shape and clothing.
                </p>

                <div className="mt-3">
                  <label className="inline-flex cursor-pointer items-center rounded-xl bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800">
                    Choose Image

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFullBodyChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {(fullBodyFile || savedFullBodyName) && (
                  <p className="mt-2 text-xs text-gray-500">
                    Selected:{" "}
                    {fullBodyFile?.name || savedFullBodyName}
                  </p>
                )}

                {fullBodyPreview && (
                  <div className="mt-4 overflow-hidden rounded-xl border bg-gray-50">
                    <img
                      src={fullBodyPreview}
                      alt="Full-body reference preview"
                      className="max-h-72 w-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* APPEARANCE */}
              <div className="mt-6">
                <label className="text-sm font-medium">
                  Appearance & clothing
                </label>

                <textarea
                  value={appearance}
                  onChange={(e) => {
                    setAppearance(e.target.value);
                    setAppearanceSaved(false);
                  }}
                  placeholder="Example: Maya has shoulder-length dark hair and an expressive face. She wears a dark jacket with simple neutral clothing."
                  className="mt-2 h-28 w-full resize-none rounded-xl border border-gray-300 bg-white p-4 text-sm outline-none focus:border-black"
                />

                <button
                  type="button"
                  onClick={handleSaveAppearance}
                  className="mt-3 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Save Appearance
                </button>

                {appearanceSaved && (
                  <p className="mt-2 text-xs font-medium text-gray-600">
                    Appearance saved ✓
                  </p>
                )}
              </div>
            </div>

            {/* VISUAL IDENTITY */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">
                Visual identity
              </h2>

              <div className="mt-5 grid gap-5 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium">
                    Aspect ratio
                  </label>

                  <select
                    value={aspectRatio}
                    onChange={(e) => {
                      setAspectRatio(e.target.value);
                      setAppearanceSaved(false);
                    }}
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm"
                  >
                    <option>9:16</option>
                    <option>16:9</option>
                    <option>1:1</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Visual look
                  </label>

                  <select
                    value={visualLook}
                    onChange={(e) => {
                      setVisualLook(e.target.value);
                      setAppearanceSaved(false);
                    }}
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm"
                  >
                    <option>Cinematic</option>
                    <option>Clean</option>
                    <option>Gritty</option>
                    <option>Anime</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Color grade
                  </label>

                  <select
                    value={colorGrade}
                    onChange={(e) => {
                      setColorGrade(e.target.value);
                      setAppearanceSaved(false);
                    }}
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm"
                  >
                    <option>Neutral</option>
                    <option>Warm</option>
                    <option>Cool</option>
                    <option>High contrast</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* SERIES DNA */}
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm md:sticky md:top-6">
            <h2 className="text-lg font-semibold">
              Series DNA
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              This identity will be carried into future episode
              generations.
            </p>

            <div className="mt-6 space-y-4 rounded-xl bg-gray-50 p-4">
              <div>
                <p className="text-xs font-medium text-gray-500">
                  CHARACTER
                </p>

                <p className="mt-1 text-sm font-medium">
                  {characterName || "Not defined"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">
                  FACE REFERENCE
                </p>

                <p className="mt-1 text-sm font-medium">
                  {faceFile || savedFaceName
                    ? "Added ✓"
                    : "Not added"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">
                  APPEARANCE
                </p>

                <p className="mt-1 text-sm font-medium">
                  {appearance || "Not defined"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">
                  VISUAL LOOK
                </p>

                <p className="mt-1 text-sm font-medium">
                  {visualLook}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">
                  COLOR GRADE
                </p>

                <p className="mt-1 text-sm font-medium">
                  {colorGrade}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">
                  ASPECT RATIO
                </p>

                <p className="mt-1 text-sm font-medium">
                  {aspectRatio}
                </p>
              </div>
            </div>

            <button
              onClick={handleCreateSeries}
              className="mt-6 w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Create & Lock Series DNA
            </button>

            {created && (
              <div className="mt-4 rounded-xl border border-black bg-gray-50 p-4">
                <p className="text-sm font-semibold">
                  Series DNA locked ✓
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Your series identity is ready for episode
                  generation.
                </p>

                <a
                  href="/series/1"
                  className="mt-4 block w-full rounded-xl border-2 border-black px-4 py-3 text-center text-sm font-semibold hover:bg-black hover:text-white"
                >
                  Open Series Studio
                </a>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}

