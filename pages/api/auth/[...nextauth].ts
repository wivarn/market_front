import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import api from "services/api";

process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL || process.env.VERCEL_URL;

interface Credentials {
  login: string;
  password: string;
}

interface Token {
  email: string;
  picture: string | null;
  sub: string;
  accessToken: string;
  givenName: string;
  familyName: string;
  iat: number;
  exp: number;
}

interface User {
  access_token: string;
  refresh_token: string;
  success: string;
  id: number;
  email: string;
  status: string;
  given_name: string;
  family_name: string;
  picture: string | null;
}

interface SessionUser {
  name: string;
  email: string;
  image: string | null;
  id: string;
}

interface Session {
  user: SessionUser;
  expires: string;
  accessToken: string;
}

const providers = [
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
];

const callbacks = {
  async jwt(token: Token, user: User) {
    if (user) {
      token.accessToken = user.access_token;
      token.givenName = user.given_name;
      token.picture = user.picture;
    }
    return token;
  },

  async session(session: Session, token: Token): Promise<Session> {
    session.accessToken = token.accessToken;
    session.user.name = token.givenName;
    session.user.id = token.sub;
    return session;
  },
};

const options = {
  providers,
  callbacks,
  session: {
    maxAge: 15 * 60,
  },
  pages: {
    error: "/login", // Changing the error redirect page to our custom login page
  },
};

// @ts-ignore
export default (req, res) => NextAuth(req, res, options);
