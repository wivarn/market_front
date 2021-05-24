import React from "react";

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div>
      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
