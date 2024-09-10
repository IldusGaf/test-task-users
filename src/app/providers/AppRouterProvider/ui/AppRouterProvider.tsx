import { RouterProvider } from "react-router-dom";
import { routerConfig } from "../config/routerConfig";

export const AppRouterProvider = () => {
  return <RouterProvider router={routerConfig} />;
};
