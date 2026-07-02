import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "./useAuthContext";
import { db } from "../firebase/config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export const useCollection = <T = Record<string, unknown>>(
  collectionName: string,
) => {
  const { user } = useAuthContext();

  const fetchCollectionData = async (): Promise<(T & { id: string })[]> => {
    if (!user?.uid) {
      throw new Error("User not authenticated.");
    }
    const q = query(
      collection(db, collectionName),
      where("uid", "==", user.uid),
      orderBy("createdAt"),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as T & { id: string },
    );
  };

  return useQuery<(T & { id: string })[]>({
    queryKey: [collectionName, user?.uid],
    queryFn: fetchCollectionData,
    enabled: !!user?.uid,
    refetchOnWindowFocus: false,
    staleTime: 10000,
  });
};
