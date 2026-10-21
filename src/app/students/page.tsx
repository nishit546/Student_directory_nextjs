import { Suspense } from "react";
import Container from "@/components/Container";
import StudentCard from "@/components/StudentCard";
import StudentFilters from "@/components/StudentFilters";
import Pagination from "@/components/Pagination";
import { departments, students } from "@/data/campus";

const PAGE_SIZE = 9;

type Props = { searchParams: Promise<{ q?: string; department?: string; page?: string }> };

export default async function StudentsPage({ searchParams }: Props) {
  const { q = "", department = "", page = "1" } = await searchParams;

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(q.trim().toLowerCase()) &&
      (!department || s.department === department)
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(Math.max(1, Number(page) || 1), pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <Container>
      <h1 className="text-3xl font-semibold tracking-tight">Students</h1>
      <p className="mt-1 mb-6 text-sm text-slate-600">Browse students and view their profiles.</p>

      <Suspense>
        <StudentFilters departments={departments.map(({ slug, name }) => ({ slug, name }))} />
      </Suspense>

      {visible.length === 0 ? (
        <p className="mt-10 text-center text-sm text-slate-500">No students match your filters.</p>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((s) => (
            <StudentCard key={s.id} student={s} />
          ))}
        </div>
      )}

      <Pagination
        page={current}
        pageCount={pageCount}
        shown={visible.length}
        total={filtered.length}
        params={{ q, department }}
      />
    </Container>
  );
}
