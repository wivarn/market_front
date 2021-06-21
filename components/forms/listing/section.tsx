export default function FormSection({
  header,
  children,
}: {
  header: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <section className="my-4">
      <div className="px-4 py-2 border bg-info-darker border-info-darker text-accent-lightest rounded-t-md">
        <h4 className="text-accent-lightest">{header}</h4>
      </div>
      <div className="px-4 py-2 border bg-accent-lightest rounded-b-md border-info-darker">
        {children}
      </div>
    </section>
  );
}
