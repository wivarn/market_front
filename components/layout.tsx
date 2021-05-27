import React from "react";

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div className="h-full text-primary-dark">
      <main className="mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
