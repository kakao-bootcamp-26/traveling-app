import { LoginCard } from "@/pages/login/components/LoginCard";
import { Typography } from "antd";
import Icon from "@/assets/images/main-icon.png";

export default function LoginPage() {
  return (
    <section className="h-[100vh] overflow-hidden flex bg-mint">
      <article className="w-[50vw] h-[100%]">
        <div className="flex flex-col justify-start w-[70%] relative top-[50%] -translate-y-[50%] -translate-x-[50%] left-[50%]">
          <img src={Icon} alt="icon" className="w-[100%]" />
          <Typography.Title level={1} className="text-center text-white ">
            GO.A.T
          </Typography.Title>
          <Typography.Title level={3} className="text-center text-white">
            Go And Travel
          </Typography.Title>
        </div>
      </article>
      <article className="relative w-[50vw]">
        <LoginCard />
      </article>
    </section>
  );
}
