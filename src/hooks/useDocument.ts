import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";

export function useDocument<T extends { id: string }>(
  collectionName: string,
  documentId: string | null,
) {
  const [docData, setDocData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!documentId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset when documentId becomes null
      setDocData(null);
      return;
    }
    setLoading(true);

    const unsub = onSnapshot(doc(db, collectionName, documentId), (snap) => {
      if (snap.exists()) {
        setDocData({ id: snap.id, ...snap.data() } as T);
      } else {
        setDocData(null);
      }
      setLoading(false);
    });

    return unsub;
  }, [collectionName, documentId]);

  return { doc: docData, loading };
}
