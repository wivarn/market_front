import { BlankMessage, GenericErrorMessage } from "components/message";

import PageContainer from "components/pageContainer";
import { SpinnerLg } from "components/spinner";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function MessageIndex(): JSX.Element {
  const router = useRouter();
  const [session] = useSession();

  function getLatestMessages() {
    const { data, error } = useSWR(
      session ? [`messages`, session.accessToken] : null
    );

    return {
      latestMessagesResponse: data,
      latestMessagesLoading: !error && !data,
      latestMessagesError: error,
    };
  }

  const {
    latestMessagesResponse,
    latestMessagesLoading,
    latestMessagesError,
  } = getLatestMessages();

  if (latestMessagesLoading) return <SpinnerLg text="Loading..." />;
  if (latestMessagesError) return <GenericErrorMessage />;

  const latestMessage = latestMessagesResponse.data[0];
  if (latestMessage) {
    const otherUserID =
      latestMessage.sender_id == session?.accountId
        ? latestMessage.recipient_id
        : latestMessage.sender_id;
    router.push(`/messages/${otherUserID}`);
  }

  return (
    <PageContainer>
      <BlankMessage>
        <p>You have no messages</p>
      </BlankMessage>
    </PageContainer>
  );
}
