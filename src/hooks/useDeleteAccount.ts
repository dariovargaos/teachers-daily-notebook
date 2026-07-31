import { useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

const USER_COLLECTIONS = [
  "plannerNotes",
  "reminders",
  "students",
  "activities",
];

export const useDeleteAccount = () => {
  const { user } = useAuthContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAccount = async () => {
    if (!user) return;
    setError(null);
    setIsPending(true);

    try {
      // Wipe all user-owned docs from every collection (batches of 500 per Firestore limit)
      for (const col of USER_COLLECTIONS) {
        const snap = await getDocs(
          query(collection(db, col), where("uid", "==", user.uid)),
        );
        for (let i = 0; i < snap.docs.length; i += 500) {
          const batch = writeBatch(db);
          snap.docs.slice(i, i + 500).forEach((d) => batch.delete(d.ref));
          await batch.commit();
        }
      }

      // Delete the profile document
      const profileBatch = writeBatch(db);
      profileBatch.delete(doc(db, "users", user.uid));
      await profileBatch.commit();

      // Delete the Firebase Auth user — onAuthStateChanged fires → ProtectedRoute redirects
      await deleteUser(user);
    } catch (err) {
      const code = (err as { code?: string }).code;
      if (code === "auth/requires-recent-login") {
        setError(
          "Sesija je istekla. Odjavi se, prijavi se ponovo i pokušaj opet.",
        );
      } else {
        setError("Došlo je do greške. Pokušaj ponovo.");
      }
      setIsPending(false);
    }
  };

  return { deleteAccount, isPending, error };
};
