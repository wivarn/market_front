export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-full">
      <main className="container mx-auto max-w-screen-2xl">{children}</main>
    </div>
  );
}
