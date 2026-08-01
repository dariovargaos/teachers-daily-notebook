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

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Home },
      { path: "roster", Component: Roster },
      { path: "activities", Component: ActivitiesLists },
    ],
  },
  {
    path: "/signin",
    Component: Signin,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/reset-password",
    Component: ResetPassword,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
