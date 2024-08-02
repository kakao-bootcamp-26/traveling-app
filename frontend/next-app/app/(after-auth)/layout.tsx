import type { PropsWithChildren } from "react";
import React from "react";
import { AuthenticatedHeader } from "../../src/shared/ui/header/index";

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AuthenticatedHeader />
      {children}
    </>
  );
}
