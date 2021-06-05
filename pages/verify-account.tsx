import { AuthApi } from "services/backendApi/auth";
import { NextSeo } from "next-seo";
import { signIn } from "next-auth/client";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function verifyAccount() {
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
          toast(response.data.success);
          router.push("/");
        })
        .catch((error) => {
          toast(error.response.data.error);
        });
    }
  }, [router.isReady]);
  return (
    <>
      <NextSeo title="Verify Account" />
      <div>Spinner</div>
    </>
  );
}
