import { lazy, memo } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { NotFoundPage } from "./pages/404";

const UserPage = lazy(() => import("./pages/users"));

/**
 * Router for Web view
 * @returns routes config
 */
const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <UserPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return routes;
};

// Prevent re-render router objecsts
export default memo(() => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
));
