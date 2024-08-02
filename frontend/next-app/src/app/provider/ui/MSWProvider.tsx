"use client";

import { type PropsWithChildren, useState, useEffect } from "react";

const isMockingMode = process.env.NEXT_PUBLIC_MOCKING_MODE === "enabled";

const MSWProvider = ({ children }: PropsWithChildren) => {
  const [mswReady, setMswReady] = useState(() => !isMockingMode);

  useEffect(() => {
    const init = async () => {
      if (isMockingMode) {
        import("@/app/msw/index").then((res) => {
          const initMocks = res.initMocksWhenDevelopment;
          initMocks &&
            initMocks().finally(() => {
              setMswReady(true);
            });
        });
      }
    };
    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  if (!mswReady) return null;

  return <>{children}</>;
};

export default MSWProvider;
