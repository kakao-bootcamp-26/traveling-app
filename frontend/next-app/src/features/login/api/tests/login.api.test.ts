import { login } from "@/features/login/api/login.api";
import type { LoginSchemaType } from "@/features/login/model/index";

describe("login api", () => {
  const failureLoginDTO: LoginSchemaType = {
    email: "test@example.com",
    password: "Password1!",
  };

  const successLoginDTO: LoginSchemaType = {
    email: "blackberry1114@naver.com",
    password: "Password1!",
  };

  it("should call fetch with the correct arguments", async () => {
    const response = await login(successLoginDTO);
    const body = await response.json();

    expect(body.message).toBe("로그인에 성공했습니다.");
    expect(body.data.email, "blackberry1114@naver.com");
    expect(body.success).toBe(true);
  });

  it("should call fetch with the wrong arguments", async () => {
    const response = await login(failureLoginDTO);
    const body = await response.json();

    expect(body).toEqual({
      message: "로그인에 실패했습니다.",
      success: false,
    });
  });
});
