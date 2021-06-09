export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-2 px-4 m-4 border rounded-md bg-accent-lightest border-accent-lighter">
      {children}
    </div>
  );
}
