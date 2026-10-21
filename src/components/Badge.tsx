const variants = {
  neutral: "border-slate-200/90 bg-slate-100/80 text-slate-700",
  blue: "border-blue-200/80 bg-blue-50 text-blue-700",
  green: "border-emerald-200/80 bg-emerald-50 text-emerald-700",
  indigo: "border-indigo-200/80 bg-indigo-50 text-indigo-700",
  purple: "border-purple-200/80 bg-purple-50 text-purple-700",
  amber: "border-amber-200/80 bg-amber-50 text-amber-800",
  rose: "border-rose-200/80 bg-rose-50 text-rose-700",
  outline: "border-slate-200 bg-white text-slate-700 shadow-2xs",
} as const;

export default function Badge({
  variant = "neutral",
  mono = false,
  children,
}: {
  variant?: keyof typeof variants;
  mono?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-tight transition-colors ${
        variants[variant] ?? variants.neutral
      } ${mono ? "font-mono" : ""}`}
    >
      {children}
    </span>
  );
}
