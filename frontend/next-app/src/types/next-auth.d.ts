import type { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  email: string;
  accessToken: string;
  refreshToken: string;
  nickname: string;
};

declare module "next-auth" {
  type Session = {
    user: ExtendedUser;
    accessToken?: string;
    refreshToken?: string;
  } & DefaultSession;

  interface User {
    id?: string;
    email?: string;
    name?: string;
    nickname?: string;
    image?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "@auth/core/jwt" {
  // interface JWT extends ExtendedUser {}
  type JWT = {
    id: string;
    email: string;
    name: string;
    picture: string;
    sub: string;
    accessToken?: string;
    refreshToken?: string;
  };
}
