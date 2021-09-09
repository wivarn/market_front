import * as Yup from "yup";

import { BlankMessage, GenericErrorMessage } from "components/message";
import { SpinnerLg } from "components/spinner";
import { useSession } from "next-auth/client";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { Form, Formik } from "formik";
import { TextField } from "components/forms/fields";
import { SubmitButton } from "components/buttons";
import { MessageApi } from "services/backendApi/message";
import { toast } from "react-toastify";
import PageContainer from "components/pageContainer";
import { IMessage } from "types/message";
import { IUser } from "types/user";

export default function SendMessage(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const [session, sessionLoading] = useSession();

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

  const { messagesResponse, messagesLoading, messagesError } = getMessages();

  if (sessionLoading || messagesLoading) return <SpinnerLg text="Loading..." />;
  if (messagesError) return <GenericErrorMessage />;

  const correspondent: IUser = messagesResponse.data.correspondent;
  const messages: IMessage[] = messagesResponse.data.messages;

  function renderMessages() {
    if (!messages.length) return renderNoMessages();

    return (
      <div className="grid grid-cols-1">
        {messages.map((message) => renderMessage(message))}
      </div>
    );
  }

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
        className={`w-1/2 ${
          currentUserMessage ? "justify-self-end" : "justify-self-start"
        }`}
      >
        <div
          className={`p-1 m-1 mx-auto border rounded ${
            currentUserMessage ? "bg-info-lighter" : "bg-accent-lighter"
          }`}
        >
          {message.body}
        </div>
        <div className="text-xs">{message.created_at}</div>
      </div>
    );
  }

  function renderMessageForm() {
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
              <span className="flex flex-wrap items-end space-x-4 text-sm">
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
        {renderMessages()}
        {renderMessageForm()}
      </PageContainer>
    </>
  );
}
