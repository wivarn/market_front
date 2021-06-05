import NextAuth from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    picture: string | null;
    sub: string;
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    givenName: string;
    familyName: string;
  }
}

declare module "next-auth" {
  interface BackendJwt {
    access_token: string;
    refresh_token: string;
    success: string;
  }

  interface User extends BackendJwt {
    id: number;
    email: string;
    status: string;
    given_name: string;
    family_name: string;
    picture: string | null;
  }

  interface Session {
    user: {
      name: string;
      email: string;
      image: string | null;
      id: string;
    };
    expires: string;
    accessToken: string;
  }
}
