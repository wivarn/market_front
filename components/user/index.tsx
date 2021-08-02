import { IUser } from "types/user";
import { LgUserCircleIcon } from "components/icons";

export const UserInfo = (props: IUser): JSX.Element => {
  return (
    <>
      <LgUserCircleIcon />
      <span>
        <h3>
          {props.given_name} {props.family_name}
        </h3>
        <div className="text-sm text-accent">Location</div>
        <div className="text-sm text-success">User Rating</div>
      </span>
    </>
  );
};
