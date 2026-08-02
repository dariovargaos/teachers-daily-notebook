import { Flex, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router";

export default function Footer() {
  return (
    <Flex
      as="footer"
      flexDirection={{ base: "column", md: "row" }}
      mt={10}
      align="center"
      justify="center"
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
        align="center"
      >
        <Text>e-Rokovnik</Text>
        <Flex align="center" gap={1}>
          <Text fontSize="xl" lineHeight="1" verticalAlign="middle">
            ·
          </Text>
          <Text textTransform="uppercase"> Planer za moderne učitelje</Text>
        </Flex>
      </Flex>

      {/* Legal links row */}
      <Flex gap={4} wrap="wrap" justify="center">
        <Link
          asChild
          color="muted.contrast/70"
          _hover={{ color: "fg" }}
          transition="colors"
          css={{ textDecorationColor: "currentColor" }}
        >
          <RouterLink to="/uvjeti-koristenja">Uvjeti korištenja</RouterLink>
        </Link>
        <Link
          asChild
          color="muted.contrast/70"
          _hover={{ color: "fg" }}
          transition="colors"
          css={{ textDecorationColor: "currentColor" }}
        >
          <RouterLink to="/politika-privatnosti">
            Politika privatnosti
          </RouterLink>
        </Link>
        <Link
          asChild
          color="muted.contrast/70"
          _hover={{ color: "fg" }}
          transition="colors"
          css={{ textDecorationColor: "currentColor" }}
        >
          <RouterLink to="/politika-kolacica">Politika kolačića</RouterLink>
        </Link>
      </Flex>

      {/* Copyright row */}
      <Text fontSize="10px" color="muted.contrast/70">
        © {new Date().getFullYear()} e-Rokovnik. Sva prava pridržana.
      </Text>
    </Flex>
  );
}
