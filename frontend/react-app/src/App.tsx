import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { router } from "@/routes";
import { ConfigProvider } from "antd";

function App() {
  return (
    <HelmetProvider>
      <RecoilRoot>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: "MangoDdobak-B",
              },
            }}
          >
            <RouterProvider router={router} />
          </ConfigProvider>
        </GoogleOAuthProvider>
      </RecoilRoot>
    </HelmetProvider>
  );
}

export default App;
