import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import DepartmentIcon from "@/components/DepartmentIcon";
import PageFooter from "@/components/PageFooter";
import { departments, getDepartment, studentsInSpecialization } from "@/data/campus";

export function generateStaticParams() {
  return departments.map((d) => ({ department: d.slug }));
}

export default async function DepartmentPage({ params }: { params: Promise<{ department: string }> }) {
  const { department } = await params;
  const dept = getDepartment(department);
  if (!dept) notFound();

  return (
    <Container size="lg">
      <Breadcrumbs items={[{ label: "Departments", href: "/departments" }, { label: dept.name }]} />
      <div className="mt-3 mb-5 flex items-center justify-between text-xs">
        <Link href="/departments" className="flex items-center gap-1 text-blue-700 hover:underline">
          <ArrowLeft size={12} /> Return to Departments
        </Link>
        <Link href={`/students?department=${dept.slug}`} className="flex items-center gap-1 text-slate-600 hover:text-slate-900">
          View all students <ArrowRight size={12} />
        </Link>
      </div>

      <section className="rounded-md border border-slate-300 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <DepartmentIcon name={dept.icon} />
          <h1 className="text-2xl font-semibold tracking-tight">{dept.name}</h1>
        </div>
        <p className="mt-3 max-w-xl text-sm text-slate-600">{dept.description}</p>
        <p className="mt-3 text-xs text-slate-500">{dept.enrolled} Enrolled Students</p>
      </section>

      <h2 className="mt-8 mb-3 text-sm font-semibold">
        Specializations <span className="ml-1 rounded bg-slate-200 px-1.5 py-0.5 text-[11px]">{dept.specializations.length}</span>
      </h2>
      <div className="divide-y divide-slate-200 rounded-md border border-slate-200 bg-white">
        {dept.specializations.map((s) => (
          <Link
            key={s.slug}
            href={`/departments/${dept.slug}/${s.slug}`}
            className="flex items-center justify-between gap-6 p-4 hover:bg-slate-50"
          >
            <div>
              <p className="text-sm font-semibold">{s.name}</p>
              <p className="mt-1 text-xs text-slate-600">{s.description}</p>
              <p className="mt-2 text-[11px] text-slate-500">
                {s.code} · {s.lead} · {studentsInSpecialization(dept.slug, s.slug).length} active enrollees
              </p>
            </div>
            <ArrowRight size={14} className="shrink-0 text-blue-700" />
          </Link>
        ))}
      </div>

      <PageFooter left="Campus Directory © Academic Informatics Core" right={<>Path: /departments/{dept.slug}</>} />
    </Container>
  );
}
