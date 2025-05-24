import { prismaClient } from "@/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID ?? "",
      clientSecret: process.env.CLIENT_SECRET ?? "",
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET ?? "secret",

  callbacks: {
    async signIn({
      account,
      profile,
      user,
    }: {
      user: any;
      account: any | null;
      profile?: any;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, unknown>;
    }): Promise<boolean> {
      if (account.provider === "google") {
        if (profile.email_verified) {
          const existingUser = await prismaClient.user.findUnique({
            where: { email: profile.email },
          });

          if (!existingUser) {
            await prismaClient.user.create({
              data: {
                email: user.email,
                name: user.name ?? "user",
                image: user.image ?? "",
                provider: "Google",
              },
            });
          }

          return true;
        } else {
          return false;
        }
      }

      return false;
    },
  },
});

export { handler as GET, handler as POST };
