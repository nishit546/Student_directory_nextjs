import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import Avatar from "@/components/Avatar";
import Badge from "@/components/Badge";
import PageFooter from "@/components/PageFooter";
import { departments, getDepartment, getSpecialization, studentCode, studentsInSpecialization } from "@/data/campus";

export function generateStaticParams() {
  return departments.flatMap((d) => d.specializations.map((s) => ({ department: d.slug, specialization: s.slug })));
}

const label = "text-[10px] font-semibold text-slate-500";

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
    <Container size="lg">
      <Breadcrumbs
        items={[
          { label: "Departments", href: "/departments" },
          { label: dept.name, href: `/departments/${dept.slug}` },
          { label: spec.name },
        ]}
      />
      <div className="mt-3 mb-5 flex items-center justify-between border-b border-slate-200 pb-3 text-xs">
        <Link href={`/departments/${dept.slug}`} className="flex items-center gap-1 text-blue-700 hover:underline">
          <ArrowLeft size={12} /> Return to {dept.name} Department
        </Link>
        <Link href={`/students?department=${dept.slug}`} className="flex items-center gap-1 text-slate-600 hover:text-slate-900">
          View all students <ArrowRight size={12} />
        </Link>
      </div>

      <section className="rounded-md border border-slate-300 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">{spec.name}</h1>
              <Badge>Specialization under {dept.name}</Badge>
            </div>
            <p className="mt-3 max-w-md text-sm text-slate-600">{spec.description}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Department Track</p>
            <span className="mt-1 inline-block rounded border border-slate-300 bg-slate-50 px-3 py-1.5 font-mono text-xs font-semibold">
              {spec.code}
            </span>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-200 pt-4 text-xs sm:grid-cols-4">
          <div><dt className={label}>Academic Lead</dt><dd className="mt-0.5 text-slate-800">{spec.lead}</dd></div>
          <div><dt className={label}>Primary Core Lab</dt><dd className="mt-0.5 text-slate-800">{spec.lab}</dd></div>
          <div><dt className={label}>Total Enrollment</dt><dd className="mt-0.5 text-slate-800">{list.length} Active Enrollees</dd></div>
          <div><dt className={label}>Curriculum Cycle</dt><dd className="mt-0.5 text-slate-800">{spec.cycle}</dd></div>
        </dl>
      </section>

      <div className="mt-8 mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          Students in this Specialization
          <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[11px] font-medium">{list.length}</span>
        </h2>
        <span className="flex items-center gap-2 text-[11px] text-slate-500">
          Filtered by Track: <Badge variant="blue">{spec.name}</Badge>
        </span>
      </div>

      {list.length === 0 ? (
        <p className="rounded-md border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
          No students are currently enrolled in this specialization.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {list.map((s) => (
            <div key={s.id} className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={s.name} tone={s.tone} />
                  <div>
                    <p className="text-sm font-semibold">{s.name}</p>
                    <p className="font-mono text-[11px] text-slate-500">{studentCode(s.id)}</p>
                  </div>
                </div>
                <Badge variant="outline">Year {s.year}</Badge>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-[11px]">
                <span className="text-slate-600">{s.focus}</span>
                <Link href={`/students/${s.id}`} className="flex items-center gap-1 font-medium text-blue-700 hover:underline">
                  View profile <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <PageFooter
        left="Campus Directory © Academic Informatics Core"
        right={
          <span className="flex items-center gap-2">
            Path: /departments/{dept.slug}/{spec.slug}
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
        }
      />
    </Container>
  );
}
