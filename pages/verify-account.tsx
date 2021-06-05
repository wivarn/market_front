import { AuthApi } from "services/backendApi/auth";
import { NextSeo } from "next-seo";
import { signIn } from "next-auth/client";
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
        .then((verifyResponse) => {
          signIn("jwt", {
            ...verifyResponse.data,
            redirect: false,
          });
        })
        .then(() => {
          router.push("/");
        })
        .catch(() => {});
    }
  }, [router.isReady]);
  return (
    <>
      <NextSeo title="Verify Account" />
      <div>Spinner</div>
    </>
  );
}
