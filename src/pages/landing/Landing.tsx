import { Link as RouterLink } from "react-router";
import { Box, Flex, Grid, Link, Text, VStack } from "@chakra-ui/react";
import {
  LuArrowRight,
  LuBookOpen,
  LuCalendarDays,
  LuCheck,
  LuClipboardList,
  LuNotebookPen,
  LuUsers,
} from "react-icons/lu";

const FEATURES = [
  {
    icon: LuBookOpen,
    title: "Dnevne bilješke",
    description:
      "U dnevnim bilješkama zabilježite lekcije, ispite i podsjetnike. Sve je organizirano po danima i mjesecima.",
  },
  {
    icon: LuCalendarDays,
    title: "Kalendar i podsjetnici",
    description:
      "Uočite ispite i važne datume na prvi pogled. Crvene točke označavaju dane koji trebaju vašu pažnju.",
  },
  {
    icon: LuUsers,
    title: "Popis učenika",
    description:
      "Čuvajte imena i prezimena svojih učenika na jednoj urednoj listi. Dodajte ih ili uklonite u sekundi.",
  },
  {
    icon: LuClipboardList,
    title: "Evidencije",
    description:
      "Uz pomoć prilagodljivih popisa pratite izvršene obaveze učenika kroz cijelu školsku godinu. Evidencije se automatski spremaju.",
  },
];

// Shared glass-card border/backdrop tokens
const glass = {
  borderWidth: "1px",
  borderColor: "white/70",
  backdropFilter: "blur(12px)",
} as const;

// Gold eyebrow label shared across sections
function Eyebrow({ children }: { children: string }) {
  return (
    <Text
      fontSize="10px"
      fontWeight="bold"
      textTransform="uppercase"
      letterSpacing="0.22em"
      color="gold"
    >
      {children}
    </Text>
  );
}

export default function LandingPage() {
  return (
    <Flex minH="100vh" flexDir="column">
      {/* ── Header ─────────────────────────────────────────── */}
      <Box
        as="header"
        position="sticky"
        top={0}
        zIndex="sticky"
        px={{ base: 4, sm: 8 }}
        py={4}
      >
        <Flex
          mx="auto"
          maxW="6xl"
          rounded="2xl"
          bg="paper/80"
          {...glass}
          px={5}
          py={3}
          align="center"
          justify="space-between"
          boxShadow="0 12px 40px -24px oklch(0.3 0.06 60 / 0.25)"
        >
          {/* Logo */}
          <Box
            asChild
            display="flex"
            alignItems="center"
            gap={3}
            textDecoration="none"
          >
            <RouterLink to="/">
              <Flex
                h={9}
                w={9}
                align="center"
                justify="center"
                rounded="xl"
                bg="primary.solid"
                color="primary.contrast"
                flexShrink={0}
              >
                <LuNotebookPen size="1rem" />
              </Flex>
              <Text
                fontFamily="display"
                fontSize="sm"
                fontWeight="semibold"
                letterSpacing="0.18em"
                color="fg"
              >
                e-Rokovnik
              </Text>
            </RouterLink>
          </Box>

          {/* Desktop nav links */}
          <Flex
            as="nav"
            display={{ base: "none", sm: "flex" }}
            align="center"
            gap={6}
          >
            {(["Značajke", "Pregled"] as const).map((label) => (
              <Link
                key={label}
                href={`#${label === "Značajke" ? "features" : "preview"}`}
                fontSize="sm"
                fontWeight="medium"
                color="muted.fg"
                textDecoration="none"
                _hover={{ color: "fg" }}
                transition="color 0.15s"
              >
                {label}
              </Link>
            ))}
          </Flex>

          {/* Auth CTAs */}
          <Flex align="center" gap={2}>
            <Box
              asChild
              display={{ base: "none", sm: "inline-flex" }}
              alignItems="center"
              justifyContent="center"
              rounded="xl"
              px={4}
              py={2}
              fontSize="sm"
              fontWeight="medium"
              color="fg"
              textDecoration="none"
              _hover={{ bg: "secondary.solid" }}
              transition="background 0.15s"
            >
              <RouterLink to="/prijava">Prijava</RouterLink>
            </Box>
            <Box
              asChild
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              gap={1.5}
              rounded="xl"
              bg="primary.solid"
              px={4}
              py={2}
              fontSize="sm"
              fontWeight="semibold"
              color="primary.contrast"
              textDecoration="none"
              _hover={{ opacity: "0.9" }}
              _active={{ transform: "scale(0.98)" }}
              boxShadow="0 8px 24px -12px oklch(0.2 0.03 50 / 0.6)"
            >
              <RouterLink to="/registracija">Započni</RouterLink>
            </Box>
          </Flex>
        </Flex>
      </Box>

      <Box as="main" flex={1}>
        {/* ── Hero ───────────────────────────────────────────── */}
        <Box
          as="section"
          position="relative"
          px={{ base: 4, sm: 8 }}
          pt={{ base: 16, sm: 24 }}
          pb={{ base: 20, sm: 28 }}
        >
          <Box mx="auto" maxW="6xl">
            <Grid
              templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
              gap={{ base: 12, lg: 16 }}
              alignItems="center"
            >
              {/* Copy */}
              <Box maxW="xl">
                <Eyebrow>Rokovnik za moderne učitelje</Eyebrow>
                <Text
                  as="h1"
                  textStyle="display"
                  mt={4}
                  fontSize={{ base: "5xl", sm: "6xl", lg: "7xl" }}
                  fontWeight="normal"
                  color="fg"
                  lineHeight="1.05"
                >
                  Mirno mjesto za glasne dane.
                </Text>
                <Text mt={6} fontSize="lg" lineHeight="tall" color="muted.fg">
                  e-Rokovnik je aplikacija za učitelje koja pomaže u planiranju
                  i organizaciji školskih dana. Bilježite lekcije, ispite,
                  podsjetnike i popis učenika na jednom jasnom i preglednom
                  mjestu.
                </Text>

                <Flex mt={8} flexWrap="wrap" align="center" gap={4}>
                  <Box
                    asChild
                    display="inline-flex"
                    alignItems="center"
                    gap={2}
                    rounded="2xl"
                    bg="primary.solid"
                    px={6}
                    py={3.5}
                    fontSize="sm"
                    fontWeight="semibold"
                    color="primary.contrast"
                    textDecoration="none"
                    _hover={{ opacity: "0.95" }}
                    _active={{ transform: "scale(0.99)" }}
                    boxShadow="0 18px 40px -20px oklch(0.2 0.05 50 / 0.6)"
                  >
                    <RouterLink to="/registracija">
                      Kreiraj račun
                      <LuArrowRight size="1rem" />
                    </RouterLink>
                  </Box>
                  <Box
                    asChild
                    display="inline-flex"
                    alignItems="center"
                    gap={2}
                    rounded="2xl"
                    borderWidth="1px"
                    borderColor="border"
                    bg="card.solid/60"
                    px={6}
                    py={3.5}
                    fontSize="sm"
                    fontWeight="semibold"
                    color="fg"
                    textDecoration="none"
                    _hover={{ bg: "card.solid" }}
                    transition="background 0.15s"
                  >
                    <RouterLink to="/prijava">Prijava</RouterLink>
                  </Box>
                </Flex>

                <Text mt={4} fontSize="xs" color="muted.fg/70">
                  e-Rokovnik je besplatan za korištenje, bez oglasa i praćenja.
                  Vaši podaci su privatni i sigurni.
                </Text>
              </Box>

              {/* Mock planner card */}
              <Box position="relative">
                {/* Ambient glow */}
                <Box
                  position="absolute"
                  inset="-4"
                  rounded="3rem"
                  bg="accent.solid/25"
                  filter="blur(48px)"
                  opacity={0.4}
                />
                <Box
                  position="relative"
                  rounded="2.5rem"
                  bg="paper/80"
                  {...glass}
                  p={{ base: 6, sm: 8 }}
                  boxShadow="0 40px 80px -40px oklch(0.3 0.06 60 / 0.35)"
                  className="hero-card-in"
                >
                  {/* Date header */}
                  <Flex align="center" justify="space-between" mb={6}>
                    <Box>
                      <Text
                        fontSize="10px"
                        fontWeight="bold"
                        textTransform="uppercase"
                        letterSpacing="0.22em"
                        color="gold"
                      >
                        Srijeda
                      </Text>
                      <Text
                        as="h2"
                        textStyle="display"
                        mt={1}
                        fontSize="3xl"
                        fontWeight="normal"
                        color="fg"
                      >
                        4. rujna
                      </Text>
                      <Text
                        fontFamily="display"
                        fontSize="md"
                        fontStyle="italic"
                        color="muted.fg"
                      >
                        2026.
                      </Text>
                    </Box>

                    {/* Prev / next arrows */}
                    <Flex gap={2}>
                      {[true, false].map((isLeft) => (
                        <Flex
                          key={String(isLeft)}
                          h={8}
                          w={8}
                          align="center"
                          justify="center"
                          rounded="full"
                          borderWidth="1px"
                          borderColor="border/70"
                          bg="card.solid/60"
                          color="fg"
                        >
                          <LuArrowRight
                            size="1rem"
                            style={
                              isLeft
                                ? { transform: "rotate(180deg)" }
                                : undefined
                            }
                          />
                        </Flex>
                      ))}
                    </Flex>
                  </Flex>

                  {/* Notes body */}
                  <Box
                    rounded="2rem"
                    bg="paper/85"
                    borderWidth="1px"
                    borderColor="white/70"
                    p={{ base: 5, sm: 6 }}
                    minH="220px"
                  >
                    <Text
                      fontSize="10px"
                      fontWeight="bold"
                      textTransform="uppercase"
                      letterSpacing="0.18em"
                      color="gold"
                      mb={3}
                    >
                      Fokus nastave
                    </Text>
                    <VStack gap={3} align="stretch">
                      {(["75%", "100%", "83%", "50%", "67%"] as const).map(
                        (w, i) => (
                          <Box
                            key={i}
                            h="2.5"
                            w={w}
                            rounded="full"
                            bg="fg/10"
                          />
                        ),
                      )}
                    </VStack>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>

        {/* ── Features ───────────────────────────────────────── */}
        <Box
          as="section"
          id="features"
          px={{ base: 4, sm: 8 }}
          py={{ base: 20, sm: 24 }}
        >
          <Box mx="auto" maxW="6xl">
            <Box textAlign="center" maxW="2xl" mx="auto" mb={14}>
              <Eyebrow>Sve što trebate</Eyebrow>
              <Text
                as="h2"
                textStyle="display"
                mt={3}
                fontSize={{ base: "4xl", sm: "5xl" }}
                fontWeight="normal"
                color="fg"
              >
                Stvoreno za školsku godinu
              </Text>
            </Box>

            <Grid
              templateColumns={{
                base: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={6}
            >
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <Box
                  key={title}
                  rounded="2rem"
                  bg="paper/80"
                  {...glass}
                  p={{ base: 7, sm: 8 }}
                  boxShadow="0 20px 50px -30px oklch(0.3 0.06 60 / 0.25)"
                  _hover={{ transform: "translateY(-4px)" }}
                  transition="transform 0.2s"
                >
                  <Flex
                    h={12}
                    w={12}
                    align="center"
                    justify="center"
                    rounded="2xl"
                    bg="primary.solid"
                    color="primary.contrast"
                    mb={5}
                  >
                    <Icon size="1.25rem" />
                  </Flex>
                  <Text
                    textStyle="display"
                    fontSize="2xl"
                    fontWeight="normal"
                    color="fg"
                  >
                    {title}
                  </Text>
                  <Text mt={3} fontSize="sm" lineHeight="tall" color="muted.fg">
                    {description}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* ── Preview ────────────────────────────────────────── */}
        <Box
          as="section"
          id="preview"
          px={{ base: 4, sm: 8 }}
          py={{ base: 20, sm: 24 }}
        >
          <Box mx="auto" maxW="6xl">
            <Grid
              templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
              gap={{ base: 10, lg: 16 }}
              alignItems="center"
            >
              {/* Mini calendar mock */}
              <Box order={{ base: 2, lg: 1 }}>
                <Box
                  rounded="2.5rem"
                  bg="paper/80"
                  {...glass}
                  p={{ base: 5, sm: 6 }}
                  boxShadow="0 30px 70px -40px oklch(0.3 0.06 60 / 0.35)"
                >
                  {/* Day-of-week headers */}
                  <Grid
                    templateColumns="repeat(7, 1fr)"
                    gap={2}
                    mb={4}
                    textAlign="center"
                  >
                    {(["P", "U", "S", "Č", "P", "S", "N"] as const).map(
                      (d, i) => (
                        <Text
                          key={i}
                          fontSize="11px"
                          fontWeight="semibold"
                          textTransform="uppercase"
                          letterSpacing="wider"
                          color="muted.fg"
                        >
                          {d}
                        </Text>
                      ),
                    )}
                  </Grid>

                  {/* Day cells */}
                  <Grid templateColumns="repeat(7, 1fr)" gap={2}>
                    {Array.from({ length: 31 }).map((_, i) => {
                      const day = i + 1;
                      const hasEvent = day === 9 || day === 18 || day === 25;
                      const isSelected = day === 4;
                      return (
                        <Flex
                          key={day}
                          position="relative"
                          h={10}
                          align="center"
                          justify="center"
                          rounded="xl"
                          fontSize="sm"
                          fontWeight="medium"
                          bg={isSelected ? "primary.solid" : "card.solid/50"}
                          color={isSelected ? "primary.contrast" : "fg"}
                          className={hasEvent ? "planner-has-event" : undefined}
                        >
                          {day}
                        </Flex>
                      );
                    })}
                  </Grid>

                  {/* Reminder strip */}
                  <Box
                    mt={5}
                    rounded="1.5rem"
                    bg="paper/85"
                    borderWidth="1px"
                    borderColor="white/70"
                    p={5}
                  >
                    <Flex align="center" justify="space-between" mb={3}>
                      <Box>
                        <Text
                          fontSize="10px"
                          fontWeight="bold"
                          textTransform="uppercase"
                          letterSpacing="0.18em"
                          color="gold"
                        >
                          Važno
                        </Text>
                        <Text
                          fontFamily="display"
                          fontSize="md"
                          fontWeight="semibold"
                          color="fg"
                          mt={0.5}
                        >
                          Ispiti i podsjetnici
                        </Text>
                      </Box>
                      <Box
                        h={2}
                        w={2}
                        rounded="full"
                        bg="destructive.solid"
                        aria-hidden="true"
                      />
                    </Flex>
                    <VStack gap={2} align="stretch">
                      {(["100%", "80%"] as const).map((w, i) => (
                        <Box key={i} h={2} w={w} rounded="full" bg="fg/10" />
                      ))}
                    </VStack>
                  </Box>
                </Box>
              </Box>

              {/* Preview copy */}
              <Box order={{ base: 1, lg: 2 }}>
                <Eyebrow>Pregled proizvoda</Eyebrow>
                <Text
                  as="h2"
                  textStyle="display"
                  mt={3}
                  fontSize={{ base: "4xl", sm: "5xl" }}
                  fontWeight="normal"
                  color="fg"
                >
                  Cijeli mjesec na dohvat ruke
                </Text>
                <Text mt={5} fontSize="lg" lineHeight="tall" color="muted.fg">
                  Kalendar prikazuje cijeli mjesec vidljivim na prvi pogled.
                  Označite važne datume i podsjetnike, a zatim se jednostavno
                  prebacite na dnevne bilješke kako biste detaljno planirali
                  svoj dan.
                </Text>
                <VStack mt={6} gap={3} align="start">
                  {[
                    "Krećite se dan po dan pomoću strelica",
                    "Skočite na bilo koji datum iz kalendara",
                    "Označite važne događaje crvenim točkama",
                  ].map((line) => (
                    <Flex
                      key={line}
                      align="start"
                      gap={3}
                      fontSize="sm"
                      color="muted.fg"
                    >
                      <Flex
                        mt={0.5}
                        h={4}
                        w={4}
                        flexShrink={0}
                        align="center"
                        justify="center"
                        rounded="full"
                        bg="gold"
                      >
                        <LuCheck
                          size="0.625rem"
                          color="var(--chakra-colors-primary-solid)"
                        />
                      </Flex>
                      {line}
                    </Flex>
                  ))}
                </VStack>
              </Box>
            </Grid>
          </Box>
        </Box>

        {/* ── CTA ────────────────────────────────────────────── */}
        <Box as="section" px={{ base: 4, sm: 8 }} py={{ base: 20, sm: 24 }}>
          <Box
            mx="auto"
            maxW="3xl"
            rounded="2.5rem"
            bg="primary.solid/92"
            borderWidth="1px"
            borderColor="fg/8"
            color="primary.contrast"
            p={{ base: 10, sm: 16 }}
            textAlign="center"
            overflow="hidden"
            position="relative"
            boxShadow="0 40px 80px -40px oklch(0.2 0.05 50 / 0.55)"
          >
            {/* Decorative radial orbs */}
            <Box
              aria-hidden="true"
              position="absolute"
              inset={0}
              opacity={0.6}
              style={{
                backgroundImage:
                  "radial-gradient(at 80% 10%, oklch(0.78 0.12 60 / 0.45) 0px, transparent 55%)," +
                  "radial-gradient(at 10% 90%, oklch(0.65 0.1 40 / 0.35) 0px, transparent 55%)",
              }}
            />
            <Box position="relative">
              <Text
                as="h2"
                textStyle="display"
                fontSize={{ base: "4xl", sm: "5xl" }}
                fontWeight="normal"
              >
                Započnite svoj rokovnik danas.
              </Text>
              <Text mt={4} fontSize="lg" opacity={0.75}>
                Pridružite se učiteljima koji jednostavno i učinkovito planiraju
                svoje školske dane.
              </Text>
              <Flex mt={8} flexWrap="wrap" justify="center" gap={4}>
                <Box
                  asChild
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  rounded="2xl"
                  bg="primary.contrast"
                  px={6}
                  py={3.5}
                  fontSize="sm"
                  fontWeight="semibold"
                  color="primary.solid"
                  textDecoration="none"
                  _hover={{ opacity: "0.92" }}
                  _active={{ transform: "scale(0.99)" }}
                  boxShadow="0 18px 40px -20px oklch(0.1 0.02 50 / 0.5)"
                >
                  <RouterLink to="/registracija">
                    Kreiraj besplatan račun
                    <LuArrowRight size="1rem" />
                  </RouterLink>
                </Box>
                <Box
                  asChild
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  rounded="2xl"
                  borderWidth="1px"
                  borderColor="white/25"
                  bg="white/10"
                  px={6}
                  py={3.5}
                  fontSize="sm"
                  fontWeight="semibold"
                  color="primary.contrast"
                  textDecoration="none"
                  _hover={{ bg: "white/20" }}
                  transition="background 0.15s"
                >
                  <RouterLink to="/prijava">Prijava</RouterLink>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Footer ─────────────────────────────────────────── */}
      <Box as="footer" px={{ base: 4, sm: 8 }} py={8}>
        <Flex
          mx="auto"
          maxW="6xl"
          flexDir={{ base: "column", sm: "row" }}
          align="center"
          justify="space-between"
          gap={4}
        >
          <Flex align="center" gap={3}>
            <Flex
              h={8}
              w={8}
              align="center"
              justify="center"
              rounded="xl"
              bg="primary.solid"
              color="primary.contrast"
            >
              <LuNotebookPen size="0.875rem" />
            </Flex>
            <Text
              fontFamily="display"
              fontSize="sm"
              fontWeight="semibold"
              letterSpacing="wide"
              color="fg"
            >
              e-Rokovnik
            </Text>
          </Flex>
          <Text
            fontSize="11px"
            textTransform="uppercase"
            letterSpacing="0.2em"
            color="muted.fg/70"
          >
            © {new Date().getFullYear()} e-Rokovnik · Sva prava pridržana
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
