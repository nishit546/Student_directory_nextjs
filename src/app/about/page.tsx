import Container from "@/components/Container";

export default function AboutPage() {
  return (
    <Container size="md">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Campus Directory is a frontend practice project built with the Next.js App Router. It uses local dummy
        data to demonstrate layouts, nested and dynamic routes, reusable components and TypeScript.
      </p>
      <ul className="mt-5 list-disc space-y-1 pl-5 text-sm text-slate-600">
        <li>/students and /students/[id]</li>
        <li>/departments, /departments/[department] and /departments/[department]/[specialization]</li>
        <li>A custom not-found page for invalid routes</li>
      </ul>
    </Container>
  );
}
