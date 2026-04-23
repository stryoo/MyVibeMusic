export default function Loading() {
  return (
    <main className="min-h-screen bg-[#0a1220] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
          <div className="h-4 w-32 rounded bg-white/20" />
          <div className="mt-4 h-10 w-72 rounded bg-white/20" />
          <div className="mt-3 h-4 w-full max-w-2xl rounded bg-white/15" />
          <div className="mt-2 h-4 w-full max-w-xl rounded bg-white/15" />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-6">
            <div className="animate-pulse rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
              <div className="h-5 w-44 rounded bg-white/20" />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="rounded-2xl border border-white/10 bg-black/15 p-4">
                    <div className="h-3 w-20 rounded bg-white/15" />
                    <div className="mt-3 h-4 w-full rounded bg-white/15" />
                    <div className="mt-2 h-4 w-3/4 rounded bg-white/15" />
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-pulse rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
              <div className="h-5 w-44 rounded bg-white/20" />
              <div className="mt-4 space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="rounded-2xl border border-white/10 bg-black/15 p-4">
                    <div className="h-4 w-full rounded bg-white/15" />
                    <div className="mt-2 h-3 w-2/3 rounded bg-white/15" />
                    <div className="mt-2 h-3 w-4/5 rounded bg-white/15" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="animate-pulse rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
            <div className="h-5 w-40 rounded bg-white/20" />
            <div className="mt-4 aspect-square rounded-3xl bg-white/12" />
            <div className="mt-4 h-5 w-3/4 rounded bg-white/20" />
            <div className="mt-2 h-4 w-1/2 rounded bg-white/15" />
          </div>
        </div>
      </div>
    </main>
  );
}

