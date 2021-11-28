import NextAuth, { User } from "next-auth";

import { AuthApi } from "services/backendApi/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { accessTokenAgeSeconds } from "constants/auth";
import jwtDecode from "jwt-decode";

// Check if this line can be removed
process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL || process.env.VERCEL_URL;

interface Credentials {
  login: string;
  password: string;
}

// this is set to one minute less than clientMaxAge
const accessTokenAgeMS = (accessTokenAgeSeconds - 60) * 1000;

async function refreshAccessToken(token: JWT) {
  try {
    const response = await AuthApi(token.accessToken).refreshToken(
      token.refreshToken
    );

    const refreshedTokens = await response.data;

    if (response.status != 200) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + accessTokenAgeMS,
      refreshToken: refreshedTokens.refresh_token,
    };
  } catch (error: any) {
    console.log(error.response.data);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials: any) {
        console.log(credentials);
        try {
          const response = await AuthApi().login(
            credentials.login,
            credentials.password
          );
          return response.data;
        } catch (error: any) {
          throw new Error(error.response.data.error);
        }
      },
      credentials: {},
    }),
    CredentialsProvider({
      id: "jwt",
      name: "Jwt",
      async authorize(jwt: any) {
        return jwt;
      },
      credentials: {},
    }),
  ],

  secret: process.env.NEXT_AUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token;
        token.accessTokenExpires = Date.now() + accessTokenAgeMS;
        token.refreshToken = user.refresh_token;
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.accountId = jwtDecode<any>(token.accessToken).account_id;
      session.error = token.error;
      return session;
    },
  },
  session: {
    maxAge: 14 * 24 * 60 * 60, // 14 days
  },
});
