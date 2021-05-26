import React from "react";

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div className="h-screen text-red-800">
      <main className="mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
