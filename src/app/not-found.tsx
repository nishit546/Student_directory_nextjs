import Link from "next/link";
import { ArrowRight, Landmark, Network, Users } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

const suggestions = [
  { title: "Computer Science Department", path: "/departments/computer-science", icon: Landmark },
  { title: "Web Development Specialization", path: "/departments/computer-science/web-development", icon: Network },
  { title: "Students Directory", path: "/students", icon: Users },
];

export default function NotFound() {
  return (
    <>
      <div className="border-b border-slate-200 bg-slate-50/60">
        <div className="mx-auto max-w-5xl px-6 py-3">
          <Breadcrumbs items={[{ label: "Directory", href: "/students" }, { label: "Not Found" }]} />
        </div>
      </div>

      <div className="mx-auto flex max-w-xl flex-col items-center px-6 pt-24 pb-16 text-center">
        <span className="mb-5 inline-flex items-center gap-1.5 rounded border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-500" /> 404 · Route Not Found
        </span>
        <h1 className="text-3xl font-semibold tracking-tight">Student or department not found</h1>
        <p className="mt-3 text-sm text-slate-600">
          The requested directory entry or path could not be located. It may have moved or the identifier
          might be invalid.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/students" className="rounded bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
            Return to Students Directory
          </Link>
          <Link href="/departments" className="rounded border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Browse All Departments
          </Link>
        </div>

        <div className="mt-10 w-full overflow-hidden rounded-md border border-slate-200 bg-white text-left">
          <div className="flex justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            <span>Suggested Starting Points</span>
            <span className="normal-case tracking-normal">Internal Routes</span>
          </div>
          <ul className="divide-y divide-slate-200">
            {suggestions.map(({ title, path, icon: Icon }) => (
              <li key={path}>
                <Link href={path} className="flex items-center justify-between px-4 py-3 text-sm hover:bg-slate-50">
                  <span className="flex items-center gap-3"><Icon size={16} className="text-slate-500" />{title}</span>
                  <span className="flex items-center gap-3 font-mono text-[11px] text-slate-500">{path}<ArrowRight size={14} /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
