import React from "react";

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div className="h-full text-gray-800">
      <main className="mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
