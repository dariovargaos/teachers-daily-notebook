import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "./pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
