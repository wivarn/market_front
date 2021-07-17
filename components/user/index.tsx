import { LgUserCircleIcon } from "components/icons";

interface IProps {
  givenName: string;
  familyName: string;
}

export const UserInfo = (props: IProps): JSX.Element => {
  return (
    <>
      <LgUserCircleIcon />
      <span>
        <h3>
          {props.givenName} {props.familyName}
        </h3>
        <div className="text-sm text-accent">Location</div>
        <div className="text-sm text-success">User Rating</div>
      </span>
    </>
  );
};
