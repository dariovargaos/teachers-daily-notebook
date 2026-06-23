import { createBrowserRouter, RouterProvider } from "react-router";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/home/Home";
import Signin from "./pages/login/Signin";
import Signup from "./pages/signup/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },

  {
    path: "/signin",
    Component: Signin,
  },

  {
    path: "/signup",
    Component: Signup,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
