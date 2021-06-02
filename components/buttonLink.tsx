import Link from "next/link";

interface Props {
  text: string;
  href: string;
}

export const PrimaryButton = (props: Props) => {
  const buttonText = (
    <a className="p-2 border-2 border-primary text-primary hover:border-primary-dark hover:text-primary-dark">
      <div>{props.text}</div>
    </a>
  );
  return <Link href={props.href}>{props.text}</Link>;
};
