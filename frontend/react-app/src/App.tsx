import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { router } from "@/routes";

function App() {
  return (
    <HelmetProvider>
      <RecoilRoot>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </RecoilRoot>
    </HelmetProvider>
  );
}

export default App;
