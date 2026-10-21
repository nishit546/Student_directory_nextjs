import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Mail, Calendar, Award, BookOpen, ExternalLink, CheckCircle2 } from "lucide-react";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import Avatar from "@/components/Avatar";
import Badge from "@/components/Badge";
import PageFooter from "@/components/PageFooter";
import StudentCard from "@/components/StudentCard";
import { getDepartment, getStudent, students, studentCode, yearLabel, yearTitle } from "@/data/campus";

export function generateStaticParams() {
  return students.map((s) => ({ id: s.id }));
}

const deptBadgeVariant: Record<string, "blue" | "purple" | "amber" | "neutral"> = {
  "computer-science": "blue",
  design: "purple",
  business: "amber",
};

export default async function StudentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const student = getStudent(id);
  if (!student) notFound();
  const dept = getDepartment(student.department)!;

  const totalCredits = student.subjects.reduce((sum, s) => sum + s.credits, 0);

  // Find peer students from same department (excluding this student)
  const peers = students.filter((s) => s.department === student.department && s.id !== student.id).slice(0, 2);

  return (
    <div className="py-8">
      <Container size="lg">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Overview", href: "/" },
            { label: "Students", href: "/students" },
            { label: student.name },
          ]}
        />

        <div className="mt-3 mb-6 flex items-center justify-between text-xs">
          <Link
            href="/students"
            className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={14} /> Back to all students
          </Link>

          <Link
            href={`/departments/${dept.slug}`}
            className="inline-flex items-center gap-1 text-blue-700 hover:underline"
          >
            Explore {dept.name} Department <ArrowRight size={13} />
          </Link>
        </div>

        {/* Profile Card */}
        <article className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs">
          {/* Cover Header Banner */}
          <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 relative flex items-end">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="rounded-full bg-black/20 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-white border border-white/20">
                Verified Campus Record
              </span>
            </div>
          </div>

          <div className="px-6 pb-8 sm:px-8">
            {/* Header Identity Row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-6">
              <div className="flex items-end gap-4">
                <Avatar name={student.name} tone={student.tone} size="xl" />
                <div className="pb-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                      {student.name}
                    </h1>
                    <CheckCircle2 size={18} className="text-blue-600 shrink-0" />
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <Badge mono variant="outline">
                      {studentCode(student.id)}
                    </Badge>
                    <Badge variant={deptBadgeVariant[student.department] ?? "neutral"}>
                      {dept.name}
                    </Badge>
                    <Badge variant="green">Active Student</Badge>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${student.email}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
                >
                  <Mail size={14} />
                  <span>Contact</span>
                </a>
                <Link
                  href={`/departments/${dept.slug}/${student.specialization}`}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                >
                  <span>Track Info</span>
                  <ExternalLink size={13} />
                </Link>
              </div>
            </div>

            {/* Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 mb-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Department</p>
                <Link
                  href={`/departments/${dept.slug}`}
                  className="mt-0.5 inline-block text-xs sm:text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
                >
                  {dept.name}
                </Link>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Academic Standing</p>
                <p className="mt-0.5 text-xs sm:text-sm font-semibold text-slate-800">
                  {yearLabel(student.year)} ({yearTitle(student.year)})
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Campus Email</p>
                <a
                  href={`mailto:${student.email}`}
                  className="mt-0.5 block truncate text-xs sm:text-sm font-semibold text-blue-600 hover:underline"
                >
                  {student.email}
                </a>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Enrolled Since</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-800">
                  <Calendar size={13} className="text-slate-400" />
                  {student.enrolled}
                </p>
              </div>
            </div>

            {/* About Student */}
            <section className="mb-8">
              <h2 className="text-sm font-bold text-slate-900 mb-2">Student Focus & Biography</h2>
              <p className="text-sm leading-relaxed text-slate-600 bg-white rounded-xl border border-slate-100 p-4">
                {student.about}
              </p>
            </section>

            {/* Academic Details & Subject Enrollment */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-blue-600" />
                  <h2 className="text-sm font-bold text-slate-900">Enrolled Subjects & Credits</h2>
                </div>
                <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
                  {totalCredits.toFixed(1)} Total Credits
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Subject Code</th>
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4 text-right">Credit Units</th>
                      <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {student.subjects.map((s) => (
                      <tr key={s.code} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-slate-800">{s.code}</td>
                        <td className="py-3 px-4 font-medium text-slate-700">{s.title}</td>
                        <td className="py-3 px-4 text-right font-semibold text-slate-600">
                          {s.credits.toFixed(1)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-block rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                            Enrolled
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </article>

        {/* Peer Cohort Students */}
        {peers.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Other Students in {dept.name}
              </h3>
              <Link
                href={`/students?department=${dept.slug}`}
                className="text-xs font-semibold text-blue-700 hover:underline"
              >
                View all department students →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {peers.map((peer) => (
                <StudentCard key={peer.id} student={peer} />
              ))}
            </div>
          </section>
        )}

        <PageFooter
          left={<>Registry ID: {student.recordId}</>}
          right={<>Academic Term: Fall 2024 · Verified Profile</>}
        />
      </Container>
    </div>
  );
}
