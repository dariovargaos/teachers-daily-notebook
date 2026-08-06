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
    firstName: string,
    lastName: string,
  ) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const displayName = `${firstName} ${lastName}`;

      // Set the display name on the auth profile
      await updateProfile(res.user, { displayName });

      // Create a user document in Firestore (keyed by UID for security rules)
      await setDoc(doc(db, "users", res.user.uid), {
        firstName,
        lastName,
        displayName,
        email,
      });

      // onAuthStateChanged in AuthContext picks up the new user automatically
      navigate("/planner");
      setIsPending(false);
    } catch (err) {
      const code = (err as { code?: string }).code;
      switch (code) {
        case "auth/email-already-in-use":
          setError("Ova email adresa se već koristi.");
          break;
        case "auth/invalid-email":
          setError("Nevažeća email adresa.");
          break;
        case "auth/missing-password":
          setError("Moraš unijeti lozinku.");
          break;
        case "auth/weak-password":
        case "auth/password-does-not-meet-requirements":
          setError(
            "Lozinka mora imati najmanje 8 znakova, jedno veliko, jedno malo slovo i broj.",
          );
          break;
        case "permission-denied":
          setError("Nije moguće spremiti profil. Pokušaj ponovno.");
          break;
        default:
          setError((err as Error).message);
      }
      setIsPending(false);
    }
  };

  return { signup, error, isPending };
};
