import { PenTool, SquareTerminal, TrendingUp } from "lucide-react";
import type { DepartmentIcon as Icon } from "@/data/campus";

export default function DepartmentIcon({
  name,
  size = 18,
  className,
}: {
  name: Icon;
  size?: number;
  className?: string;
}) {
  if (name === "terminal") return <SquareTerminal size={size} className={className} />;
  if (name === "pen") return <PenTool size={size} className={className} />;
  return <TrendingUp size={size} className={className} />;
}
