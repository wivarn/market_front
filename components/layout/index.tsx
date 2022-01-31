import Footer from "./footer";
// import Header from "./header";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col h-screen">
      {/* <Header /> */}
      <main className="flex-grow bg-accent-lightest">{children}</main>
      <Footer />
    </div>
  );
}
