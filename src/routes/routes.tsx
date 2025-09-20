import HomePage from "@/pages/HomePage";
import type { RouteObject } from "react-router-dom";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
];
