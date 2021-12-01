import { useEffect, useState } from "react";

import { AuthApi } from "services/backendApi/auth";
import { GenericErrorMessage } from "components/message";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { SpinnerLg } from "components/spinner";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function verifyAccount(): JSX.Element {
  const router = useRouter();
  const [errorPage, setErrorPage] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const { key } = router.query;

    if (key) {
      AuthApi()
        .verifyAccount(`${key}`)
        .then((response) => {
          signIn("jwt", {
            ...response.data,
            redirect: false,
          }).then(() => {
            toast.success(response.data.success);
            router.push("/account/address");
          });
        })
        .catch((error) => {
          setErrorPage(true);
          toast.error(error.response.data.error);
        });
    }
  }, [router.isReady]);

  if (errorPage)
    return (
      <PageContainer>
        <GenericErrorMessage />
      </PageContainer>
    );
  return (
    <>
      <NextSeo title="Verify Account" />
      <SpinnerLg text="Loading..." />
    </>
  );
}
