import { useState } from "react";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase/config";

export const useConfirmPasswordReset = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  const verifyCode = async (oobCode: string) => {
    setError(null);
    setIsPending(true);

    try {
      const verifiedEmail = await verifyPasswordResetCode(auth, oobCode);
      setEmail(verifiedEmail);
      setIsPending(false);
      return true;
    } catch (err) {
      const code = (err as { code?: string }).code;
      switch (code) {
        case "auth/expired-action-code":
          setError("Poveznica je istekla. Zatraži novu.");
          break;
        case "auth/invalid-action-code":
          setError("Nevažeća poveznica. Zatraži novu.");
          break;
        default:
          setError("Došlo je do greške. Pokušaj ponovno.");
      }
      setIsPending(false);
      return false;
    }
  };

  const resetPassword = async (oobCode: string, newPassword: string) => {
    setError(null);
    setIsSuccess(false);
    setIsPending(true);

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setIsSuccess(true);
      setIsPending(false);
    } catch (err) {
      const code = (err as { code?: string }).code;
      switch (code) {
        case "auth/weak-password":
          setError("Lozinka mora imati najmanje 6 znakova.");
          break;
        case "auth/expired-action-code":
          setError("Poveznica je istekla. Zatraži novu.");
          break;
        default:
          setError("Došlo je do greške. Pokušaj ponovno.");
      }
      setIsPending(false);
    }
  };

  return { verifyCode, resetPassword, error, isPending, isSuccess, email };
};
