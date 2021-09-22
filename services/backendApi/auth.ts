import { AxiosResponse } from "axios";
import { ICreateAccount } from "types/account";
import { base } from "./base";

export const AuthApi = (
  accessToken?: string
): {
  login: (login: string, password: string) => Promise<AxiosResponse<any>>;
  logout: () => Promise<AxiosResponse<any>>;
  createAccount: (account: ICreateAccount) => Promise<AxiosResponse<any>>;
  refreshToken: (refreshToken: string) => Promise<AxiosResponse<any>>;
  verifyAccountResend: (login: string) => Promise<AxiosResponse<any>>;
  verifyAccount: (key: string) => Promise<AxiosResponse<any>>;
  passwordResetRequest: (email: string) => Promise<AxiosResponse<any>>;
  resetPassword: (
    key: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<AxiosResponse<any>>;
  unlockAccountRequest: (email: string) => Promise<AxiosResponse<any>>;
  unlockAccount: (key: string) => Promise<AxiosResponse<any>>;
  changeLogin: (login: string, password: string) => Promise<AxiosResponse<any>>;
  verifyLoginChange: (key: string) => Promise<AxiosResponse<any>>;
} => {
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

  const createAccount = async (account: ICreateAccount) => {
    return await base.post("/auth/create-account", {
      login: account.login,
      given_name: account.given_name,
      family_name: account.family_name,
      password: account.password,
      "password-confirm": account.passwordConfirmation,
      marketing: account.marketing,
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

  const verifyAccountResend = async (login: string) => {
    return await base.post("/auth/verify-account-resend", {
      login: login,
    });
  };

  const passwordResetRequest = async (login: string) => {
    return await base.post("/auth/reset-password-request", {
      login: login,
    });
  };

  const resetPassword = async (
    key: string,
    password: string,
    passwordConfirmation: string
  ) => {
    return await base.post("/auth/reset-password", {
      key: key,
      password: password,
      "password-confirm": passwordConfirmation,
    });
  };

  const unlockAccountRequest = async (login: string) => {
    return await base.post("/auth/unlock-account-request", {
      login: login,
    });
  };

  const unlockAccount = async (key: string) => {
    return await base.post("/auth/unlock-account", {
      key: key,
    });
  };

  const changeLogin = async (login: string, password: string) => {
    return await base.post(
      "/auth/change-login",
      {
        login: login,
        password: password,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const verifyLoginChange = async (key: string) => {
    return await base.post("/auth/verify-login-change", {
      key: key,
    });
  };

  return {
    login,
    logout,
    createAccount,
    refreshToken,
    verifyAccount,
    verifyAccountResend,
    passwordResetRequest,
    resetPassword,
    unlockAccountRequest,
    unlockAccount,
    changeLogin,
    verifyLoginChange,
  };
};
