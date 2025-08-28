import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { compareSync } from "bcrypt-ts";

import db from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (credentials: { email: string; password: string }) => {
        const user = await db.user.findFirst({
          where: { email: credentials.email },
        });
        if (!user) return null;

        const passwordMatch = compareSync(credentials.password, user.password);
        if (!passwordMatch) return null;

        Reflect.deleteProperty(user, "password");
        return user;
      },
    }),
  ],
});
