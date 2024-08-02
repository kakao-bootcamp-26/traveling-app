async function initMocks() {
  if (typeof window !== "undefined") {
    const { worker } = await import("./browser");
    worker.start({});
  }
}

export async function initMocksWhenDevelopment() {
  if (process.env.NODE_ENV === "development") {
    initMocks();
  }
}
