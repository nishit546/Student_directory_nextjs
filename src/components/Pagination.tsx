import Link from "next/link";

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

  const btn = "rounded border px-3 py-1.5 text-xs font-medium";
  const enabled = `${btn} border-slate-300 bg-white text-slate-700 hover:bg-slate-50`;
  const disabled = `${btn} cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400`;

  return (
    <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500">
      <span>
        Showing <strong className="font-semibold text-slate-700">{shown}</strong> of{" "}
        <strong className="font-semibold text-slate-700">{total}</strong> students
      </span>
      <div className="flex gap-2">
        {page > 1 ? <Link href={href(page - 1)} className={enabled}>Previous</Link> : <span className={disabled}>Previous</span>}
        {page < pageCount ? <Link href={href(page + 1)} className={enabled}>Next</Link> : <span className={disabled}>Next</span>}
      </div>
    </div>
  );
}
