import { Account } from "types/account";
import { base } from "./base";

export const AuthApi = (accessToken?: string) => {
  const login = async (login: string, password: string) => {
    return await base.post("auth/login", {
      login: login,
      password: password,
    });
  };

  const logout = async () => {
    return await base.post(
      "auth/logout",
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const createAccount = async (account: Account) => {
    return await base.post("/auth/create-account", {
      login: account.email,
      given_name: account.givenName,
      family_name: account.familyName,
      password: account.password,
      "password-confirm": account.passwordConfirmation,
    });
  };

  const refreshToken = async (refreshToken: string) => {
    return await base.post(
      "/auth/jwt-refresh",
      {
        refresh_token: refreshToken,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const verifyAccount = async (key: string) => {
    return await base.post("/auth/verify-account", {
      key: key,
    });
  };

  const passwordResetRequest = async (email: string) => {
    return await base.post("/auth/reset-password-request", {
      login: email,
    });
  };

  return {
    login,
    logout,
    createAccount,
    refreshToken,
    verifyAccount,
    passwordResetRequest,
  };
};
