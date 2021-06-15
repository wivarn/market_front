export default function FormSection({
  header,
  children,
}: {
  header: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-4">
      <div className="px-4 py-2 border bg-info-darker border-info-darker text-accent-lightest rounded-t-md">
        <h4>{header}</h4>
      </div>
      <div className="px-4 py-2 border bg-opacity-20 rounded-b-md bg-accent-lightest border-info-darker">
        {children}
      </div>
    </div>
  );
}
