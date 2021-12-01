import { useEffect, useState } from "react";

import { AuthApi } from "services/backendApi/auth";
import { GenericErrorMessage } from "components/message";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { SpinnerLg } from "components/spinner";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function unlockAccount(): JSX.Element {
  const router = useRouter();
  const [errorPage, setErrorPage] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const { key } = router.query;

    if (key) {
      AuthApi()
        .unlockAccount(`${key}`)
        .then((response) => {
          toast.success(response.data.success);
          router.push("/");
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
      <NextSeo title="Unlock Account" />
      <SpinnerLg text="Loading..." />
    </>
  );
}
