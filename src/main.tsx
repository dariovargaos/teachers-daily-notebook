import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <Provider>
        <App />
      </Provider>
    </AuthContextProvider>
  </StrictMode>,
);
