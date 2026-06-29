import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  type QueryConstraint,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuthContext } from "./useAuthContext";

export function useCollection<T extends { id: string }>(
  collectionName: string,
  uidField: string = "uid",
  orderByField: string | readonly string[] = "createdAt",
) {
  const { user } = useAuthContext();
  const [docs, setDocs] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- show loading on dependency change
    setLoading(true);

    const constraints: QueryConstraint[] = [where(uidField, "==", user.uid)];
    const fields = Array.isArray(orderByField) ? orderByField : [orderByField];
    for (const field of fields) {
      constraints.push(orderBy(field, "asc"));
    }

    const q = query(collection(db, collectionName), ...constraints);

    const unsub = onSnapshot(
      q,
      (snap) => {
        setDocs(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T));
        setLoading(false);
      },
      (error) => {
        console.error(`useCollection("${collectionName}"):`, error);
        setLoading(false);
      },
    );

    return unsub;
  }, [collectionName, uidField, orderByField, user?.uid]);

  return { docs, loading };
}
