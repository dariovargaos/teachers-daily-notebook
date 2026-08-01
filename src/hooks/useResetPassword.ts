import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";

export const useResetPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetPassword = async (email: string) => {
    setError(null);
    setIsSuccess(false);
    setIsPending(true);

    try {
      await sendPasswordResetEmail(auth, email, {
        url: "https://skolski-rokovnik.web.app/reset-password",
        handleCodeInApp: true,
      });
      setIsSuccess(true);
      setIsPending(false);
    } catch (err) {
      const code = (err as { code?: string }).code;
      switch (code) {
        case "auth/user-not-found":
          // Don't reveal whether the email exists — show generic success
          setIsSuccess(true);
          break;
        case "auth/invalid-email":
          setError("Nevažeća email adresa.");
          break;
        case "auth/too-many-requests":
          setError("Previše pokušaja. Pokušaj ponovno kasnije.");
          break;
        default:
          setError("Došlo je do greške. Pokušaj ponovno.");
      }
      setIsPending(false);
    }
  };

  return { resetPassword, error, isPending, isSuccess };
};
