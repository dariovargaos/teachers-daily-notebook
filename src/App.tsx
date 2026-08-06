import { createBrowserRouter, RouterProvider } from "react-router";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/planner/Planner";
import LandingPage from "./pages/landing/Landing";
import Roster from "./pages/roster/Roster";
import RecordsLists from "./pages/records/RecordsLists";
import Signin from "./pages/login/Signin";
import Signup from "./pages/signup/Signup";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ResetPassword from "./pages/reset-password/ResetPassword";
import NotFound from "./pages/not-found/NotFound";
import ErrorPage from "./pages/error/ErrorPage";
import Terms from "./pages/terms/Terms";
import Privacy from "./pages/privacy/Privacy";
import Cookies from "./pages/cookies/Cookies";
import CookieBanner from "./components/layout/CookieBanner";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    Component: LandingPage,
  },
  {
    path: "/planer",
    errorElement: <ErrorPage />,
    Component: () => (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Home },
      { path: "razred", Component: Roster },
      { path: "evidencija", Component: RecordsLists },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/prijava",
    errorElement: <ErrorPage />,
    Component: Signin,
  },
  {
    path: "/registracija",
    errorElement: <ErrorPage />,
    Component: Signup,
  },
  {
    path: "/zaboravljena-lozinka",
    errorElement: <ErrorPage />,
    Component: ForgotPassword,
  },
  {
    path: "/reset-password",
    errorElement: <ErrorPage />,
    Component: ResetPassword,
  },
  {
    path: "/uvjeti-koristenja",
    errorElement: <ErrorPage />,
    Component: Terms,
  },
  {
    path: "/politika-privatnosti",
    errorElement: <ErrorPage />,
    Component: Privacy,
  },
  {
    path: "/politika-kolacica",
    errorElement: <ErrorPage />,
    Component: Cookies,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <CookieBanner />
    </>
  );
}

export default App;
