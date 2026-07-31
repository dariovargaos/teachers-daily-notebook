import { useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import {
  deleteUser,
  reauthenticateWithPopup,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

const USER_COLLECTIONS = [
  "plannerNotes",
  "reminders",
  "students",
  "activities",
];
const GOOGLE_PROVIDER = new GoogleAuthProvider();

async function wipeUserData(uid: string) {
  for (const col of USER_COLLECTIONS) {
    const snap = await getDocs(
      query(collection(db, col), where("uid", "==", uid)),
    );
    for (let i = 0; i < snap.docs.length; i += 500) {
      const batch = writeBatch(db);
      snap.docs.slice(i, i + 500).forEach((d) => batch.delete(d.ref));
      await batch.commit();
    }
  }
  const profileBatch = writeBatch(db);
  profileBatch.delete(doc(db, "users", uid));
  await profileBatch.commit();
}

export const useDeleteAccount = () => {
  const { user } = useAuthContext();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // true when email/password user must supply their password to reauth
  const [needsReauth, setNeedsReauth] = useState(false);

  const resetState = () => {
    setError(null);
    setNeedsReauth(false);
  };

  const deleteAccount = async () => {
    if (!user) return;
    setError(null);
    setIsPending(true);

    try {
      // Auth deletion probed first — if session is stale this throws before any data is touched
      await deleteUser(user);
      // JWT is still valid for Firestore until it expires; wipe data while we still have it
      await wipeUserData(user.uid);
    } catch (err) {
      const code = (err as { code?: string }).code;
      if (code === "auth/requires-recent-login") {
        const isGoogle = user.providerData.some(
          (p) => p.providerId === "google.com",
        );
        if (isGoogle) {
          try {
            await reauthenticateWithPopup(user, GOOGLE_PROVIDER);
            await deleteUser(user);
            await wipeUserData(user.uid);
            return;
          } catch (reauthErr) {
            const rc = (reauthErr as { code?: string }).code;
            if (
              rc !== "auth/popup-closed-by-user" &&
              rc !== "auth/cancelled-popup-request"
            ) {
              setError("Ponovna prijava nije uspjela. Pokušaj ponovo.");
            }
          }
        } else {
          // Email/password — UI must collect the password and call reauthAndDelete
          setNeedsReauth(true);
        }
      } else {
        setError("Došlo je do greške. Pokušaj ponovo.");
      }
      setIsPending(false);
    }
  };

  const reauthAndDelete = async (password: string) => {
    if (!user?.email) return;
    setError(null);
    setIsPending(true);

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      await wipeUserData(user.uid);
    } catch (err) {
      const code = (err as { code?: string }).code;
      if (
        code === "auth/wrong-password" ||
        code === "auth/invalid-credential"
      ) {
        setError("Netočna lozinka.");
      } else {
        setError("Došlo je do greške. Pokušaj ponovo.");
      }
      setIsPending(false);
    }
  };

  return {
    deleteAccount,
    reauthAndDelete,
    resetState,
    needsReauth,
    isPending,
    error,
  };
};
