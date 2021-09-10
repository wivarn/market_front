import * as Yup from "yup";

import { BlankMessage, GenericErrorMessage } from "components/message";
import { Form, Formik } from "formik";
import { IMessage, IMessageWithCorrespondents } from "types/message";
import { Spinner, SpinnerLg } from "components/spinner";
import useSWR, { mutate } from "swr";

import Image from "next/image";
import Link from "next/link";
import { MessageApi } from "services/backendApi/message";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { SubmitButton } from "components/buttons";
import { TextField } from "components/forms/fields";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

export default function SendMessage(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const [session] = useSession();

  function getMessages() {
    const { data, error } = useSWR(
      session && id ? [`messages/${id}`, session.accessToken] : null
    );

    return {
      messagesResponse: data,
      messagesLoading: !error && !data,
      messagesError: error,
    };
  }

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

  const { messagesResponse, messagesLoading, messagesError } = getMessages();

  function renderLatestMessages() {
    const {
      latestMessagesResponse,
      latestMessagesLoading,
      latestMessagesError,
    } = getLatestMessages();

    if (latestMessagesLoading) return <Spinner text="Loading..." />;
    if (latestMessagesError)
      return <span>Unable to load latest messages.</span>;

    const latestMessages: IMessageWithCorrespondents[] =
      latestMessagesResponse.data;

    return (
      <div>
        {latestMessages.map((message) => {
          return renderLatestMessage(message);
        })}
      </div>
    );

    function renderLatestMessage(message: IMessageWithCorrespondents) {
      const otherUser =
        message.sender_id == session?.accountId
          ? message.recipient
          : message.sender;
      const currentChat = id && id == otherUser.id;
      return (
        <Link href={`/messages/${otherUser.id}`}>
          <a
            key={message.created_at}
            className={`flex items-center rounded h-20 ${
              currentChat ? "bg-info-lighter" : ""
            }`}
          >
            <div className="container relative w-16 h-16 m-2 border rounded-full">
              <Image
                src={otherUser.picture.url || "/ProfilePlaceholder.svg"}
                alt={otherUser.full_name}
                width="64"
                height="64"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <span className="">
              <div className="font-bold">{otherUser.full_name}</div>
              <div className="w-56 text-sm truncate">{message.body}</div>
              <div className="text-xs text-accent-dark">
                {message.created_at}
              </div>
            </span>
          </a>
        </Link>
      );
    }
  }

  function renderMessages() {
    if (messagesLoading) return <SpinnerLg text="Loading..." />;
    if (messagesError) return <GenericErrorMessage />;

    const messages: IMessage[] = messagesResponse.data.messages;
    if (!messages.length) return renderNoMessages();

    return (
      <div className="grid grid-cols-1">
        {messages.map((message) => renderMessage(message))}
      </div>
    );

    function renderNoMessages() {
      return (
        <BlankMessage>
          <p>You have no message history with this user.</p>
        </BlankMessage>
      );
    }

    function renderMessage(message: IMessage) {
      const currentUserMessage = message.sender_id == session?.accountId;
      return (
        <div
          key={message.created_at}
          className={`w-1/2 ${
            currentUserMessage ? "justify-self-end" : "justify-self-start"
          }`}
        >
          <div
            className={`p-1 m-1 mx-auto rounded ${
              currentUserMessage ? "bg-info-lighter" : "bg-accent-lighter"
            }`}
          >
            {message.body}
          </div>
          <div className="text-xs">{message.created_at}</div>
        </div>
      );
    }
  }

  function renderMessageForm() {
    if (messagesLoading || messagesError) return null;

    const messageSchema = Yup.object().shape({
      body: Yup.string()
        .min(1, "Must be at least one character")
        .max(10000, "The maximum message size is 10,000 characters")
        .required("Required"),
    });
    return (
      <div className="w-1/3 mx-auto">
        <Formik
          initialValues={{
            body: "",
          }}
          validationSchema={messageSchema}
          onSubmit={(values, actions) => {
            MessageApi(session?.accessToken)
              .create(`${id}`, values.body)
              .then(() => {
                mutate([`messages/${id}`, session?.accessToken]);
                mutate([`messages`, session?.accessToken]);
              })
              .catch(() => {
                toast.error("Failed to send message");
              })
              .finally(() => {
                actions.setSubmitting(false);
                actions.resetForm();
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <span className="flex space-x-4">
                <TextField
                  name="body"
                  id={`${id}-messages`}
                  placeholder="Enter message here"
                />

                <SubmitButton text="Send" submitting={isSubmitting} />
              </span>
            </Form>
          )}
        </Formik>
      </div>
    );
  }

  return (
    <>
      <NextSeo title="Message History" />
      <PageContainer>
        <div className="flex space-x-2">
          <div className="flex-none border w-80">{renderLatestMessages()}</div>
          <div className="flex-initial w-full h-screen overflow-y-auto border">
            {renderMessages()}
            {renderMessageForm()}
          </div>
        </div>
      </PageContainer>
    </>
  );
}
