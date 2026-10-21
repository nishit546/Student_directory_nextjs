import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  pageCount: number;
  shown: number;
  total: number;
  params: Record<string, string | undefined>;
};

export default function Pagination({ page, pageCount, shown, total, params }: Props) {
  const href = (p: number) => {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => v && sp.set(k, v));
    if (p > 1) sp.set("page", String(p));
    const qs = sp.toString();
    return qs ? `/students?${qs}` : "/students";
  };

  const btnBase = "inline-flex items-center justify-center rounded-xl text-xs font-semibold transition-all";
  const btnActive = `${btnBase} h-9 w-9 bg-blue-600 text-white shadow-sm shadow-blue-500/20`;
  const btnPage = `${btnBase} h-9 w-9 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300`;
  const navBtn = `${btnBase} px-3 py-2 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 gap-1`;
  const navBtnDisabled = `${btnBase} px-3 py-2 border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed gap-1`;

  return (
    <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80 pt-6 text-xs text-slate-500">
      <div>
        Showing <strong className="font-bold text-slate-800">{shown}</strong> of{" "}
        <strong className="font-bold text-slate-800">{total}</strong> enrolled students
      </div>

      {pageCount > 1 && (
        <div className="flex items-center gap-1.5">
          {/* Previous Button */}
          {page > 1 ? (
            <Link href={href(page - 1)} className={navBtn}>
              <ChevronLeft size={14} />
              <span>Previous</span>
            </Link>
          ) : (
            <span className={navBtnDisabled}>
              <ChevronLeft size={14} />
              <span>Previous</span>
            </span>
          )}

          {/* Page numbers */}
          <div className="flex items-center gap-1 mx-1">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => {
              const isCurrent = p === page;
              return isCurrent ? (
                <span key={p} className={btnActive}>
                  {p}
                </span>
              ) : (
                <Link key={p} href={href(p)} className={btnPage}>
                  {p}
                </Link>
              );
            })}
          </div>

          {/* Next Button */}
          {page < pageCount ? (
            <Link href={href(page + 1)} className={navBtn}>
              <span>Next</span>
              <ChevronRight size={14} />
            </Link>
          ) : (
            <span className={navBtnDisabled}>
              <span>Next</span>
              <ChevronRight size={14} />
            </span>
          )}
        </div>
      )}
    </div>
  );
}
