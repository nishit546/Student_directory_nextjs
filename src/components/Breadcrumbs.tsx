import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-xs text-slate-500">
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {item.href ? (
            <Link
              href={item.href}
              className="rounded px-1.5 py-0.5 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="px-1.5 py-0.5 font-bold text-slate-800">{item.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight size={12} className="text-slate-300 shrink-0" />}
        </span>
      ))}
    </nav>
  );
}
