import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "database",
    },
};