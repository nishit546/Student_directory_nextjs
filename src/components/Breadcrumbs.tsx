import Link from "next/link";

export default function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
      {items.map((item, i) => (
        <span key={i}>
          {item.href ? (
            <Link href={item.href} className="hover:text-slate-900 hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-slate-900">{item.label}</span>
          )}
          {i < items.length - 1 && <span className="mx-2 text-slate-400">/</span>}
        </span>
      ))}
    </nav>
  );
}
