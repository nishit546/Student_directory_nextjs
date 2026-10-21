"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/students", label: "Students" },
  { href: "/departments", label: "Departments" },
  { href: "/about", label: "About" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className="flex items-stretch gap-6">
      {links.map((l) => {
        const active = pathname === l.href || pathname.startsWith(l.href + "/");
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`flex items-center border-b-2 text-sm transition-colors ${
              active
                ? "border-blue-700 font-medium text-slate-900"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
