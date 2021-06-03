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

  return { login, logout, createAccount };
};
