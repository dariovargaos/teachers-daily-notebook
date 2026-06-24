import { useState } from "react";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const signup = async (
    email: string,
    password: string,
    displayName: string,
  ) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Set the display name on the auth profile
      await updateProfile(res.user, { displayName });

      // Create a user document in Firestore (keyed by UID for security rules)
      await setDoc(doc(db, "users", res.user.uid), {
        displayName,
        email,
      });

      // onAuthStateChanged in AuthContext picks up the new user automatically
      navigate("/");
      setIsPending(false);
    } catch (err) {
      const code = (err as { code?: string }).code;
      switch (code) {
        case "auth/email-already-in-use":
          setError("This email address is already in use.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/missing-password":
          setError("You must enter a password.");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters.");
          break;
        case "permission-denied":
          setError("Unable to save your profile. Please try again.");
          break;
        default:
          setError((err as Error).message);
      }
      setIsPending(false);
    }
  };

  return { signup, error, isPending };
};
