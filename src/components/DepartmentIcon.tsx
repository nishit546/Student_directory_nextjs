import { PenTool, SquareTerminal, TrendingUp } from "lucide-react";
import type { DepartmentIcon as Icon } from "@/data/campus";

export default function DepartmentIcon({ name }: { name: Icon }) {
  const Cmp = { terminal: SquareTerminal, pen: PenTool, trend: TrendingUp }[name];
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded bg-blue-50 text-blue-700">
      <Cmp size={16} />
    </span>
  );
}
