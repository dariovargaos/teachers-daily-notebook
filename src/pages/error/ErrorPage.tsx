import { useRouteError, isRouteErrorResponse, Link } from "react-router";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { FiHome, FiRefreshCw } from "react-icons/fi";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function ErrorPage() {
  const { user } = useAuthContext();
  const homePath = user ? "/planer" : "/";
  const error = useRouteError();
  const isDev = import.meta.env.DEV;

  let title = "Neočekivana greška";
  let message = "Nešto je pošlo po zlu. Pokušajte ponovno.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "404 — Stranica nije pronađena";
      message = "Stranica koju tražite ne postoji.";
    } else {
      title = `${error.status} — ${error.statusText}`;
      message = error.data?.message || "Došlo je do neočekivane greške.";
    }
  } else if (error instanceof Error && isDev) {
    // U developmentu prikaži stvarnu poruku greške
    message = error.message;
  }

  return (
    <VStack
      gap={6}
      textAlign="center"
      justifyContent="center"
      minH="100dvh"
      py={16}
    >
      <Heading size="2xl">{title}</Heading>
      <Text color="fg.muted" maxW="md">
        {message}
      </Text>
      <Box display="flex" gap={4} flexWrap="wrap" justifyContent="center">
        <Button asChild colorPalette="primary" rounded="lg">
          <Link to={homePath}>
            <FiHome />
            Početna
          </Link>
        </Button>
        <Button
          variant="outline"
          rounded="lg"
          onClick={() => window.location.reload()}
        >
          <FiRefreshCw />
          Osvježi stranicu
        </Button>
      </Box>
    </VStack>
  );
}
