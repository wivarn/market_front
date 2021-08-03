import { ChevronLeftIcon, ChevronRightIcon } from "components/icons";

import Image from "next/image";
import PageContainer from "components/pageContainer";
import Slider from "react-slick";
import { SpinnerLg } from "components/spinner";

export interface Props {
  imageMetas: { url: string }[];
}

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute z-20 p-2 border rounded-full group-hover:opacity-50 focus:outline-none bg-accent-lighter opacity-10 right-5 bottom-1/2"
      onClick={onClick}
    >
      <ChevronRightIcon />
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute z-20 p-2 border rounded-full group-hover:opacity-50 focus:outline-none bg-accent-lighter opacity-10 left-5 bottom-1/2"
      // style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      <ChevronLeftIcon />
    </button>
  );
}

export default function ImageSlider(props: Props): JSX.Element {
  const settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const images = props.imageMetas.map((imageMeta) => (
    <PageContainer yPadding="py-none" key={imageMeta.url}>
      <div className="container relative mx-auto ">
        <div className="flex flex-grow mx-auto w-600 h-600">
          <Image
            src={imageMeta.url}
            layout="fill"
            objectFit="contain"
            className="z-10 rounded-md"
          />
          <SpinnerLg />
        </div>
      </div>
    </PageContainer>
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
