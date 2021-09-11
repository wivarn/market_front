import * as Yup from "yup";

import { BlankMessage, GenericErrorMessage } from "components/message";
import { Form, Formik } from "formik";
import { IMessage, IMessageWithCorrespondents } from "types/message";
import { NextSeo, ProfilePageJsonLd } from "next-seo";
import { Spinner, SpinnerLg } from "components/spinner";
import useSWR, { mutate } from "swr";

import { IUser } from "types/user";
import Image from "next/image";
import Link from "next/link";
import { MessageApi } from "services/backendApi/message";
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
      const messageDate = new Date(
        message.created_at.replace(/-/g, "/")
      ).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      return (
        <Link href={`/messages/${otherUser.id}`}>
          <a
            key={message.created_at}
            className={`flex items-center rounded ${
              currentChat ? "bg-info-lightest" : ""
            }`}
          >
            <div className="w-8 h-8 m-2 sm:h-16 sm:w-16">
              <Image
                src={otherUser.picture.url || "/ProfilePlaceholder.svg"}
                alt={otherUser.full_name}
                width="64"
                height="64"
                objectFit="cover"
                className="border rounded-full"
              />
            </div>
            <div>
              <div className="text-xs font-bold md:text-base">
                {otherUser.full_name}
              </div>
              <div className="hidden text-sm truncate md:block">
                {message.body}
              </div>
              <div className="hidden text-xs text-accent-dark md:block">
                {messageDate}
              </div>
            </div>
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

    const currentUser: IUser = messagesResponse.data.current_account;
    const correspondent: IUser = messagesResponse.data.correspondent;

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
      const sender = currentUserMessage ? currentUser : correspondent;
      const messageDate = new Date(message.created_at).toLocaleDateString(
        "en-US",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      );

      return (
        <div
          key={message.created_at}
          className={`sm:w-1/2 my-2 ${
            currentUserMessage ? "sm:justify-self-end" : "sm:justify-self-start"
          }`}
        >
          <div className="flex items-center space-x-2">
            <Image
              src={sender.picture.url || "/ProfilePlaceholder.svg"}
              alt={sender.full_name}
              width="32"
              height="32"
              objectFit="cover"
              className="rounded-full"
            />
            <span className="text-xs text-accent-dark">
              <div>{sender.full_name}</div>
              <div>{messageDate}</div>
            </span>
          </div>

          <div
            className={`p-2 m-2 mx-auto rounded-md border text-xs md:text-base ${
              currentUserMessage ? "bg-accent-lightest" : "bg-white"
            }`}
          >
            {message.body}
          </div>
        </div>
      );
    }
  }

  function renderMessageForm() {
    if (messagesLoading || messagesError) return null;

    const messageSchema = Yup.object().shape({
      body: Yup.string()
        .min(1, "Must be at least one character")
        .max(10000, "The maximum message size is 10,000 characters"),
    });
    return (
      <>
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
              <div className="sm:space-x-4 sm:flex">
                <TextField
                  name="body"
                  id={`${id}-messages`}
                  placeholder="Enter message here"
                />

                <SubmitButton text="Send" submitting={isSubmitting} />
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }

  return (
    <div className="my-4">
      <NextSeo title="Message History" />
      <PageContainer>
        <div className="flex space-x-2">
          <div className="flex-none w-1/3 overflow-y-auto border rounded-md h-600">
            {renderLatestMessages()}
          </div>
          <div className="flex flex-col w-2/3 border rounded-md h-600">
            <h5 className="p-2 text-center text-white bg-info-darker rounded-t-md">
              Messages
            </h5>
            <div className="flex-1 p-2 overflow-y-auto">{renderMessages()}</div>
            <div className="p-2 bg-accent-lightest rounded-b-md">
              {renderMessageForm()}
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
