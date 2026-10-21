const sizes = { md: "max-w-3xl", lg: "max-w-4xl", xl: "max-w-5xl" } as const;

export default function Container({
  size = "xl",
  children,
}: {
  size?: keyof typeof sizes;
  children: React.ReactNode;
}) {
  return <div className={`mx-auto w-full ${sizes[size]} px-6 py-10`}>{children}</div>;
}
