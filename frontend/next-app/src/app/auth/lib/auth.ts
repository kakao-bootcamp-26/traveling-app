import { CredentialsProvider } from "@/app/auth/lib/providers";
import NextAuth from "next-auth";

// https://github.com/zulmy-azhary/next-auth-boilerplate/blob/master/auth/index.ts
//https://dev.to/nagatodev/how-to-integrate-next-auth-with-your-nextjs-application-4mn9

// declare module "next-auth" {
//   interface User extends UserType {}
// }

// declare module "next-auth/adapters" {
//   interface AdapterUser extends UserType {}
// }

// declare module "next-auth/jwt" {
//   interface JWT extends UserType {}
// }

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [CredentialsProvider],
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  events: {
    signOut() {},
  },
  callbacks: {
    async jwt({ token, user, session }) {
      console.log("auth.ts jwt", token, user, session);
      if (!token.sub) return token;
      return { ...token, ...user, ...session?.user };
    },
    async session({ session, token, user }) {
      console.log("auth.ts session", session, token, user);
      session.user.email = token.email ?? user.email;
      session.user.accessToken = (token.accessToken as string) ?? user.accessToken;
      session.user.refreshToken = (token.refreshToken as string) ?? user.refreshToken;
      session.user.nickname = (token.nickname as string) ?? user.name;
      session.user.name = (token.nickname as string) ?? user.name;

      return session;
    },
    // async signIn({ user }) {},
  },
  trustHost: true,
});
