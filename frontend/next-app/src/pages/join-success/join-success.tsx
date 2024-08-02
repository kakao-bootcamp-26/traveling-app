import React from "react";
import CheckSuccessContainer from "@/pages/join-success/check-success-container";
import Welcome from "@/pages/join-success/welcome";
import Forbidden from "@/pages/join-success/forbidden";

export default function JoinSuccess() {
  return <CheckSuccessContainer welcome={<Welcome />} forbidden={<Forbidden />} />;
}
