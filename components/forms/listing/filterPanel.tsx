export default function FilterPanel({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="">
      <div className="absolute z-10 p-2 px-4 border rounded-lg bg-accent-lightest border-accent-light">
        {children}
      </div>
    </div>
  );
}
