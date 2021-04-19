import { useState, useEffect, useCallback } from "react";
import { Auth, Hub } from "aws-amplify";
import { CognitoUserExt } from "./types";

export default function useAuth() {
  const [user, setUser] = useState<CognitoUserExt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn": {
          console.log(data);
          setUser(data);
          break;
        }
        case "signOut": {
          setUser(null);
          break;
        }
        default:
          break;
      }
    });
  }, []);

  const checkUserAuth = useCallback(async () => {
    try {
      const cognitoUser = (await Auth.currentAuthenticatedUser()) as CognitoUserExt;
      setUser(cognitoUser);
    } catch (err) {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkUserAuth();
    const unsubscribe = Hub.listen("auth", () => checkUserAuth());
    return () => unsubscribe();
  }, [checkUserAuth]);

  return { user: user, loading };
}
