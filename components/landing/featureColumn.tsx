import React from "react";

type Props = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const FeatureColumn = (props: Props): JSX.Element => {
  return (
    <div className="items-center">
      <div className="grid w-full text-center justify-items-center md:w-64">
        <img src={props.image} alt={props.imageAlt} />
        <h3 className="text-2xl font-semibold text-secondary">{props.title}</h3>
        <div className="text-lg text-accent-lighter">{props.description}</div>
      </div>
    </div>
  );
};

export { FeatureColumn };
