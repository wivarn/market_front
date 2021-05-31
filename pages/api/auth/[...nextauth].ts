import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import api from "services/api";

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
          const response = await api.post("auth/login", {
            login: credentials.login,
            password: credentials.password,
          });

          if (response) {
            const profile = await api.get("profile", {
              headers: {
                Authorization: `Bearer ${response.data.access_token}`,
              },
            });
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
