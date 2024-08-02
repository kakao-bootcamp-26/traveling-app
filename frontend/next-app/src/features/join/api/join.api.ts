import type { JoinSchemaType } from "@/features/join/model/join-form.dto";

export async function join(joinForm: JoinSchemaType) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/join`, {
      method: "POST",
      body: JSON.stringify(joinForm),
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("회원가입에 실패했습니다.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("회원가입 실패", error);
    throw new Error("회원가입에 실패했습니다.");
  }
}
