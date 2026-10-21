import Link from "next/link";
import { ArrowRight, Network, Users, ChevronRight, Landmark } from "lucide-react";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import DepartmentIcon from "@/components/DepartmentIcon";
import PageFooter from "@/components/PageFooter";
import { departments } from "@/data/campus";

export default function DepartmentsPage() {
  const totalEnrolled = departments.reduce((acc, d) => acc + d.enrolled, 0);

  return (
    <div className="py-10">
      <Container size="xl">
        <Breadcrumbs items={[{ label: "Overview", href: "/" }, { label: "Departments" }]} />

        {/* Header */}
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Academic Departments</h1>
              <span className="rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
                {departments.length} Faculties
              </span>
            </div>
            <p className="mt-1.5 text-sm text-slate-600">
              Explore academic divisions, research specializations, faculty curriculum, and enrolled students.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 font-medium shadow-2xs">
              <Users size={13} className="text-blue-600" />
              {totalEnrolled} Campus Enrollees
            </span>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {departments.map((d) => (
            <div
              key={d.slug}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all hover:border-blue-200 hover:shadow-lg card-hover-effect"
            >
              {/* Gradient Top Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-80" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-2xs">
                    <DepartmentIcon name={d.icon} />
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                    <Users size={12} className="text-slate-500" />
                    {d.enrolled} Students
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  <Link href={`/departments/${d.slug}`}>{d.name}</Link>
                </h2>

                <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                  {d.description}
                </p>

                {/* Specializations Preview Chips */}
                <div className="mt-5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Curriculum Tracks ({d.specializations.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.specializations.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/departments/${d.slug}/${s.slug}`}
                        className="rounded-lg border border-slate-200/80 bg-slate-50/80 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <Link
                  href={`/departments/${d.slug}`}
                  className="font-bold text-blue-700 inline-flex items-center gap-1 hover:underline"
                >
                  <span>Faculty Overview</span>
                  <ChevronRight size={14} />
                </Link>

                <Link
                  href={`/students?department=${d.slug}`}
                  className="font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
                >
                  <span>Students</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <PageFooter
          left="Academic Informatics · Curriculum Session 2024–2025"
          right="Automated Faculty Records"
        />
      </Container>
    </div>
  );
}
