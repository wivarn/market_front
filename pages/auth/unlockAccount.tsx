import { AuthApi } from "services/backendApi/auth";
import { NextSeo } from "next-seo";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function unlockAccount(): JSX.Element {
  const router = useRouter();

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
          toast.error(error.response.data.error);
        });
    }
  }, [router.isReady]);
  return (
    <>
      <NextSeo title="Unlock Account" />
    </>
  );
}
