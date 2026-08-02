import { Link } from "react-router";
import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { FiHome } from "react-icons/fi";

export default function NotFound() {
  return (
    <VStack gap={6} textAlign="center" py={16}>
      <Text fontSize="6xl" fontWeight="bold" color="fg.subtle">
        404
      </Text>
      <Heading size="2xl">Stranica nije pronađena</Heading>
      <Text color="fg.muted" maxW="md">
        Stranica koju tražite ne postoji ili je premještena. Provjerite URL ili
        se vratite na početnu stranicu.
      </Text>
      <Button asChild colorPalette="primary" size="lg">
        <Link to="/">
          <FiHome />
          Početna
        </Link>
      </Button>
    </VStack>
  );
}
