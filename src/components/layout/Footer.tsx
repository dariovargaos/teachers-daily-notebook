import { Flex, Text, Link, Separator } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router";

export default function Footer() {
  return (
    <Flex
      as="footer"
      mt={10}
      direction="column"
      align="center"
      gap={3}
      fontSize="xs"
      color="fg.muted"
    >
      {/* Brand row */}
      <Flex
        gap={1}
        fontSize="10px"
        letterSpacing="0.2em"
        color="muted.contrast/70"
      >
        <Text>e-Rokovnik</Text>
        <Text textTransform="uppercase"> · Planer za moderne učitelje</Text>
      </Flex>

      <Separator maxW="300px" />

      {/* Legal links row */}
      <Flex gap={4} wrap="wrap" justify="center">
        <Link asChild>
          <RouterLink to="/uvjeti-koristenja">Uvjeti korištenja</RouterLink>
        </Link>
        <Link asChild>
          <RouterLink to="/politika-privatnosti">
            Politika privatnosti
          </RouterLink>
        </Link>
      </Flex>

      {/* Copyright row */}
      <Text fontSize="10px">
        © {new Date().getFullYear()} e-Rokovnik. Sva prava pridržana.
      </Text>
    </Flex>
  );
}
