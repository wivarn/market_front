import NextAuth from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    error?: string;
  }
}

declare module "next-auth" {
  interface User {
    access_token: string;
    refresh_token: string;
    success: string;
  }

  interface Session {
    accountId: number | string;
    expires: string;
    accessToken: string;
    error?: string;
  }
}
