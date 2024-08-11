import { Logo } from "@/pages/login/components/Logo";
import { LoginCard } from "@/pages/login/components/LoginCard";
import { Typography } from "antd";

export default function LoginPage() {
  return (
    <section className="h-[100vh] overflow-hidden flex bg-mint">
      <article className="w-[50vw] h-[100%] flex flex-col justify-center items-center">
        <div className="flex flex-col justify-start w-[70%]">
          <Typography.Title
            level={1}
            className="text-center"
            style={{
              fontWeight: "bold",
            }}
          >
            GO.A.T
          </Typography.Title>
          <Typography.Title
            level={3}
            className="text-center"
            style={{
              margin: "0",
            }}
          >
            Go And Travel
          </Typography.Title>
          <Logo />
        </div>
      </article>
      <article className="relative w-[50vw]">
        <LoginCard />
      </article>
    </section>
  );
}
