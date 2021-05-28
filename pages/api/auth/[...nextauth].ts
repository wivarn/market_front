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
          const tokens = await api.post("auth/login", {
            login: credentials.login,
            password: credentials.password,
          });

          if (tokens) {
            const profile = await api.get("profile", {
              headers: { Authorization: `Bearer ${tokens.data.access_token}` },
            });
            return { ...tokens.data, ...profile.data };
          }
        } catch (e) {
          const errorMessage = e.response.data.message;
          // Redirecting to the login page with error message in the URL
          throw new Error(errorMessage + "&email=" + credentials.login);
        }
      },
    }),
  ],

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
    maxAge: 30 * 60, // 30 min
  },
  pages: {
    error: "/login", // Changing the error redirect page to our custom login page
  },
});
