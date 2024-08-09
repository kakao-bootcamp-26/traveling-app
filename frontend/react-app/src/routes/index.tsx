import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/index";
import HomePage from "@/pages/home/page";
import { AuthLayout } from "@/layouts/AuthLayout";
import LoginPage from "@/pages/login/page";

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
        element: <HomePage />,
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
