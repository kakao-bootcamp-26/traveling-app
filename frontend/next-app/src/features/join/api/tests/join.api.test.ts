import { join } from "@/features/join/api/join.api";

describe("회원가입 테스트 케이스", () => {
  it("회원가입에 성공하면, ", async () => {
    const joinForm = {
      username: "testuser",
      password: "aaaa2222!",
      passwordConfirmation: "aaaa2222!",
      email: "test@example.com",
      nickname: "devLee",
    };

    const result = await join(joinForm);

    expect(result).toEqual({
      success: true,
      message: "회원가입에 성공했습니다.",
    });
  });

  it("비밀번호 유효성 검사 통과를 못할 경우에, 회원가입 요청 시 에러 메시지를 보여준다", async () => {
    const joinForm = {
      username: "testuser",
      password: "testpassword",
      passwordConfirmation: "testpassword",
      email: "test@example.com",
      nickname: "testnickname",
    };

    const result = await join(joinForm);

    expect(result).toEqual({
      success: false,
      message: "회원가입에 실패했습니다.",
    });
  });

  it("비밀번호가 일치하지 않는 경우, 회원가입 요청 시 에러 메시지를 보여준다", async () => {
    const joinForm = {
      username: "testuser",
      password: "aaaa1111!",
      passwordConfirmation: "aaaa1111@",
      email: "test@example.com",
      nickname: "testnickname",
    };

    const result = await join(joinForm);

    expect(result).toEqual({
      success: false,
      message: "회원가입에 실패했습니다.",
    });
  });
});
