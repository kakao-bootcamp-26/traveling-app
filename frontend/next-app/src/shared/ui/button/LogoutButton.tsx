"use client";
import { signOut } from "next-auth/react";
import type { ButtonHTMLAttributes } from "react";

export default function LogoutButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const logoutHandler = () => {
    signOut();
  };
  return (
    <button onClick={logoutHandler} {...props}>
      로그아웃
    </button>
  );
}
