import Header from "./header";
import Link from "next/link";
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
      <div className="w-full bg-warning">
        <p className="py-2 text-xl text-center text-info">
          This website is for demo purposes only and is no longer operational.{" "}
          <Link href="/about">
            <a className="text-white underline">Learn more.</a>
          </Link>
        </p>
      </div>
      <main className="flex-grow bg-accent-lightest">{children}</main>
      <Footer />
    </div>
  );
}
