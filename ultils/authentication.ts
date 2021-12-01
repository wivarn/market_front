import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export const redirectUnauthenticated = (): void => {
  const router = useRouter();
  useSession({
    required: true,
    onUnauthenticated() {
      router.push(`/login?redirect=${router.pathname}`);
    },
  });
};
