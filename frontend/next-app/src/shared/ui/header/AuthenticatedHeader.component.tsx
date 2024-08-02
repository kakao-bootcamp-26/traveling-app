import AuthControlButton from "@/shared/ui/header/AuthControlButton.component";
import MainLogo from "@/shared/ui/logo/MainLogo";
import React from "react";

export default function AuthenticatedHeader() {
  return (
    <header className="px-4 py-2 flex justify-between items-center">
      <MainLogo fontSize="24px" />
      <AuthControlButton />
    </header>
  );
}
