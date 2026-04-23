"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#090f1a] px-4 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-rose-200/30 bg-white/10 p-8 text-center backdrop-blur-2xl">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-rose-400/20 text-rose-100">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold">문제가 발생했습니다</h1>
        <p className="mt-3 text-sm leading-7 text-white/75">
          요청 처리 중 예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.
        </p>
        <p className="mt-2 text-xs text-white/50">error: {error.message || "unknown error"}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/20"
        >
          <RefreshCcw className="h-4 w-4" />
          다시 시도
        </button>
      </div>
    </main>
  );
}

