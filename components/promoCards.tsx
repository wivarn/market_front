import Image from "next/image";

interface Props {
  title: string;
  text: string;
  imgSrc: string;
  href: string;
}

// Card container
export const PromoCard = (props: Props) => {
  return (
    <div className="flex w-10/12 rounded-b-lg shadow-md hover:shadow-xl">
      <a href={props.href} target="_blank">
        <Image
          src={props.imgSrc}
          height={600}
          width={800}
          alt=""
          className="overflow-hidden rounded-t-lg"
        />
        <div className="p-4">
          <h3 className="my-2 text-lg font-medium uppercase text-primary-dark">
            {props.title}
          </h3>
          <p className="text-justify">{props.text}</p>
          <div className="mt-5"></div>
        </div>
      </a>
    </div>
  );
};
