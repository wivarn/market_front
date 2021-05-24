import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import api from "services/api";

const providers = [
  Providers.Credentials({
    name: "Credentials",
    authorize: async (credentials) => {
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
        // Redirecting to the login page with error message          in the URL
        throw new Error(errorMessage + "&email=" + credentials.email);
      }
    },
  }),
];

const callbacks = {
  async jwt(token, user) {
    if (user) {
      token.accessToken = user.access_token;
      token.giveName = user.given_name;
      token.picture = user.picture;
    }
    return token;
  },

  async session(session, token) {
    session.accessToken = token.accessToken;
    session.user.name = token.giveName;
    return session;
  },
};

const options = {
  providers,
  callbacks,
  pages: {
    error: "/login", // Changing the error redirect page to our custom login page
  },
};

export default (req, res) => NextAuth(req, res, options);
