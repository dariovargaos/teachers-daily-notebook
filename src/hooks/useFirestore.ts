import { useCallback, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, Timestamp } from "@/firebase/config";
import { useAuthContext } from "./useAuthContext";

export function useFirestore(collectionName: string, uidField: string = "uid") {
  const { user } = useAuthContext();
  const [pending, setPending] = useState(false);

  const addDocument = useCallback(
    async (data: Record<string, unknown>) => {
      if (!user?.uid) return;
      setPending(true);
      try {
        await addDoc(collection(db, collectionName), {
          ...data,
          [uidField]: user.uid,
          createdAt: Timestamp.now(),
        });
      } finally {
        setPending(false);
      }
    },
    [collectionName, uidField, user?.uid],
  );

  const deleteDocument = useCallback(
    async (id: string) => {
      setPending(true);
      try {
        await deleteDoc(doc(db, collectionName, id));
      } finally {
        setPending(false);
      }
    },
    [collectionName],
  );

  const updateDocument = useCallback(
    async (id: string, updates: Record<string, unknown>) => {
      setPending(true);
      try {
        await updateDoc(doc(db, collectionName, id), updates);
      } finally {
        setPending(false);
      }
    },
    [collectionName],
  );

  return { addDocument, deleteDocument, updateDocument, pending };
}
