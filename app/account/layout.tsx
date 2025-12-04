export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
