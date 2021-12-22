import { IUser } from "types/user";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export const UserInfo = (props: IUser): JSX.Element => {
  const { data: session } = useSession();

  function renderRecommend() {
    if (props.total_sales_with_feedback == 0)
      return <div className="text-accent-darker">No Reviews</div>;

    return (
      <div className="text-accent-darker">
        <span>{Math.round(props.recommendation_rate * 100)}% Recommended </span>
        <span>({props.total_sales_with_feedback})</span>
      </div>
    );
  }

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
        <Link href={`/users/${props.id}`}>
          <a>
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
          </a>
        </Link>
        <span>
          <Link href={`/users/${props.id}`}>
            <a className="flex items-center space-x-2">
              <h4>{props.full_name}</h4>
              <span className="text-sm text-accent-dark">
                {props.address?.state}, {props.address?.country}
              </span>
            </a>
          </Link>
          {renderRecommend()}
          {renderSendMessage()}
        </span>
      </div>
    </div>
  );
};
