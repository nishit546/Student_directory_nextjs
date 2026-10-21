import Link from "next/link";
import { ArrowRight, BookOpen, Mail } from "lucide-react";
import Avatar from "./Avatar";
import Badge from "./Badge";
import { getDepartment, studentCode, yearLabel, type Student } from "@/data/campus";

const deptBadgeVariant: Record<string, "blue" | "purple" | "amber" | "neutral"> = {
  "computer-science": "blue",
  design: "purple",
  business: "amber",
};

export default function StudentCard({ student }: { student: Student }) {
  const dept = getDepartment(student.department);
  const badgeVar = deptBadgeVariant[student.department] ?? "neutral";

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:border-blue-200 hover:shadow-md card-hover-effect">
      <div>
        {/* Top bar: Avatar & ID */}
        <div className="mb-4 flex items-center justify-between">
          <Avatar name={student.name} tone={student.tone} size="md" />
          <Badge mono variant="outline">
            {studentCode(student.id)}
          </Badge>
        </div>

        {/* Student Name */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          <Link href={`/students/${student.id}`} className="focus:outline-none">
            {student.name}
          </Link>
        </h3>

        {/* Department & Year Standing */}
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <Badge variant={badgeVar}>{dept?.name ?? student.department}</Badge>
          <span className="text-[11px] font-medium text-slate-500">{yearLabel(student.year)}</span>
        </div>

        {/* Focus / Specialization */}
        <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-2">
          {student.about}
        </p>
      </div>

      {/* Card Footer */}
      <div className="mt-5 border-t border-slate-100 pt-3.5 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
          <BookOpen size={12} className="text-slate-400" />
          {student.subjects.length} Subjects
        </span>

        <Link
          href={`/students/${student.id}`}
          className="inline-flex items-center gap-1 font-semibold text-blue-700 group-hover:text-blue-800 group-hover:translate-x-0.5 transition-all"
        >
          <span>Profile</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
