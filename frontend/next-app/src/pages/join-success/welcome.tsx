import LoginLink from "@/pages/join-success/login-link";
import Image from "next/image";
import React from "react";
import HappyDogs from "@/shared/assets/images/happydog.jpg";

export default function Welcome() {
  return (
    <section className="flex flex-col items-center justify-center relative">
      {/* <div style={{ width: "100vw", height: "100vw", position: "absolute" }}> */}
      <article className=" w-[70vw] h-[70vh] relative flex flex-col items-center justify-center">
        <div
          style={{
            width: "70vw",
            height: "70vw",
            position: "absolute",
            borderRadius: "1rem",
            overflow: "hidden",
          }}
        >
          <Image alt="welcome" src={HappyDogs} layout="fill" objectFit="contain" />
        </div>
        <div className="relative z-10 flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold text-primary">회원가입이 완료되었습니다!</h1>
          <p className="text-lg text-center">이제 강쥐조아와 함께 즐거운 시간을 보내세요!</p>
          <LoginLink />
        </div>
      </article>
    </section>
  );
}
