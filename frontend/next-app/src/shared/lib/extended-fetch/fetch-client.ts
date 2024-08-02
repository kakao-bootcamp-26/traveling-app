// https://github.com/clarity-digital/nextjs-jwt-app-router/blob/master/src/lib/fetch-client.ts
import { getSession } from "next-auth/react";

interface FetchClientProps<T> {
  method?: string;
  url: string;
  body?: T;
  token?: string;
}

async function fetchClient<T extends object | null>({
  method = "GET",
  url,
  body,
  token,
}: FetchClientProps<T>) {
  try {
    const session = await getSession();
    const accessToken = token || session?.user.accessToken;
    const response = await fetch(url.toString(), {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: method === "GET" ? undefined : JSON.stringify(body),
    });

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (error) {
    console.error("fetchClient error", error);
    throw new Error("fetchClient error");
  }
}

export { fetchClient };
