import { ChevronLeftIcon, ChevronRightIcon } from "components/icons";

import Image from "next/image";

export interface Props {
  src: string;
  alt: string;
}

export function ImageSlider(props: Props): JSX.Element {
  return (
    <div>
      <div className="container relative flex flex-initial mx-auto border md:w-600 md:h-600 w-96 h-96 border-accent-dark">
        <div className="">
          <Image
            src={props.src}
            alt={props.alt}
            layout="fill"
            objectFit="contain"
            className="rounded-md"
          />
          <div className="absolute bottom-0 right-0 flex text-primary">
            <div className=" hover:text-primary-dark">
              <ChevronLeftIcon />
            </div>
            <div className="hover:text-primary-dark">
              <ChevronRightIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
