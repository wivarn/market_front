import Image from "next/image";

interface Props {
  title: string;
  text: string;
  imgSrc: string;
  href: string;
}

// Card container
export const PromoCard = (props: Props): JSX.Element => {
  return (
    <div className="flex w-10/12 rounded-b-lg shadow-md hover:shadow-xl">
      <a href={props.href} target="_blank" rel="noreferrer">
        <Image
          src={props.imgSrc}
          height={600}
          width={800}
          alt={props.title}
          className="overflow-hidden rounded-t-lg"
        />
        <div className="p-4">
          <h3 className="my-2 text-xl font-semibold text-accent-darkest">
            {props.title}
          </h3>
          <p className="text-justify">{props.text}</p>
          <div className="mt-5"></div>
        </div>
      </a>
    </div>
  );
};
