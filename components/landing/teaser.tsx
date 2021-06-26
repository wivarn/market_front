import Image from "next/image";
import { NextSeo } from "next-seo";

export default function About(): JSX.Element {
  return (
    <>
      <div className="flex h-screen bg-cover bg-teaser bg-opacity-10">
        <div className="m-auto text-center">
          <NextSeo title="Launching 2021" />
          <Image src="/skwirl-logo.png" alt="launch" height={300} width={300} />
          <div className="">
            <div className="text-6xl font-semibold text-secondary">
              skwirl
              <span className="text-primary">.io</span>{" "}
            </div>
            <h2 className="mt-2 font-thin text-info-lighter">
              launching fall 2021
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
