const variants = {
  neutral: "border-slate-200 bg-slate-100 text-slate-600",
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  outline: "border-slate-300 bg-white text-slate-600",
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
      className={`inline-block rounded border px-1.5 py-0.5 text-[11px] font-medium leading-tight ${variants[variant]} ${
        mono ? "font-mono" : ""
      }`}
    >
      {children}
    </span>
  );
}
