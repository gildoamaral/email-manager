export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex sm:items-center items-start justify-center min-h-screen p-4 bg-muted/30">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
