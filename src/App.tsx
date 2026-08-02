import { createBrowserRouter, RouterProvider } from "react-router";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/home/Home";
import Roster from "./pages/roster/Roster";
import ActivitiesLists from "./pages/activities/ActivitiesLists";
import Signin from "./pages/login/Signin";
import Signup from "./pages/signup/Signup";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ResetPassword from "./pages/reset-password/ResetPassword";
import NotFound from "./pages/not-found/NotFound";
import ErrorPage from "./pages/error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    Component: () => (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Home },
      { path: "roster", Component: Roster },
      { path: "activities", Component: ActivitiesLists },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/signin",
    errorElement: <ErrorPage />,
    Component: Signin,
  },
  {
    path: "/signup",
    errorElement: <ErrorPage />,
    Component: Signup,
  },
  {
    path: "/forgot-password",
    errorElement: <ErrorPage />,
    Component: ForgotPassword,
  },
  {
    path: "/reset-password",
    errorElement: <ErrorPage />,
    Component: ResetPassword,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
