import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",
  },
};

export default NextAuth(authOptions);
