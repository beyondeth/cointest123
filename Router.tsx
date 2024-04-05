import { createBrowserRouter } from "react-router-dom";
import Coin from "./routes/Coin";
import App from "./App";
import Coins from "./routes/Coins";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: ":coinId",
      element: <Coin />,
    },

    // react-router-dom 에게 우리가 Root의 자식을 render 하길 원한다고 말해줘야함 Root.tsx로 가서 Outlet 이라는 컴포넌트를 적어줘야함//
  ]
  // errorElement: <NotFound />,
);
export default router;
