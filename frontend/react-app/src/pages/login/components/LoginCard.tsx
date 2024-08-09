import { GoogleCircleFilled } from "@ant-design/icons";
import { Button } from "@blog/components";
import { Typography } from "antd";
import React from "react";

export function LoginCard() {
  const loginHandler = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?&response_type=code
		&scope=email profile`;
  };

  return (
    <main className="absolute top-[50%] -translate-y-[50%] min-h-[50vh] left-[50%] -translate-x-[50%] w-[70%] bg-white shadow-lg rounded-lg hover:shadow-2xl py-6 px-4 flex flex-col justify-center">
      <div className="px-4 mb-4">
        <Typography.Title level={1} className="text-center">
          GO.A.T
        </Typography.Title>
      </div>

      <hr />

      <div className="px-4 my-6">
        <Typography.Title level={3}>로그인</Typography.Title>
        <Typography.Paragraph>구글로 로그인을 할 수 있습니다</Typography.Paragraph>

        <Button
          size="large"
          className="w-[100%] bg-mint-dark text-white text-[17px] py-6"
          onClick={loginHandler}
        >
          <GoogleCircleFilled />
          Google Login
        </Button>
      </div>
      {/* <hr />
      <div className="px-4 mt-4">
        <Typography.Title level={3}>계정이 없으신가요?</Typography.Title>
        <Typography.Paragraph>회원가입을 해주세요.</Typography.Paragraph>
        <Button size="large" className="w-[100%] bg-mint-dark text-white text-[17px]">
          회원가입
        </Button>
      </div> */}
    </main>
  );
}
