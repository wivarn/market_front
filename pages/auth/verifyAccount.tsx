import { AuthApi } from "services/backendApi/auth";
import { NextSeo } from "next-seo";
import { SpinnerLg } from "components/spinner";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function verifyAccount(): JSX.Element {
  const router = useRouter();

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
          });
          toast.success(response.data.success);
          router.push("/account/address");
        })
        .catch((error) => {
          toast.error(error.response.data.error);
        });
    }
  }, [router.isReady]);
  return (
    <>
      <NextSeo title="Verify Account" />
      <SpinnerLg text="Loading..." />
    </>
  );
}
