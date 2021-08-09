import { IUser } from "types/user";
import Image from "next/image";

export const UserInfo = (props: IUser): JSX.Element => {
  return (
    <div className="flex items-center space-x-2">
      <div className="container relative w-20 h-20 m-2 border rounded-full">
        <Image
          src={props.picture.url || "/ProfilePlaceholder.svg"}
          alt={props.given_name}
          placeholder="blur"
          blurDataURL="/ProfilePlaceholder.svg"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <span>
        <h4>
          {props.given_name} {props.family_name}
        </h4>
        <div className="text-sm text-accent-dark">Location</div>
        <div className="text-sm text-accent-dark">User Ratings Coming Soon</div>
      </span>
    </div>
  );
};
