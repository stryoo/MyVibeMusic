import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#090f1a] px-4 text-white">
      <div className="w-full max-w-lg rounded-3xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-2xl">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/12">
          <Compass className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold">페이지를 찾을 수 없습니다</h1>
        <p className="mt-3 text-sm leading-7 text-white/75">
          요청한 페이지가 이동되었거나 존재하지 않습니다.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium transition hover:bg-white/20"
        >
          홈으로 이동
        </Link>
      </div>
    </main>
  );
}

