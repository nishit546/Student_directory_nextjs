import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Network, Users, BookOpen, Layers } from "lucide-react";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import DepartmentIcon from "@/components/DepartmentIcon";
import PageFooter from "@/components/PageFooter";
import StudentCard from "@/components/StudentCard";
import { departments, getDepartment, students, studentsInSpecialization } from "@/data/campus";

export function generateStaticParams() {
  return departments.map((d) => ({ department: d.slug }));
}

export default async function DepartmentPage({ params }: { params: Promise<{ department: string }> }) {
  const { department } = await params;
  const dept = getDepartment(department);
  if (!dept) notFound();

  // Get all students enrolled in this department
  const deptStudents = students.filter((s) => s.department === dept.slug);

  return (
    <div className="py-8">
      <Container size="lg">
        <Breadcrumbs
          items={[
            { label: "Overview", href: "/" },
            { label: "Departments", href: "/departments" },
            { label: dept.name },
          ]}
        />

        <div className="mt-3 mb-6 flex items-center justify-between text-xs">
          <Link
            href="/departments"
            className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={14} /> Back to all departments
          </Link>
          <Link
            href={`/students?department=${dept.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:underline"
          >
            <span>View {deptStudents.length} enrolled students</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Department Hero Card */}
        <section className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
                <DepartmentIcon name={dept.icon} />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  {dept.name}
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 max-w-xl">
                  {dept.description}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Enrolled</p>
              <p className="mt-1 text-lg font-bold text-slate-900 flex items-center gap-1.5">
                <Users size={16} className="text-blue-600" />
                {dept.enrolled} Students
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Specializations</p>
              <p className="mt-1 text-lg font-bold text-slate-900 flex items-center gap-1.5">
                <Network size={16} className="text-indigo-600" />
                {dept.specializations.length} Tracks
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 col-span-2 sm:col-span-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Curriculum Cycle</p>
              <p className="mt-1 text-lg font-bold text-slate-900 flex items-center gap-1.5">
                <Layers size={16} className="text-emerald-600" />
                2024–2025
              </p>
            </div>
          </div>
        </section>

        {/* Specialization Tracks */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Specialization Tracks
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Explore curriculum divisions, research leads, and affiliated labs.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              {dept.specializations.length} Available
            </span>
          </div>

          <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs">
            {dept.specializations.map((s) => {
              const activeCount = studentsInSpecialization(dept.slug, s.slug).length;
              return (
                <Link
                  key={s.slug}
                  href={`/departments/${dept.slug}/${s.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-200/80 rounded px-1.5 py-0.5">
                        {s.code}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {s.name}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed max-w-xl">
                      {s.description}
                    </p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                      <span>Lead: <strong className="text-slate-700">{s.lead}</strong></span>
                      <span>·</span>
                      <span>Lab: <strong className="text-slate-700">{s.lab}</strong></span>
                      <span>·</span>
                      <span><strong className="text-blue-700">{activeCount}</strong> enrolled</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 font-semibold text-xs text-blue-700 group-hover:translate-x-1 transition-transform shrink-0">
                    <span>View Track</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Department Enrolled Students */}
        {deptStudents.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  Enrolled Students in {dept.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Students currently active in this faculty.</p>
              </div>
              <Link
                href={`/students?department=${dept.slug}`}
                className="text-xs font-semibold text-blue-700 hover:underline"
              >
                Open directory filter →
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {deptStudents.map((s) => (
                <StudentCard key={s.id} student={s} />
              ))}
            </div>
          </section>
        )}

        <PageFooter
          left={`Department Code: /departments/${dept.slug}`}
          right="Campus Directory · Academic Registry"
        />
      </Container>
    </div>
  );
}
