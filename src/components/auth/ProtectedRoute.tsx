import { Navigate } from "react-router";
import { Center, Spinner } from "@chakra-ui/react";
import { useAuthContext } from "../../hooks/useAuthContext";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { user, authIsReady } = useAuthContext();

  // Firebase is still checking the stored token — show a spinner
  if (!authIsReady) {
    return (
      <Center minH="100vh">
        <Spinner size="lg" color="primary.solid" />
      </Center>
    );
  }

  // Not signed in — redirect to signin
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Authenticated — render the children
  return <>{children}</>;
}
