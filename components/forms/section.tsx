export default function FormSection({
  header,
  children,
}: {
  header: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 py-2 my-4 border rounded-md bg-accent-lightest bg-opacity-20 border-accent-light">
      <h2>{header}</h2>
      {children}
    </div>
  );
}
