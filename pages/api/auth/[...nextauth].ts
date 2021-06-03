import { AuthApi } from "services/backendApi/auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";
import { ProfileApi } from "services/backendApi/profile";
import Providers from "next-auth/providers";

process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL || process.env.VERCEL_URL;

interface Credentials {
  login: string;
  password: string;
}

const accessTokenAge = 29 * 1000; // 29 minutes, backend is configured for 30 minutes

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
      accessTokenExpires: Date.now() + accessTokenAge,
      refreshToken: refreshedTokens.refresh_token,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      authorize: async (credentials: Credentials) => {
        try {
          const response = await AuthApi().login(
            credentials.login,
            credentials.password
          );

          if (response) {
            const profile = await ProfileApi(
              response.data.access_token
            ).myProfile();
            return { ...response.data, ...profile.data };
          }
        } catch (_) {
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXT_AUTH_SECRET,

  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.access_token;
        token.accessTokenExpires = Date.now() + accessTokenAge;
        token.refreshToken = user.refresh_token;
        token.givenName = user.given_name;
        token.picture = user.picture;
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      return refreshAccessToken(token);
    },

    async session(session, token: JWT) {
      session.accessToken = token.accessToken;
      session.user.name = token.givenName;
      session.user.id = token.sub;
      return session;
    },
  },
  session: {
    maxAge: 14 * 24 * 60 * 60, // 14 days
  },
});
