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
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFlSURBVHgBFY/JbtNQAEWP/Z7t4LR26jgDEdCyoBSJYc2uAjYg2MEn8Et8CkhILFgwFJDYVJTSCAmJtE4ztU0d+8XDq3uluzvS0TGev3qtm57g2mqKVJpzNSTLl2RLRVL9x/6SpUowXbfO/Q3By2ePeHiloGdKtlSXYDZkw5hzOa1LzBurOb40sT6/Yavo83S7zePee0b+Jp5T0PEsGjWBNIVEGyXWdRv/xQN+fmgTdu7yJN/lUHnUbAfqJbIbNlnzc9JBSOpDSx1Qv9mgkQQcT01qliBLK7DduoowIr4fRtyzTvg9gNkfl0anWQVFpIkmXsRIzwtwSsW7PRjsrfB1HrF9u8vOpz7rtzTHozOysoqZzCYkWYEQ0F5pUueUwPfZXO/h2hLDNMgLjRyOJ8zL/2TTIwZhizTPGP3bZxodEN4RlBocx8bY/bKjv318Sxz/xagUiZpjOy6LONHD8YJf/THBWsAFu1mYYHGmVmwAAAAASUVORK5CYII="
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
