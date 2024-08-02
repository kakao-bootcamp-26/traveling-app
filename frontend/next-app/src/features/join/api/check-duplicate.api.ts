export async function checkDuplicate(field: string, value: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check-duplicate`, {
      method: "POST",
      body: JSON.stringify({ field, value }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("중복확인에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.log("중복확인 실패", error);
  }
}
