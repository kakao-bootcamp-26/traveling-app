import type { JoinSchemaType } from "@/features/join/model/index";
import { JoinSchema } from "@/features/join/model/index";
import { http, HttpResponse } from "msw";
import jwt from "jsonwebtoken";
import { mockUsers } from "@/app/msw/mocks/user";

const SECRET_KEY = "your-secret-key";
const EXPIRES_IN = "1h";
const REFRESH_EXPIRES_IN = "7d";

const createToken = (payload: object, expiresIn: string) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const authHandlers = [
  http.post(`*/api/join`, async ({ request }) => {
    const form = await request.json();
    try {
      JoinSchema.parse(form);
      return HttpResponse.json({
        message: "회원가입에 성공했습니다.",
        success: true,
      });
    } catch (error) {
      console.log("회원가입 실패", error);
      return HttpResponse.json({
        message: "회원가입에 실패했습니다.",
        success: false,
      });
    }
  }),
  http.post(`*/api/login`, async ({ request }) => {
    const form = (await request.json()) as { email: string; password: string };
    if (form.email === "blackberry1114@naver.com") {
      const accessToken = createToken({ email: form.email }, EXPIRES_IN);
      const refreshToken = createToken({ email: form.email }, REFRESH_EXPIRES_IN);
      const cookies = [
        `accessToken=${accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=900`,
        `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`,
        "connect.sid=msw-cookie;HttpOnly;Path=/",
      ].join("; ");

      const response = new HttpResponse(
        JSON.stringify({
          message: "로그인에 성공했습니다.",
          data: {
            accessToken,
            refreshToken,
            email: form.email,
            nickname: "블랙베리",
          },
          success: true,
        }),
        {
          headers: {
            "Set-Cookie": cookies,
            "content-type": "application/json",
          },
        },
      );

      return response;
    } else {
      return HttpResponse.json({
        message: "로그인에 실패했습니다.",
        success: false,
      });
    }
  }),
  http.post("*/api/auth/check-duplicate", async ({ request }) => {
    const body = await request.json();
    const { field, value } = body as { field: keyof JoinSchemaType; value: string };

    const user = mockUsers.find((user) => user[field] === value);
    if (!user) {
      return HttpResponse.json({
        message: "사용 가능한 아이디입니다.",
        success: true,
      });
    } else {
      return HttpResponse.json({
        message: "이미 사용중입니다.",
        success: false,
      });
    }
  }),
];
