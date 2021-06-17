export const CardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative max-w-2xl mx-auto mt-8 mb-8">
      <div className="absolute inset-0 -mr-2 transform skew-y-0 shadow-lg rounded-xl bg-gradient-to-r from-primary via-secondary to-info rotate-1"></div>
      <div className="relative px-4 py-2 m-2 rounded-md shadow-lg bg-secondary-light">
        {children}
      </div>
    </div>
  );
}

export const CardContainerXL = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative max-w-6xl mx-auto mt-8 mb-8">
      <div className="absolute inset-0 -mr-2 transform skew-y-0 shadow-lg rounded-xl bg-gradient-to-r from-primary via-secondary to-info rotate-1"></div>
      <div className="relative px-4 py-2 m-2 rounded-md shadow-lg bg-secondary-light">
        {children}
      </div>
    </div>
  );
}

export const CardContainerFull = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="max-w-full px-2 mx-auto mb-4">
      <div className="relative px-4 py-2 m-2 rounded-md shadow-lg bg-secondary-light">
        {children}
      </div>
    </div>
  );
};
