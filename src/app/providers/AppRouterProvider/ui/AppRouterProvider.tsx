import { RouterProvider } from "react-router-dom";
import { routerConfig } from "../../../../shared/config/routerConfig";

export const AppRouterProvider = () => {
  return <RouterProvider router={routerConfig} />;
};
