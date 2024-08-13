import { Logo } from "@/pages/login/components/Logo";
import { LoginCard } from "@/pages/login/components/LoginCard";
import { Typography } from "antd";
import { Helmet } from "react-helmet-async";

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>GO.A.T Login</title>
        <meta name="description" content="GO.A.T Login" />
        {/* Open Graph */}
        <meta property="og:title" content="GO.A.T Login" />
        <meta property="og:description" content="GO.A.T Login" />
        <meta property="og:image" content="https://via.placeholder.com/1200" />
        <meta property="og:url" content="https://www.google.com" />
        <meta property="og:type" content="website" />
        {/* Twitter */}
        <meta property="twitter:title" content="GO.A.T Login" />
        <meta property="twitter:description" content="GO.A.T Login" />
        <meta property="twitter:image" content="https://via.placeholder.com/1200" />
        <meta property="twitter:card" content="summary_large_image" />
      </Helmet>
      <section className="h-[100vh] bg-mint flex overflow-x-scroll">
        <article className="w-[50vw] h-[100%] flex flex-col justify-center items-center min-w-[500px]">
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
        <article className="relative w-[50vw] min-w-[500px]">
          <LoginCard />
        </article>
      </section>
    </>
  );
}
