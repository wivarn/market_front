import Footer from "./footer";
import Header from "./header";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <body className="flex flex-col h-screen">
      <Header />
      <main className="container flex-grow mx-auto max-w-screen-2xl">
        {children}
      </main>
      <Footer />
    </body>
  );
}
