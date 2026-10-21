export type DepartmentIcon = "terminal" | "pen" | "trend";
export type Tone = "blue" | "peach" | "rose" | "slate" | "violet";

export type Specialization = {
  slug: string;
  name: string;
  code: string;
  description: string;
  lead: string;
  lab: string;
  cycle: string;
};

export type Department = {
  slug: string;
  name: string;
  icon: DepartmentIcon;
  description: string;
  enrolled: number;
  specializations: Specialization[];
};

export type Subject = { code: string; title: string; credits: number };

export type Student = {
  id: string; // e.g. "stu-1042" (used in the URL)
  name: string;
  email: string;
  department: string; // department slug
  specialization: string; // specialization slug
  focus: string;
  year: 1 | 2 | 3 | 4;
  enrolled: string;
  about: string;
  tone: Tone;
  subjects: Subject[];
  recordId: string;
};

export const departments: Department[] = [
  {
    slug: "computer-science",
    name: "Computer Science",
    icon: "terminal",
    description: "Software engineering, artificial intelligence, algorithms, and systems infrastructure.",
    enrolled: 320,
    specializations: [
      { slug: "ai-machine-learning", name: "AI & Machine Learning", code: "CS-SPEC-01", description: "Neural networks, data modelling, and applied machine learning systems.", lead: "Prof. Rahul Iyer", lab: "Turing Hall 201", cycle: "2024–2025 Revised" },
      { slug: "systems-cloud", name: "Systems & Cloud", code: "CS-SPEC-02", description: "Operating systems, virtualization, and cloud-native infrastructure.", lead: "Prof. Hana Becker", lab: "Turing Hall 305", cycle: "2024–2025 Revised" },
      { slug: "cybersecurity", name: "Cybersecurity", code: "CS-SPEC-03", description: "Applied cryptography, network defence, and secure software design.", lead: "Prof. Omar Haddad", lab: "Turing Hall 112", cycle: "2024–2025 Revised" },
      { slug: "web-development", name: "Web Development", code: "CS-SPEC-04", description: "Focusing on modern frontend architectures, full-stack frameworks, reactive interfaces, and distributed web APIs.", lead: "Prof. Elena Vance", lab: "Turing Hall 408", cycle: "2024–2025 Revised" },
    ],
  },
  {
    slug: "design",
    name: "Design",
    icon: "pen",
    description: "User experience research, visual communication, interaction design, and product prototyping.",
    enrolled: 185,
    specializations: [
      { slug: "ux-research", name: "UX Research", code: "DS-SPEC-01", description: "Qualitative and quantitative research methods for product teams.", lead: "Prof. Nadia Fontaine", lab: "Studio B12", cycle: "2024–2025 Revised" },
      { slug: "interaction-design", name: "Interaction Design", code: "DS-SPEC-02", description: "Designing responsive, accessible and delightful interactive systems.", lead: "Prof. Jonas Weber", lab: "Studio B14", cycle: "2024–2025 Revised" },
      { slug: "visual-communication", name: "Visual Communication", code: "DS-SPEC-03", description: "Typography, branding, and visual storytelling across media.", lead: "Prof. Lila Moreau", lab: "Studio A03", cycle: "2024–2025 Revised" },
    ],
  },
  {
    slug: "business",
    name: "Business",
    icon: "trend",
    description: "Strategic management, financial technology, international entrepreneurship, and analytics.",
    enrolled: 240,
    specializations: [
      { slug: "fintech", name: "Financial Technology", code: "BS-SPEC-01", description: "Digital payments, financial analytics, and market infrastructure.", lead: "Prof. Daniel Okafor", lab: "Commerce Block 210", cycle: "2024–2025 Revised" },
      { slug: "strategic-management", name: "Strategic Management", code: "BS-SPEC-02", description: "Corporate strategy, global operations, and organisational leadership.", lead: "Prof. Mei Tanaka", lab: "Commerce Block 118", cycle: "2024–2025 Revised" },
      { slug: "entrepreneurship", name: "Entrepreneurship", code: "BS-SPEC-03", description: "Venture creation, growth strategy, and international start-up ecosystems.", lead: "Prof. Carlos Vega", lab: "Commerce Block 305", cycle: "2024–2025 Revised" },
    ],
  },
];

export const students: Student[] = [
  {
    id: "stu-1042", name: "Aarav Mehta", email: "aarav.mehta@campus.edu",
    department: "computer-science", specialization: "web-development", focus: "Full-Stack Architecture",
    year: 3, enrolled: "Fall 2022", tone: "blue", recordId: "0948-CS-AM",
    about: "Aarav is an undergraduate researcher focusing on distributed systems and cloud architecture. When not coding in Rust or Go, he mentors first-year engineering students in algorithm fundamentals.",
    subjects: [
      { code: "CS-301", title: "Distributed Systems & Microservices", credits: 4.0 },
      { code: "CS-340", title: "Web Application Architecture", credits: 4.0 },
      { code: "CS-280", title: "Algorithms & Complexity", credits: 3.5 },
    ],
  },
  {
    id: "stu-1089", name: "Elena Rostova", email: "elena.rostova@campus.edu",
    department: "design", specialization: "ux-research", focus: "User Research",
    year: 2, enrolled: "Fall 2023", tone: "slate", recordId: "1021-DS-ER",
    about: "Elena explores how people interact with everyday digital products, running usability studies for student-led startups.",
    subjects: [
      { code: "DS-210", title: "Research Methods for Designers", credits: 3.5 },
      { code: "DS-225", title: "Information Architecture", credits: 3.0 },
      { code: "DS-240", title: "Human-Centred Design Studio", credits: 4.0 },
    ],
  },
  {
    id: "stu-1120", name: "Marcus Chen", email: "marcus.chen@campus.edu",
    department: "business", specialization: "strategic-management", focus: "International Strategy",
    year: 4, enrolled: "Fall 2021", tone: "peach", recordId: "1187-BS-MC",
    about: "Marcus leads the campus consulting society and is writing his thesis on supply-chain resilience in emerging markets.",
    subjects: [
      { code: "BS-410", title: "Global Strategy & Operations", credits: 4.0 },
      { code: "BS-422", title: "Organisational Leadership", credits: 3.5 },
      { code: "BS-450", title: "Capstone: Market Entry", credits: 4.0 },
    ],
  },
  {
    id: "stu-1155", name: "Priya Sharma", email: "priya.sharma@campus.edu",
    department: "computer-science", specialization: "web-development", focus: "Reactive UI Design",
    year: 1, enrolled: "Fall 2024", tone: "blue", recordId: "1203-CS-PS",
    about: "Priya is a first-year student passionate about building accessible, component-driven interfaces.",
    subjects: [
      { code: "CS-101", title: "Introduction to Programming", credits: 4.0 },
      { code: "CS-120", title: "Web Fundamentals", credits: 3.5 },
      { code: "MA-110", title: "Discrete Mathematics", credits: 3.0 },
    ],
  },
  {
    id: "stu-1201", name: "Lucas Dubois", email: "lucas.dubois@campus.edu",
    department: "design", specialization: "interaction-design", focus: "Prototyping Systems",
    year: 3, enrolled: "Fall 2022", tone: "rose", recordId: "1266-DS-LD",
    about: "Lucas builds high-fidelity prototypes and design systems, with a particular interest in motion and micro-interactions.",
    subjects: [
      { code: "DS-310", title: "Interaction Prototyping", credits: 4.0 },
      { code: "DS-322", title: "Motion for Interfaces", credits: 3.5 },
      { code: "DS-335", title: "Design Systems", credits: 3.5 },
    ],
  },
  {
    id: "stu-1244", name: "Maya Lin", email: "maya.lin@campus.edu",
    department: "business", specialization: "fintech", focus: "Financial Analytics",
    year: 2, enrolled: "Fall 2023", tone: "violet", recordId: "1309-BS-ML",
    about: "Maya studies how data and automation are reshaping retail banking, and runs the campus investment club's analytics team.",
    subjects: [
      { code: "BS-215", title: "Financial Accounting", credits: 3.5 },
      { code: "BS-230", title: "Data Analytics for Business", credits: 4.0 },
      { code: "BS-245", title: "Intro to Financial Technology", credits: 3.0 },
    ],
  },
  {
    id: "stu-1310", name: "Tariq Al-Mansoor", email: "tariq.almansoor@campus.edu",
    department: "computer-science", specialization: "web-development", focus: "Distributed Web Systems",
    year: 4, enrolled: "Fall 2021", tone: "blue", recordId: "1342-CS-TA",
    about: "Tariq is completing his senior project on edge-rendered web architectures and scalable API design.",
    subjects: [
      { code: "CS-410", title: "Scalable Web Systems", credits: 4.0 },
      { code: "CS-430", title: "Cloud Infrastructure", credits: 4.0 },
      { code: "CS-490", title: "Senior Project", credits: 4.5 },
    ],
  },
  {
    id: "stu-1388", name: "Sophia Müller", email: "sophia.muller@campus.edu",
    department: "computer-science", specialization: "web-development", focus: "Progressive Web Apps",
    year: 2, enrolled: "Fall 2023", tone: "violet", recordId: "1401-CS-SM",
    about: "Sophia focuses on offline-first applications and performance engineering for the modern web.",
    subjects: [
      { code: "CS-210", title: "Data Structures", credits: 4.0 },
      { code: "CS-235", title: "Progressive Web Applications", credits: 3.5 },
      { code: "CS-250", title: "Software Design Patterns", credits: 3.5 },
    ],
  },
];

/* ---------- helpers ---------- */
export const getDepartment = (slug: string) => departments.find((d) => d.slug === slug);
export const getSpecialization = (dept: string, spec: string) =>
  getDepartment(dept)?.specializations.find((s) => s.slug === spec);
export const getStudent = (id: string) => students.find((s) => s.id === id.toLowerCase());
export const studentsInSpecialization = (dept: string, spec: string) =>
  students.filter((s) => s.department === dept && s.specialization === spec);
export const studentsInDepartment = (dept: string) => students.filter((s) => s.department === dept);

export const studentCode = (id: string) => id.toUpperCase();
export const initials = (name: string) =>
  name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
export const yearLabel = (y: number) => ["1st Year", "2nd Year", "3rd Year", "4th Year"][y - 1];
export const yearTitle = (y: number) => ["Freshman", "Sophomore", "Junior", "Senior"][y - 1];
