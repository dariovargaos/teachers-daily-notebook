import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "./pages/home/Home";
import Signin from "./pages/login/Signin";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },

  {
    path: "/signin",
    Component: Signin,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
