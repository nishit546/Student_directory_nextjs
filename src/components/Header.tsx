import Link from "next/link";
import { GraduationCap } from "lucide-react";
import NavLinks from "./NavLinks";


export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-stretch justify-between px-6">
        <div className="flex items-stretch gap-8">
          <Link href="/students" className="flex items-center gap-2 font-semibold text-slate-900">
            <GraduationCap size={18} className="text-blue-700" />
            Campus Directory
          </Link>
          <NavLinks />
        </div>
        <div className="flex items-center">
          <span className="rounded border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            Frontend Practice
          </span>
        </div>
      </div>
    </header>
  );
}
