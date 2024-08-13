import { GoogleCircleFilled } from "@ant-design/icons";
// import { Button } from "@blog/components";
import { Button, Typography } from "antd";
import { useLoginHandler } from "@/pages/login/hooks/useLoginHandler";

export function LoginCard() {
  const { loginHandler } = useLoginHandler();

  return (
    <main className="absolute top-[50%] -translate-y-[50%] min-h-[35vh] left-[50%] -translate-x-[50%] w-[70%] bg-white shadow-lg rounded-lg hover:shadow-2xl py-6 px-4 flex flex-col justify-between">
      <div className="px-4 mb-4">
        <div className="flex flex-col mb-4">
          <Typography.Text className="text-[20px] font-semibold font-pretendard">
            GO.A.T에
          </Typography.Text>
          <Typography.Text className="text-[20px] font-semibold font-pretendard">
            오신 것을 환영합니다!
          </Typography.Text>
        </div>
        <div className="flex flex-col">
          <Typography.Text className="text-[15px]">Travel More, Worry Less</Typography.Text>
          <Typography.Text className="text-[15px]">
            더 많이 여행하고, 걱정은 덜어내세요
          </Typography.Text>
        </div>
      </div>

      <hr className="border-[1px] mb-4" />

      <div className="flex flex-col px-4 mb-6 gap-y-2">
        <Typography.Title level={4}>로그인</Typography.Title>
        <div className="flex flex-col mb-6 gap-y-1">
          <Typography.Text className="text-[14px] font-semibold font-pretendard">
            GOAT 서비스가 처음이신가요?
          </Typography.Text>
          <Typography.Text className="text-[14px] font-semibold font-pretendard">
            <u className="mr-[2px] font-pretendard underline-offset-2">구글 계정</u>으로 로그인을 할
            수 있습니다
          </Typography.Text>
        </div>
        <div>
          <Button
            size="large"
            className="w-[100%] bg-mint-dark text-white text-[17px] py-6"
            onClick={loginHandler}
          >
            <GoogleCircleFilled />
            Google Login
          </Button>
        </div>
      </div>
    </main>
  );
}
