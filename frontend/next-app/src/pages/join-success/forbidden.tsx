import LoginLink from "@/pages/join-success/login-link";
import React from "react";
import SadDog from "@/shared/assets/images/forbidden.png";
import Image from "next/image";

export default function Forbidden() {
  return (
    <main className="min-w-[300px]">
      <section className="flex justify-center ">
        <div style={{ width: "50vw", height: "50vw", position: "relative" }}>
          <Image alt="forbidden" src={SadDog} layout="fill" objectFit="contain" />
        </div>

        <div className="flex flex-col items-center justify-between py-6">
          <div>
            <h1 className="text-2xl font-bold text-red-300 mb-4">접근 권한이 없습니다. </h1>
            <p className="">이 페이지에 접근할 권한이 없습니다.</p>
          </div>
          <LoginLink />
        </div>
      </section>
    </main>
  );
}
