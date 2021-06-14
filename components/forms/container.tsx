export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container max-w-lg p-2 px-4 m-4 border rounded-md bg-accent-lightest bg-opacity-20 border-accent-light">
      {children}
    </div>
  );
}
