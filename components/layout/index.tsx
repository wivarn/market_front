import Header from "./header";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("./footer"));

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow bg-accent-lightest">{children}</main>
      <Footer />
    </div>
  );
}
