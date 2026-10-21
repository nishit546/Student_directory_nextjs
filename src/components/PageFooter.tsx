export default function PageFooter({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200/80 pt-6 text-xs text-slate-500">
      <div className="font-medium">{left}</div>
      <div className="text-[11px] text-slate-400">{right}</div>
    </div>
  );
}
