import React from "react";

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div className="h-screen bg-black text-white">
      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
