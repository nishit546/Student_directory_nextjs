import Link from "next/link";
import { ArrowRight, Network, Users } from "lucide-react";
import Container from "@/components/Container";
import DepartmentIcon from "@/components/DepartmentIcon";
import PageFooter from "@/components/PageFooter";
import { departments } from "@/data/campus";

export default function DepartmentsPage() {
  return (
    <Container size="lg">
      <div className="flex items-start justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Departments</h1>
          <p className="mt-1 text-sm text-slate-600">Explore academic faculties, programs, and enrolled students.</p>
        </div>
        <span className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-700" />
          {departments.length} Active Academic Faculties
        </span>
      </div>

      <div className="mt-6 divide-y divide-slate-200 rounded-md border border-slate-200 bg-white">
        {departments.map((d) => (
          <div key={d.slug} className="flex items-center justify-between gap-6 p-5">
            <div>
              <Link href={`/departments/${d.slug}`} className="flex items-center gap-2.5 hover:underline">
                <DepartmentIcon name={d.icon} />
                <h2 className="font-semibold">{d.name}</h2>
              </Link>
              <p className="mt-3 text-sm text-slate-600">{d.description}</p>
              <p className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Network size={12} /> {d.specializations.length} Specializations</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Users size={12} /> {d.enrolled} Enrolled Students</span>
              </p>
            </div>
            <Link
              href={`/students?department=${d.slug}`}
              className="flex shrink-0 items-center gap-1 text-sm font-medium text-blue-700 hover:underline"
            >
              View students <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>

      <PageFooter left="Curriculum Year 2024–2025" right="Updated daily via Campus Records API" />
    </Container>
  );
}
