"use client";

import { validateJoinSuccessFromSessionStorage } from "@/features/join/lib";
import type React from "react";
import { useEffect, useState } from "react";

type Props = {
  welcome: React.ReactNode;
  forbidden: React.ReactNode;
};

export default function CheckSuccessContaienr({ welcome, forbidden }: Props) {
  const [isValidate, setIsValidate] = useState(false);

  useEffect(() => {
    const isValidPageAccess = validateJoinSuccessFromSessionStorage<boolean>();
    if (isValidPageAccess) {
      setIsValidate(true);
    }
  }, []);

  return isValidate ? welcome : forbidden;
}
