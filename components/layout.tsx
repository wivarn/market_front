export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-full text-primary-dark">
      <main className="mx-auto">{children}</main>
    </div>
  );
}
