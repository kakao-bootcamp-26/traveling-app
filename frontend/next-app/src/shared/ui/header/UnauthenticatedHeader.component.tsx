import MainLogo from "@/shared/ui/logo/MainLogo";
import React from "react";

export default function UnauthenticatedHeader() {
  return (
    <header className="px-4 py-2 flex justify-between">
      <MainLogo fontSize="24px" />
    </header>
  );
}
