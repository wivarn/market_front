export default function FormSection({
  header,
  children,
}: {
  header: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container p-2 px-4 m-4 border rounded-md bg-accent-lightest bg-opacity-20 border-accent-light">
      <h2>{header}</h2>
      {children}
    </div>
  );
}
