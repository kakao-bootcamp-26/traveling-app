import "server-only";

type FetchServerProps<T> = {
  method?: string;
  url: string;
  body?: T;
  cache?: "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload";
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

async function fetchServer<T>({
  method = "GET",
  url,
  body,
  cache = "force-cache",
  next = undefined,
}: FetchServerProps<T>) {
  try {
    const response = await fetch(url.toString(), {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: method === "GET" ? undefined : JSON.stringify(body),
      cache,
      next,
    });

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (error) {
    console.error("fetchServer error", error);
    throw new Error("fetchServer error");
  }
}

export { fetchServer };
