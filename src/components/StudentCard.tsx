import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Avatar from "./Avatar";
import Badge from "./Badge";
import { getDepartment, studentCode, yearLabel, type Student } from "@/data/campus";

export default function StudentCard({ student }: { student: Student }) {
  const dept = getDepartment(student.department);
  return (
    <div className="flex flex-col rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <Avatar name={student.name} tone={student.tone} />
        <Badge mono>{studentCode(student.id)}</Badge>
      </div>
      <h3 className="text-sm font-semibold text-slate-900">{student.name}</h3>
      <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-600">
        <Badge variant={student.department === "computer-science" ? "blue" : "neutral"}>{dept?.name}</Badge>
        <span>{yearLabel(student.year)}</span>
      </div>
      <div className="mt-4 border-t border-slate-200 pt-3">
        <Link
          href={`/students/${student.id}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:underline"
        >
          View profile <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
