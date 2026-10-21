import { initials, type Tone } from "@/data/campus";

const tones: Record<Tone, string> = {
  blue: "bg-blue-100 text-blue-800",
  peach: "bg-orange-100 text-orange-800",
  rose: "bg-red-100 text-red-800",
  slate: "bg-slate-200 text-slate-700",
  violet: "bg-indigo-100 text-indigo-800",
};

export default function Avatar({ name, tone, size = "md" }: { name: string; tone: Tone; size?: "md" | "lg" }) {
  const dims = size === "lg" ? "h-14 w-14 text-base rounded-lg" : "h-9 w-9 text-xs rounded-lg";
  return (
    <div className={`flex shrink-0 items-center justify-center font-semibold ${dims} ${tones[tone]}`}>
      {initials(name)}
    </div>
  );
}
