export const InfoCard = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="container p-4 mx-auto my-4 border rounded-md border-accent">
      {children}
    </div>
  );
};
