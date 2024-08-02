import "@testing-library/jest-dom/vitest";
import { setupServer } from "msw/node";
const server = setupServer(...handlers);

import { handlers } from "@/app/msw";

import { afterAll, afterEach, beforeAll } from "vitest";

// beforeAll()에서 msw 서버 시작
beforeAll(() => {
  console.log("Server Open!");
  server.listen();
});

// afterEach()에서 msw 서버 리셋
afterEach(() => server.resetHandlers());

// afterAll()에서 msw 서버 종료
afterAll(() => server.close());

// Mock useRouter:
vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: vi.fn(),
      replace: vi.fn(),
    };
  },
}));

vi.mock("next-auth/react", () => ({
  signIn: vi.fn(async ({ email, password }) => {
    if (email === "blackberry1114@naver.com" && password === "aaaa2222!") {
      const accessToken = "asdasdasdasd";
      const refreshToken = "asdasf1weads";

      return {
        message: "로그인에 성공했습니다.",
        data: {
          accessToken,
          refreshToken,
          email: email,
          nickname: "블랙베리",
        },
        success: true,
      };
    } else {
      return {
        message: "로그인에 실패했습니다.",
        error: "로그인에 실패했습니다.",
        success: false,
      };
    }
  }),
}));
