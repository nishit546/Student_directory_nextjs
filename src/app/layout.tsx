import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Campus Directory | Academic Informatics Hub",
    template: "%s | Campus Directory",
  },
  description: "Explore student profiles, academic departments, specializations, and campus enrollment data.",
  keywords: ["students", "university", "campus", "directory", "departments", "academics"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen text-slate-900 antialiased flex flex-col selection:bg-blue-600 selection:text-white`}>
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-sm py-6 text-center text-xs text-slate-500">
          <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} Campus Directory · Academic Informatics Core</p>
            <div className="flex items-center gap-4 text-slate-500">
              <span>Next.js App Router</span>
              <span>·</span>
              <span>TypeScript</span>
              <span>·</span>
              <span>Tailwind CSS</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
