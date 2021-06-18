export const InfoCard = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="container w-full p-4 mx-auto my-4 border rounded-md border-accent bg-accent-lightest lg:pl-8">
      {children}
    </div>
  );
};
