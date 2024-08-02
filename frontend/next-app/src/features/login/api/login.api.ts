import type { LoginSchemaType } from "@/features/login/model/index";

export async function login(loginDTO: LoginSchemaType) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(loginDTO),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("로그인에 실패했습니다.");
    }
    return response;
  } catch (error) {
    console.error("로그인 실패", error);
    throw new Error("로그인에 실패했습니다.");
  }
}
