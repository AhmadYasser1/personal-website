export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto max-w-3xl px-4">{children}</div>
    </div>
  );
}
