import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users/login`;

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(API_URL, credentials);
          const user = response.data;

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Login failed:", error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
