import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const login = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);

    try {
      // signInWithEmailAndPassword triggers onAuthStateChanged in AuthContext
      // — no manual dispatch needed
      await signInWithEmailAndPassword(auth, email, password);
      // Success: isPending stays true until redirect happens
    } catch (err) {
      const code = (err as { code?: string }).code;
      switch (code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-email":
        case "auth/invalid-credential":
        case "auth/invalid-login-credentials":
          setError("Incorrect email or password.");
          break;
        default:
          setError((err as Error).message);
      }
      setIsPending(false);
    }
  };

  return { login, error, isPending };
};
