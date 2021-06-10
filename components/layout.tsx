import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <Header />
      <main className="container mx-auto max-w-screen-2xl">{children}</main>
      <Footer />
    </div>
  );
}
