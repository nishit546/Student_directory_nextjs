import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import Avatar from "@/components/Avatar";
import Badge from "@/components/Badge";
import PageFooter from "@/components/PageFooter";
import { getDepartment, getStudent, students, studentCode, yearLabel, yearTitle } from "@/data/campus";

export function generateStaticParams() {
  return students.map((s) => ({ id: s.id }));
}

const label = "text-[10px] font-semibold uppercase tracking-wider text-slate-500";

export default async function StudentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const student = getStudent(id);
  if (!student) notFound();
  const dept = getDepartment(student.department)!;

  return (
    <Container size="md">
      <Breadcrumbs items={[{ label: "Students", href: "/students" }, { label: student.name }]} />
      <Link
        href="/students"
        className="mt-3 mb-5 inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={12} /> Back to students
      </Link>

      <article className="rounded-md border border-slate-300 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-slate-200 pb-5">
          <Avatar name={student.name} tone={student.tone} size="lg" />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{student.name}</h1>
            <div className="mt-1.5 flex gap-2">
              <Badge mono variant="outline">{studentCode(student.id)}</Badge>
              <Badge variant="green">Active Student</Badge>
            </div>
          </div>
        </div>

        {/* Key facts */}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-b border-slate-200 py-5 text-sm">
          <div><dt className={label}>Department</dt><dd className="mt-0.5">{dept.name}</dd></div>
          <div><dt className={label}>Study Year</dt><dd className="mt-0.5">{yearLabel(student.year)} ({yearTitle(student.year)})</dd></div>
          <div><dt className={label}>Email</dt><dd className="mt-0.5"><a href={`mailto:${student.email}`} className="text-blue-700 hover:underline">{student.email}</a></dd></div>
          <div><dt className={label}>Enrolled</dt><dd className="mt-0.5">{student.enrolled}</dd></div>
        </dl>

        {/* About */}
        <section className="border-b border-slate-200 py-5">
          <h2 className="mb-2 text-sm font-semibold">About</h2>
          <p className="text-sm leading-relaxed text-slate-600">{student.about}</p>
        </section>

        {/* Academic details */}
        <section className="pt-5">
          <h2 className="mb-3 text-sm font-semibold">Academic Details</h2>
          <div className="divide-y divide-slate-100 text-sm">
            <div className="flex justify-between py-2"><span className="text-blue-800">Department</span><span>{dept.name}</span></div>
            <div className="flex justify-between py-2"><span className="text-blue-800">Current Academic Standing</span><span>{yearLabel(student.year)} Undergraduate</span></div>
          </div>

          <h3 className={`${label} mt-4 mb-2`}>Enrolled Subjects</h3>
          <ul className="divide-y divide-slate-200 rounded border border-slate-200 bg-slate-50 text-xs">
            {student.subjects.map((s) => (
              <li key={s.code} className="flex items-center justify-between px-3 py-2.5">
                <span className="text-slate-800">{s.code}: {s.title}</span>
                <span className="text-[11px] text-slate-500">{s.credits.toFixed(1)} Credits</span>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <PageFooter
        left={<>System Record ID: {student.recordId}</>}
        right={<>Last validated: Oct 24, 2024</>}
      />
    </Container>
  );
}
