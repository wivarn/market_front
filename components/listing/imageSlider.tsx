import { ChevronLeftIcon, ChevronRightIcon } from "components/icons";

import Image from "next/image";

export interface Props {
  src: string;
  alt: string;
}

export function ImageSlider(props: Props): JSX.Element {
  return (
    <div className="container relative">
      <div className="flex flex-grow mx-auto w-600 h-600">
        <div className="">
          <Image
            src={props.src}
            alt={props.alt}
            layout="fill"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADcSURBVHgBNY/PTgIxEMZ/065yUQ96QLyQoI/pE/kqxoMXjImaiCaCchDNamC3Hb4u7LSTtDPfnxk7vL5xDMwhK01v1ylhblR8f3bfvPgiLZb46hcmE+LVJdXwVIDVkvT0TH6dUbicj6CtSQ/3pEcp5Jcp+e5WvbTTPxnA7F+SGWIQ4H0qxryY6LbwpowChSCSU5lv1FiXkZRSqT86KzsbEYZjgjfNjl2aXeh9dEy8GMOmpvK/H8LBgNys6cMswlxD59TpusnPy1A9IERCjF0tsHe3skEfnrVUq7qzBVw1YRwIWDLVAAAAAElFTkSuQmCC"
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
