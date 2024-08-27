import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { router } from "@/routes";
import { ConfigProvider } from "antd";

function App() {
  return (
    <HelmetProvider>
      <RecoilRoot>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "MangoDdobak-B",
            },
          }}
        >
          <RouterProvider router={router} />
        </ConfigProvider>
      </RecoilRoot>
    </HelmetProvider>
  );
}

export default App;
