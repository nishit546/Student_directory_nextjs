import Link from "next/link";
import { ArrowRight, Users, Landmark, Network, Sparkles, Search, GraduationCap } from "lucide-react";
import Container from "@/components/Container";
import StudentCard from "@/components/StudentCard";
import DepartmentIcon from "@/components/DepartmentIcon";
import { departments, students } from "@/data/campus";

export default function Home() {
  const totalStudents = students.length;
  const totalSpecializations = departments.reduce((acc, d) => acc + d.specializations.length, 0);
  const featuredStudents = students.slice(0, 3);

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-blue-50/30 to-slate-50/50 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        <Container size="xl">
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-2xs backdrop-blur-xs mb-6">
              <Sparkles size={13} className="text-blue-600 animate-pulse" />
              <span>Campus Academic Informatics · Live Directory</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Connect with students, faculties & programs.
            </h1>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto">
              A comprehensive campus directory for academic discovery. Search active enrollees, explore department curriculum tracks, and review verified student records.
            </p>

            {/* Quick Search Box */}
            <form action="/students" method="GET" className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-lg mx-auto">
              <div className="relative w-full">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search students by name or department..."
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-xs outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto shrink-0 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Search</span>
                <ArrowRight size={14} />
              </button>
            </form>

            {/* Quick Links */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
              <span className="font-medium text-slate-700">Quick explore:</span>
              <Link href="/students?department=computer-science" className="hover:text-blue-600 hover:underline">
                Computer Science
              </Link>
              <span>·</span>
              <Link href="/students?department=design" className="hover:text-blue-600 hover:underline">
                Design
              </Link>
              <span>·</span>
              <Link href="/students?department=business" className="hover:text-blue-600 hover:underline">
                Business
              </Link>
            </div>
          </div>

          {/* Metric Stats Banner */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-xs backdrop-blur-sm card-hover-effect">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                <Users size={16} className="text-blue-600" />
                <span>Enrolled Profiles</span>
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">{totalStudents}</p>
              <p className="mt-1 text-[11px] text-slate-500">Detailed student records</p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-xs backdrop-blur-sm card-hover-effect">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                <Landmark size={16} className="text-indigo-600" />
                <span>Faculties</span>
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">{departments.length}</p>
              <p className="mt-1 text-[11px] text-slate-500">Academic departments</p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-xs backdrop-blur-sm card-hover-effect">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                <Network size={16} className="text-emerald-600" />
                <span>Specializations</span>
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">{totalSpecializations}</p>
              <p className="mt-1 text-[11px] text-slate-500">Curriculum tracks</p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-xs backdrop-blur-sm card-hover-effect">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                <GraduationCap size={16} className="text-amber-600" />
                <span>Academic Year</span>
              </div>
              <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">2024–25</p>
              <p className="mt-1 text-[11px] text-slate-500">Accredited session</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Departments Overview */}
      <section className="py-14">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Academic Departments</h2>
              <p className="mt-1 text-sm text-slate-600">Discover academic divisions, research specializations, and faculty tracks.</p>
            </div>
            <Link
              href="/departments"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
            >
              Browse all departments <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {departments.map((dept) => (
              <div
                key={dept.slug}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-200 hover:shadow-md transition-all card-hover-effect"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <DepartmentIcon name={dept.icon} />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                      {dept.specializations.length} tracks
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    <Link href={`/departments/${dept.slug}`} className="focus:outline-none">
                      {dept.name}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3">
                    {dept.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">{dept.enrolled} Enrolled</span>
                  <Link
                    href={`/departments/${dept.slug}`}
                    className="font-semibold text-blue-700 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1"
                  >
                    View faculty <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Student Profiles */}
      <section className="py-10 border-t border-slate-200/60 bg-slate-50/50">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Featured Student Profiles</h2>
              <p className="mt-1 text-sm text-slate-600">Active undergraduate students across disciplines and graduation cohorts.</p>
            </div>
            <Link
              href="/students"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
            >
              View full student directory <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredStudents.map((s) => (
              <StudentCard key={s.id} student={s} />
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg shadow-blue-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-xl font-bold">Ready to search the full directory?</h3>
              <p className="mt-1 text-sm text-blue-100">
                Filter students by department, cohort year, academic track, or search by name.
              </p>
            </div>
            <Link
              href="/students"
              className="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-700 shadow-md hover:bg-blue-50 active:scale-95 transition-all"
            >
              Open Students Directory
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
