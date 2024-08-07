import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { router } from "@/routes";

function App() {
  return (
    <HelmetProvider>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </HelmetProvider>
  );
}

export default App;
