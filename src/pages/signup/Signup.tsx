import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { useSignup } from "../../hooks/useSignup";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
  Input,
  Button,
  Separator,
  HStack,
  VStack,
  Checkbox,
} from "@chakra-ui/react";
import {
  LuNotebookPen,
  LuMail,
  LuLock,
  LuUser,
  LuArrowRight,
  LuEye,
  LuEyeOff,
  LuCheck,
} from "react-icons/lu";

export default function Signup() {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, isPending } = useSignup();
  const {
    signInWithGoogle,
    error: googleError,
    isPending: googlePending,
  } = useGoogleAuth();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Redirect to home once authenticated (handles Google sign-in)
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    signup(email, password, firstName.trim(), lastName.trim());
  };

  return (
    <Flex
      as="main"
      minH="100vh"
      px={{ base: 4, sm: 8 }}
      py={10}
      align="center"
      justify="center"
    >
      <Grid
        w="full"
        maxW="5xl"
        templateColumns={{ base: "1fr", lg: "1fr 1.05fr" }}
        gap={8}
        alignItems="stretch"
      >
        {/* ── Form panel ─────────────────────────────── */}
        <Box
          as="section"
          borderRadius="2rem"
          bg="paper"
          borderWidth="1px"
          borderColor="oklch(1 0 0 / 0.7)"
          backdropBlur="md"
          p={{ base: 8, sm: 10 }}
          boxShadow="0 30px 70px -40px oklch(0.3 0.06 60 / 0.35)"
        >
          {/* Mobile logo */}
          <HStack gap={3} mb={8} display={{ lg: "none" }}>
            <Flex
              h={10}
              w={10}
              align="center"
              justify="center"
              borderRadius="xl"
              bg="primary.solid"
              color="primary.contrast"
            >
              <LuNotebookPen size="1.125rem" />
            </Flex>
            <Text
              fontFamily="display"
              fontSize="sm"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="0.18em"
            >
              Atelier
            </Text>
          </HStack>

          <Text
            fontSize="10px"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="0.22em"
            color="gold"
          >
            Otvori račun
          </Text>
          <Text mt={3} fontSize="sm" color="fg.muted">
            Već imaš račun?{" "}
            <Box
              asChild
              fontWeight="semibold"
              color="fg"
              textDecoration="underline"
              textDecorationColor="gold"
              textDecorationThickness="2px"
              textUnderlineOffset="4px"
              _hover={{ opacity: 0.8 }}
            >
              <RouterLink to="/signin">Prijavi se</RouterLink>
            </Box>
          </Text>

          <VStack
            as="form"
            mt={8}
            gap={5}
            align="stretch"
            onSubmit={handleSubmit}
          >
            {/* Error message */}
            {(error || googleError) && (
              <Text color="red.500" fontSize="sm" fontWeight="medium">
                {error || googleError}
              </Text>
            )}

            {/* First name field */}
            <Field label="Ime" icon={<LuUser />}>
              <Input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                variant="flushed"
                fontSize="sm"
                color="fg"
                p={0}
                border="none"
                outline="none"
                _focus={{ outline: "none" }}
              />
            </Field>

            {/* Last name field */}
            <Field label="Prezime" icon={<LuUser />}>
              <Input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                variant="flushed"
                fontSize="sm"
                color="fg"
                p={0}
                border="none"
                outline="none"
                _focus={{ outline: "none" }}
              />
            </Field>

            {/* Email field */}
            <Field label="Email" icon={<LuMail />}>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="flushed"
                fontSize="sm"
                color="fg"
                _placeholder={{ color: "fg.muted/60" }}
                p={0}
                border="none"
                outline="none"
                _focus={{ outline: "none" }}
              />
            </Field>

            {/* Password field */}
            <Field
              label="Lozinka"
              icon={<LuLock />}
              trailing={
                <Button
                  type="button"
                  variant="plain"
                  onClick={() => setShow((s) => !s)}
                  color="fg.muted"
                  _hover={{ color: "fg" }}
                  transition="colors"
                  aria-label={show ? "Sakrij lozinku" : "Prikaži lozinku"}
                  bg="transparent"
                  border="none"
                  cursor="pointer"
                  p={0}
                  h="auto"
                  minW={0}
                >
                  {show ? <LuEyeOff /> : <LuEye />}
                </Button>
              }
            >
              <Input
                type={show ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="flushed"
                fontSize="sm"
                color="fg"
                _placeholder={{ color: "fg.muted/60" }}
                p={0}
                border="none"
                outline="none"
                _focus={{ outline: "none" }}
              />
            </Field>

            {/* ── Password hint ── */}
            <HStack gap={1.5} mt={-3} ml={1}>
              {password.length >= 8 ? (
                <>
                  <LuCheck size="0.625rem" color="oklch(0.55 0.14 155)" />
                  <Text
                    fontSize="10px"
                    color="fg.muted/50"
                    letterSpacing="0.04em"
                  >
                    Spremno
                  </Text>
                </>
              ) : (
                <Text
                  fontSize="10px"
                  color="fg.muted/40"
                  letterSpacing="0.04em"
                >
                  Najmanje 8 znakova
                </Text>
              )}
            </HStack>

            {/* Terms checkbox */}
            <Checkbox.Root colorPalette="primary" variant="subtle" required>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label fontSize="xs" color="fg.muted">
                Prihvaćam{" "}
                <Link
                  href="#"
                  fontWeight="semibold"
                  color="fg"
                  _hover={{ opacity: 0.8 }}
                >
                  Uvjete
                </Link>{" "}
                i{" "}
                <Link
                  href="#"
                  fontWeight="semibold"
                  color="fg"
                  _hover={{ opacity: 0.8 }}
                >
                  Pravila privatnosti
                </Link>
                .
              </Checkbox.Label>
            </Checkbox.Root>

            {/* Submit button */}
            <Button
              type="submit"
              loading={isPending}
              disabled={isPending}
              colorPalette="primary"
              size="lg"
              borderRadius="2xl"
              px={5}
              py={3.5}
              fontSize="sm"
              fontWeight="semibold"
              _hover={{ opacity: 0.95 }}
              _active={{ transform: "scale(0.99)" }}
              boxShadow="0 18px 40px -20px oklch(0.2 0.05 50 / 0.6)"
            >
              {isPending ? "Otvaranje računa..." : "Otvori račun"}
              <LuArrowRight />
            </Button>

            {/* Divider */}
            <HStack
              gap={3}
              fontSize="10px"
              textTransform="uppercase"
              letterSpacing="0.2em"
              color="fg.muted/70"
            >
              <Separator flex="1" />
              ili
              <Separator flex="1" />
            </HStack>

            {/* Google button */}
            <Button
              type="button"
              variant="outline"
              onClick={signInWithGoogle}
              loading={googlePending}
              disabled={googlePending}
              borderRadius="2xl"
              px={5}
              py={3}
              fontSize="sm"
              fontWeight="medium"
              color="fg"
            >
              <GoogleIcon />
              Continue with Google
            </Button>
          </VStack>
        </Box>

        {/* ── Brand panel ────────────────────────────── */}
        <Flex
          as="aside"
          display={{ base: "none", lg: "flex" }}
          direction="column"
          justify="space-between"
          borderRadius="2rem"
          p={10}
          overflow="hidden"
          position="relative"
          borderWidth="1px"
          borderColor="oklch(0 0 0 / 0.08)"
          bg="primary.solid"
          color="primary.contrast"
          boxShadow="0 40px 80px -40px oklch(0.2 0.05 50 / 0.55)"
        >
          {/* Gradient decor */}
          <Box
            aria-hidden
            position="absolute"
            inset={0}
            opacity={0.7}
            style={{
              backgroundImage:
                "radial-gradient(at 20% 10%, oklch(0.78 0.12 60 / 0.45) 0px, transparent 55%), radial-gradient(at 90% 90%, oklch(0.65 0.1 40 / 0.35) 0px, transparent 55%)",
            }}
          />

          {/* Logo */}
          <Box position="relative">
            <HStack gap={3}>
              <Flex
                h={10}
                w={10}
                align="center"
                justify="center"
                borderRadius="xl"
                bg="oklch(1 0 0 / 0.18)"
                borderWidth="1px"
                borderColor="oklch(1 0 0 / 0.15)"
              >
                <LuNotebookPen size="1.125rem" />
              </Flex>
              <Box lineHeight="tight">
                <Text
                  fontFamily="display"
                  fontSize="sm"
                  fontWeight="semibold"
                  textTransform="uppercase"
                  letterSpacing="0.18em"
                >
                  Atelier
                </Text>
                <Text fontSize="10px" letterSpacing="0.18em" opacity={0.7}>
                  EST. {new Date().getFullYear()}
                </Text>
              </Box>
            </HStack>
          </Box>

          {/* Tagline */}
          <Box position="relative">
            <Text
              fontSize="10px"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="0.22em"
              color="gold"
            >
              Za moderne učitelje
            </Text>
            <Heading
              as="h1"
              fontFamily="display"
              mt={3}
              fontSize="5xl"
              fontWeight="normal"
              lineHeight="1.05"
              letterSpacing="tight"
            >
              Planer koji
              <br />
              ne smeta.
            </Heading>
            <VStack
              as="ul"
              mt={6}
              gap={3}
              align="stretch"
              listStyleType="none"
              pl={0}
            >
              {[
                "Stranica za svaki dan, zauvijek.",
                "Ispiti i podsjetnici, označeni na kalendaru.",
                "Tvoji učenici, uredno na jednom popisu.",
              ].map((line) => (
                <HStack as="li" key={line} gap={2.5} align="start">
                  <Flex
                    mt={1}
                    h={4}
                    w={4}
                    shrink={0}
                    align="center"
                    justify="center"
                    borderRadius="full"
                    bg="gold"
                  >
                    <LuCheck size="0.625rem" color="oklch(0.3 0.035 45)" />
                  </Flex>
                  <Text fontSize="sm" opacity={0.85}>
                    {line}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Box>

          {/* Footer */}
          <Text
            position="relative"
            fontSize="10px"
            textTransform="uppercase"
            letterSpacing="0.2em"
            opacity={0.6}
          >
            Mirni planer, stvoren za burne mjesece
          </Text>
        </Flex>
      </Grid>
    </Flex>
  );
}

// ── Custom Field wrapper ────────────────────────────
function Field({
  label,
  icon,
  trailing,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Box as="label" display="block">
      <Text
        as="span"
        display="block"
        fontSize="10px"
        fontWeight="bold"
        textTransform="uppercase"
        letterSpacing="0.18em"
        mb={2}
        color="gold"
      >
        {label}
      </Text>
      <HStack
        gap={3}
        borderRadius="2xl"
        borderWidth="1px"
        borderColor="border"
        bg="card.solid"
        px={4}
        py={3}
        _focusWithin={{
          borderColor: "primary.solid/40",
          outline: "2px solid",
          outlineColor: "primary.solid/20",
        }}
        transition="all"
      >
        {icon && (
          <Box as="span" color="fg.muted" flexShrink={0}>
            {icon}
          </Box>
        )}
        <Box as="span" flex="1" minW={0}>
          {children}
        </Box>
        {trailing}
      </HStack>
    </Box>
  );
}

// ── Google icon ────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
      <path fill="none" d="M0 0h48v48H0z" />
    </svg>
  );
}
