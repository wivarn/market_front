export default function FormContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="m-4 p-2 rounded-md bg-accent-light">
      {children}
    </div>
  );
}
