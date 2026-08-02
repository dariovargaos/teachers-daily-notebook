import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { Box, Container } from "@chakra-ui/react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuthContext } from "@/hooks/useAuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppLayout() {
  const { user } = useAuthContext();
  const [teacherFirstName, setTeacherFirstName] = useState("");

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
      if (snap.exists()) setTeacherFirstName(snap.data().firstName ?? "");
    });
    return () => unsub();
  }, [user]);

  return (
    <Box
      as="main"
      minH="100dvh"
      display="flex"
      flexDirection="column"
      py={{ base: 6, sm: 10 }}
      px={{ base: 4, sm: 8 }}
    >
      <Container
        maxW="5xl"
        p={0}
        display="flex"
        flexDirection="column"
        flex={1}
      >
        <Navbar teacherFirstName={teacherFirstName} />
        <Box flex={1}>
          <Outlet />
        </Box>
        <Footer />
      </Container>
    </Box>
  );
}
