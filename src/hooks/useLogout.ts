import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export const useLogout = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      // signOut triggers onAuthStateChanged with null in AuthContext
      await signOut(auth);

      setIsPending(false);
    } catch (err) {
      setError((err as Error).message);
      setIsPending(false);
    }
  };

  return { logout, error, isPending };
};
