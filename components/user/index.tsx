import { IUser } from "types/user";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/client";

export const UserInfo = (props: IUser): JSX.Element => {
  const [session] = useSession();

  function renderSendMessage() {
    if (!session || session.accountId == props.id) return null;

    return (
      <div>
        <Link href={`/messages/${props.id}`}>
          <a className="underline text-info">Send Message</a>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center space-x-2">
        <div className="container relative w-20 h-20 m-2 border rounded-full">
          <Image
            src={props.picture.url || "/ProfilePlaceholder.svg"}
            alt={props.full_name}
            width="80"
            height="80"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <span>
          <h4>{props.full_name}</h4>
          <div className="text-sm text-accent-dark">
            {props.address?.state}, {props.address?.country}
          </div>
          {renderSendMessage()}
        </span>
      </div>
    </div>
  );
};
