import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const provider = new GoogleAuthProvider();

export const useGoogleAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const signInWithGoogle = async () => {
    setError(null);
    setIsPending(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Only create the Firestore doc if this is a brand-new user
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        const [firstName = "", ...rest] = (user.displayName ?? "").split(" ");
        await setDoc(userRef, {
          firstName,
          lastName: rest.join(" "),
          displayName: user.displayName ?? "",
          email: user.email ?? "",
        });
      }

      setIsPending(false);
    } catch (err) {
      const code = (err as { code?: string }).code;
      if (
        code === "auth/popup-closed-by-user" ||
        code === "auth/cancelled-popup-request"
      ) {
        setError(null); // user just closed the popup — not a real error
      } else {
        setError((err as Error).message);
      }
      setIsPending(false);
    }
  };

  return { signInWithGoogle, error, isPending };
};
