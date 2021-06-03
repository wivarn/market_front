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
        token.givenName = user.given_name;
        token.picture = user.picture;
      }
      return token;
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
