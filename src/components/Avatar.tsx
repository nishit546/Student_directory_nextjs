import { initials, type Tone } from "@/data/campus";

const tones: Record<Tone, string> = {
  blue: "bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-blue-500/20",
  peach: "bg-gradient-to-tr from-amber-500 to-orange-600 text-white shadow-amber-500/20",
  rose: "bg-gradient-to-tr from-rose-500 to-pink-600 text-white shadow-rose-500/20",
  slate: "bg-gradient-to-tr from-slate-600 to-slate-800 text-white shadow-slate-500/20",
  violet: "bg-gradient-to-tr from-purple-500 to-indigo-600 text-white shadow-purple-500/20",
};

export default function Avatar({
  name,
  tone,
  size = "md",
}: {
  name: string;
  tone: Tone;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const dims = {
    sm: "h-8 w-8 text-xs rounded-lg",
    md: "h-10 w-10 text-xs rounded-xl",
    lg: "h-14 w-14 text-base rounded-2xl",
    xl: "h-18 w-18 text-xl rounded-2xl",
  }[size];

  return (
    <div
      className={`flex shrink-0 items-center justify-center font-bold tracking-wider shadow-sm ring-2 ring-white/80 select-none ${dims} ${tones[tone]}`}
    >
      {initials(name)}
    </div>
  );
}
