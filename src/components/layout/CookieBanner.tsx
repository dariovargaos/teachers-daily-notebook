import { useState } from "react";
import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";

const STORAGE_KEY = "erokovnik-cookie-banner-dismissed";

export default function CookieBanner() {
  const [visible, setVisible] = useState(
    () => !localStorage.getItem(STORAGE_KEY),
  );

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex="banner"
      bg="bg.panel"
      borderTopWidth="1px"
      borderColor="border"
      px={{ base: 4, sm: 6 }}
      py={3}
      bgColor="red.50/80"
    >
      <Flex
        maxW="5xl"
        mx="auto"
        align="center"
        gap={4}
        justify="space-between"
        wrap="wrap"
      >
        <Text fontSize="xs" color="fg.muted" maxW="2xl">
          🍪 Ova stranica koristi samo nužne kolačiće za prijavu i funkcionalne
          kolačiće za pamćenje postavki (tamni/svijetli način). Ne pratimo vas
          niti prikazujemo oglase.{" "}
          <Link asChild colorPalette="primary" fontWeight="bold">
            <a href="/politika-kolacica">Saznaj više</a>
          </Link>
        </Text>
        <Flex gap={2} align="center" shrink={0}>
          <Button size="xs" colorPalette="primary" onClick={dismiss}>
            Razumijem
          </Button>
          <Button
            size="xs"
            variant="ghost"
            aria-label="Zatvori"
            onClick={dismiss}
            colorPalette="gray"
          >
            <LuX />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
