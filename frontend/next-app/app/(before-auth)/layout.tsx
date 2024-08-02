import type { PropsWithChildren } from "react";
import React from "react";
import { UnauthenticatedHeader } from "../../src/shared/ui/header/index";

export default function UnauthenticatedLayout({ children }: PropsWithChildren) {
  return (
    <>
      <UnauthenticatedHeader />
      {children}
    </>
  );
}
