const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div className="h-full">
      <main className="mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
