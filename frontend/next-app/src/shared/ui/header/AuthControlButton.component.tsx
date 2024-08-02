"use client";
import LogoutButton from "@/shared/ui/button/LogoutButton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function AuthControlButton() {
  const { data: session } = useSession();
  const nickname = session?.user?.nickname || "Guest";
  const encodedNickname = encodeURIComponent(nickname);
  const isAuth = session !== null;

  return (
    <div className="flex gap-x-2">
      {!isAuth && <Link href="/login">로그인</Link>}
      {isAuth && (
        <>
          <span>
            <strong className="font-semibold underline underline-offset-2 cursor-pointer">
              {session?.user?.nickname ? (
                <Link href={`/profile/${encodedNickname}`}>{session.user?.nickname}</Link>
              ) : (
                " Guest"
              )}
            </strong>
            님 안녕하세요
          </span>
          <LogoutButton className="text-[14px]" />
        </>
      )}
    </div>
  );
}
