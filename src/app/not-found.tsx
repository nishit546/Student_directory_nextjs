import Link from "next/link";
import { ArrowRight, Landmark, Network, Users, Home, AlertCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";

const suggestions = [
  { title: "Overview Dashboard", path: "/", icon: Home },
  { title: "Students Directory", path: "/students", icon: Users },
  { title: "Computer Science Department", path: "/departments/computer-science", icon: Landmark },
  { title: "Design Department", path: "/departments/design", icon: Landmark },
  { title: "Web Development Specialization", path: "/departments/computer-science/web-development", icon: Network },
];

export default function NotFound() {
  return (
    <div className="py-12">
      <Container size="md">
        <Breadcrumbs items={[{ label: "Directory", href: "/" }, { label: "404 Not Found" }]} />

        <div className="mt-8 flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-50 text-rose-600 shadow-sm border border-rose-100 mb-6">
            <AlertCircle size={32} />
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-700">
            Error 404 · Route Not Found
          </span>

          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Student or Directory Page Not Found
          </h1>

          <p className="mt-3 text-sm text-slate-600 max-w-md leading-relaxed">
            The requested campus directory entry, department, or student identifier does not exist or has been relocated in the active semester records.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all"
            >
              Return to Overview
            </Link>
            <Link
              href="/students"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
            >
              Browse Student Directory
            </Link>
          </div>

          {/* Quick Suggestions Card */}
          <div className="mt-10 w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white text-left shadow-xs">
            <div className="flex justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <span>Suggested Valid Routes</span>
              <span className="normal-case tracking-normal">Direct Navigation</span>
            </div>
            <ul className="divide-y divide-slate-100">
              {suggestions.map(({ title, path, icon: Icon }) => (
                <li key={path}>
                  <Link
                    href={path}
                    className="flex items-center justify-between px-5 py-3.5 text-xs hover:bg-slate-50/80 transition-colors"
                  >
                    <span className="flex items-center gap-3 font-semibold text-slate-800">
                      <Icon size={16} className="text-slate-400" />
                      {title}
                    </span>
                    <span className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                      {path}
                      <ArrowRight size={13} className="text-blue-600" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
