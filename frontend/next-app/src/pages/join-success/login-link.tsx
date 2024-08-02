"use client";
import Link from "next/link";
import React from "react";

export default function LoginLink() {
  const clickHandler = () => {
    sessionStorage.removeItem("joinSuccess");
  };
  return (
    <Link
      onClick={clickHandler}
      className="underline underline-offset-4 font-semibold"
      href="/login"
    >
      로그인하러 가기
    </Link>
  );
}
