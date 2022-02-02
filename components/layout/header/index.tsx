import dynamic from "next/dynamic";

const CategoryPopovers = dynamic(() => import("./categoryPopovers"), {
  ssr: false,
});
const Navbar = dynamic(() => import("./navbar"), { ssr: false });

export default function Header(): JSX.Element {
  return (
    <>
      <header className="bg-primary">
        <nav className="flex items-center px-2 mx-auto h-14 max-w-screen-2x">
          <Navbar />
        </nav>

        <div className="w-full bg-white border-t border-b">
          <div className="container h-10 max-w-6xl mx-auto">
            <CategoryPopovers />
          </div>
        </div>
      </header>
    </>
  );
}
