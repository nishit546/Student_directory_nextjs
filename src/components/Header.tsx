import Link from "next/link";
import { GraduationCap, Sparkles } from "lucide-react";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-bold text-slate-900 transition-transform active:scale-95"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-shadow">
              <GraduationCap size={20} className="transition-transform group-hover:rotate-6" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold tracking-tight text-slate-900">Campus Directory</span>
              <span className="text-[10px] font-medium text-slate-600">University Informatics</span>
            </div>
          </Link>
          <NavLinks />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>Fall 2024 Live</span>
          </div>

          <Link
            href="/students"
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-2xs"
          >
            <Sparkles size={13} className="text-amber-500" />
            <span>Directory</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
