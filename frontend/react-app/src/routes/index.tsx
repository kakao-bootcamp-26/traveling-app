import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/index";
import { AuthLayout } from "@/layouts/AuthLayout";
import LoginPage from "@/pages/login/page";
import { lazy, Suspense } from "react";

const HomePage = lazy(async () => await import("@/pages/home/page"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/main",
        element: (
          <Suspense fallback={<>로딩</>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: <h1>About</h1>,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);
