export default function PageFooter({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <footer className="mt-8 flex items-center justify-between gap-4 border-t border-slate-200 pt-4 text-[11px] text-slate-500">
      <span>{left}</span>
      <span>{right}</span>
    </footer>
  );
}
