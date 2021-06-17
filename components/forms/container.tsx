export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container max-w-lg p-2 px-4 mx-auto mt-8 mb-8 border rounded-md bg-accent-lightest border-accent-light">
      {children}
    </div>
  );
}
