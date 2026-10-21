import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, UserCheck, MapPin, Calendar, Award, Layers } from "lucide-react";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import Badge from "@/components/Badge";
import PageFooter from "@/components/PageFooter";
import StudentCard from "@/components/StudentCard";
import { departments, getDepartment, getSpecialization, studentsInSpecialization } from "@/data/campus";

export function generateStaticParams() {
  return departments.flatMap((d) => d.specializations.map((s) => ({ department: d.slug, specialization: s.slug })));
}

export default async function SpecializationPage({
  params,
}: {
  params: Promise<{ department: string; specialization: string }>;
}) {
  const { department, specialization } = await params;
  const dept = getDepartment(department);
  const spec = getSpecialization(department, specialization);
  if (!dept || !spec) notFound();

  const list = studentsInSpecialization(dept.slug, spec.slug);

  return (
    <div className="py-8">
      <Container size="lg">
        <Breadcrumbs
          items={[
            { label: "Overview", href: "/" },
            { label: "Departments", href: "/departments" },
            { label: dept.name, href: `/departments/${dept.slug}` },
            { label: spec.name },
          ]}
        />

        <div className="mt-3 mb-6 flex items-center justify-between text-xs">
          <Link
            href={`/departments/${dept.slug}`}
            className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={14} /> Return to {dept.name} Faculty
          </Link>
          <Link
            href={`/students?department=${dept.slug}`}
            className="inline-flex items-center gap-1 text-blue-700 hover:underline"
          >
            <span>View all faculty students</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Track Header Card */}
        <section className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1">
                  {spec.code}
                </span>
                <Badge variant="blue">{dept.name}</Badge>
              </div>

              <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {spec.name}
              </h1>

              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed max-w-xl">
                {spec.description}
              </p>
            </div>

            <div className="shrink-0 text-left sm:text-right">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
                <Award size={13} />
                Accredited Track
              </span>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Academic Lead</p>
              <p className="mt-1 font-semibold text-slate-800 flex items-center gap-1.5">
                <UserCheck size={14} className="text-blue-600" />
                {spec.lead}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Core Lab</p>
              <p className="mt-1 font-semibold text-slate-800 flex items-center gap-1.5">
                <MapPin size={14} className="text-indigo-600" />
                {spec.lab}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Track Enrollees</p>
              <p className="mt-1 font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                {list.length} Active Students
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Revision Cycle</p>
              <p className="mt-1 font-semibold text-slate-800 flex items-center gap-1.5">
                <Layers size={14} className="text-amber-600" />
                {spec.cycle}
              </p>
            </div>
          </div>
        </section>

        {/* Enrolled Students in Track */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Enrolled Students in {spec.name}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Students specializing in this curriculum focus.</p>
            </div>
            <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-bold text-blue-700">
              {list.length} Enrolled
            </span>
          </div>

          {list.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-xs text-slate-500">
              No students are currently registered in this specialization track for the active semester.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((s) => (
                <StudentCard key={s.id} student={s} />
              ))}
            </div>
          )}
        </section>

        <PageFooter
          left={`Curriculum Reference: ${spec.code} · ${dept.name}`}
          right="Verified Campus Track Records"
        />
      </Container>
    </div>
  );
}
