import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail, validateUser } from "@/services/AuthService";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const email = credentials.email as string;
        const password = credentials.password as string;

        if(!email || !password) throw new Error("Missing credentials");

        const user = await getUserByEmail(email);

        if(!user) throw new Error("Email not found");

        const isValid = await validateUser(user, password);
        if(isValid) return user;

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});