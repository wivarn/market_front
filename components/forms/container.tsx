export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-2 px-4 m-4 bg-opacity-50 border rounded-md bg-accent-lightest border-accent-light">
      {children}
    </div>
  );
}
