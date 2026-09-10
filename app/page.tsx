"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black">
      {/* HEADER */}
      <header className="border-b bg-white px-8 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <div className="text-xl font-semibold">
              HexCoded
            </div>

            <div className="text-xs text-gray-500">
              Series Lab
            </div>
          </div>

          <div className="text-sm text-gray-500">
            Your Series
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-8 py-10">
        {/* TITLE */}
        <div>
          <h1 className="text-3xl font-semibold">
            Your Series
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create and manage your visual series with persistent
            Series DNA.
          </p>
        </div>

        {/* SERIES */}
        <div className="mt-8 max-w-xl">
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            {/* THUMBNAIL */}
            <div className="flex h-52 items-center justify-center bg-gray-900">
              <div className="px-8 text-center text-white">
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  SCI-FI MYSTERY
                </p>

                <p className="mt-3 text-2xl font-semibold">
                  The Last Signal
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  A cinematic mystery about a signal that leads Maya
                  to something hidden beneath the city.
                </p>
              </div>
            </div>

            {/* CARD CONTENT */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    The Last Signal
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    A cinematic sci-fi mystery series.
                  </p>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                  4 episodes
                </span>
              </div>

              {/* DNA STATUS */}
              <div className="mt-5 rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">
                    SERIES DNA
                  </span>

                  <span className="text-xs font-semibold">
                    ✓ Locked
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-700">
                  Maya · Cinematic · Neutral · 9:16
                </p>
              </div>

              {/* OPEN */}
              <a
                href="/series/1"
                className="mt-5 block w-full rounded-xl bg-black px-4 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800"
              >
                Open Series
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
