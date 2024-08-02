import { NextResponse } from "next/server";

import { auth } from "@/app/auth/index";

const publicRoute = ["/", "/login", "/join"];
const privateRoute = ["/", "/profile"];

const matcher = [...publicRoute];

export default auth((req) => {
  const currentPath = req.nextUrl.pathname;
  const isAuthenticated = req.auth;
  const isPublicRoute = publicRoute.includes(currentPath);
  const isPrivateRoute = privateRoute.includes(currentPath);

  // TODO: RegExp로 루트 경로를 비교하는 방법을 찾아보자 => FSD 아키텍처로 인한 불편함...
  if (matcher.includes(currentPath)) {
    /* 인증되었는데, 로그인 페이지로 접근하는 경우 */
    if (isPublicRoute) {
      if (isAuthenticated && currentPath !== "/") {
        // redirect to home
        return NextResponse.redirect(new URL(`/?next=${currentPath}`, req.url));
      }
    }
    if (isPrivateRoute) {
      if (!isAuthenticated && currentPath !== "/") {
        // redirect to login
        return NextResponse.redirect(new URL(`/login?next=${currentPath}`, req.url));
      }
    }
  }
});

export const config = {
  matcher: ["/", "/login", "/join"],
};
