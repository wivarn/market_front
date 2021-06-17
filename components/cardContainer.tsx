const Container = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="relative">
      <div className="absolute inset-0 -mr-2 transform skew-y-0 shadow-lg rounded-xl bg-gradient-to-r from-primary via-secondary to-info rotate-1"></div>
      <div className="relative px-4 py-2 m-2 rounded-md shadow-lg bg-secondary-light">
        {children}
      </div>
    </div>
  );
};

export const CardContainer2xl = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="max-w-2xl p-4 mx-auto">
      <Container>{children}</Container>
    </div>
  );
};

export const CardContainer6xl = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="max-w-6xl p-4 mx-auto">
      <Container>{children}</Container>
    </div>
  );
};

export const CardContainerFull = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="max-w-full p-4 mx-auto">
      <Container>{children}</Container>
    </div>
  );
};
