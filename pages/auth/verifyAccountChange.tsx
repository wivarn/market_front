import { AuthApi } from "services/backendApi/auth";
import { NextSeo } from "next-seo";
import { SpinnerLg } from "components/spinner";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function verifyAccountChange(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { key } = router.query;

    if (key) {
      AuthApi()
        .verifyLoginChange(`${key}`)
        .then((response) => {
          toast.success(response.data.success);
          router.push("/account/profile");
        })
        .catch((error) => {
          toast.error(error.response.data.error);
        });
    }
  }, [router.isReady]);
  return (
    <>
      <NextSeo title="Verify Login Email Change" />
      <SpinnerLg text="Loading..." />
    </>
  );
}
