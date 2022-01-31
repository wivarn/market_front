import { ChevronLeftIcon, ChevronRightIcon } from "components/icons";
import Slider, { Settings } from "react-slick";

import Image from "next/image";
import { MouseEventHandler } from "react";

export interface Props {
  imageMetas: { url: string }[];
  imageTitle: string;
}

function NextArrow({
  onClick,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className="absolute z-20 p-2 border rounded-full group-hover:opacity-50 focus:outline-none bg-accent-lighter opacity-10 right-5 bottom-1/2"
      onClick={onClick}
    >
      <ChevronRightIcon />
    </button>
  );
}

function PrevArrow({
  onClick,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className="absolute z-20 p-2 border rounded-full group-hover:opacity-50 focus:outline-none bg-accent-lighter opacity-10 left-5 bottom-1/2"
      onClick={onClick}
    >
      <ChevronLeftIcon />
    </button>
  );
}

export default function ImageSlider(props: Props): JSX.Element {
  const settings: Settings = {
    dots: true,
    infinite: true,
    lazyLoad: "progressive",
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const images = props.imageMetas.map((imageMeta, index) => (
    <div className="px-2" key={imageMeta.url}>
      <div className="container mx-auto sm:w-600">
        <div className="flex flex-grow mx-auto ">
          <Image
            src={imageMeta.url}
            alt={props.imageTitle}
            priority={index === 0 ? true : false}
            width="600"
            height="600"
            objectFit="contain"
            placeholder="blur"
            blurDataURL="/assets/image-loader.svg"
            className="z-10 rounded-md"
          />
        </div>
      </div>
    </div>
  ));
  return (
    <div>
      <Slider
        {...settings}
        className="container relative mx-auto mb-8 rounded-md group border-accent"
      >
        {images}
      </Slider>
    </div>
  );
}
