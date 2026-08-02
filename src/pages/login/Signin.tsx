import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { useLogin } from "../../hooks/useLogin";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import Field from "../../components/field-form/Field";
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
  Icon,
} from "@chakra-ui/react";
import {
  LuNotebookPen,
  LuMail,
  LuLock,
  LuArrowRight,
  LuEye,
  LuEyeOff,
} from "react-icons/lu";

export default function Signin() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isPending } = useLogin();
  const {
    signInWithGoogle,
    error: googleError,
    isPending: googlePending,
  } = useGoogleAuth();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Redirect to home once authenticated
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    login(email, password);
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
        templateColumns={{ base: "1fr", lg: "1.05fr 1fr" }}
        gap={8}
        alignItems="stretch"
      >
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
          borderColor="border"
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
                "radial-gradient(at 80% 10%, oklch(0.78 0.12 60 / 0.45) 0px, transparent 55%), radial-gradient(at 10% 90%, oklch(0.65 0.1 40 / 0.35) 0px, transparent 55%)",
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
                <Text fontFamily="display" fontSize="md" fontWeight="semibold">
                  e-Rokovnik
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
              Dobrodošli natrag
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
              Mirno mjesto
              <br />
              za burne dane.
            </Heading>
            <Text
              mt={4}
              maxW="sm"
              fontSize="sm"
              opacity={0.75}
              lineHeight="relaxed"
            >
              Nastavi tamo gdje si stao/la. Tvoje lekcije, podsjetnici i
              bilješke su točno tamo gdje si ih zapisao/la.
            </Text>
          </Box>

          {/* Footer */}
          <HStack
            position="relative"
            fontSize="10px"
            textTransform="uppercase"
            letterSpacing="0.2em"
            opacity={0.6}
          >
            <Text as="span">Rokovnik za moderne učitelje</Text>
          </HStack>
        </Flex>

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

          <Flex
            w="full"
            display={{ base: "flex", lg: "none" }}
            align="center"
            gap={3}
            mb={6}
          >
            <Icon
              bg="primary.solid"
              borderRadius="xl"
              p={2}
              boxSize={10}
              color="primary.contrast"
              boxShadow="0 10px 30px -10px oklch(0.2 0.05 50 / 0.6)"
            >
              <LuNotebookPen size="1.125rem" />
            </Icon>

            <Text fontFamily="display" fontSize="md" fontWeight="semibold">
              e-Rokovnik
            </Text>
          </Flex>

          <Text
            fontSize="10px"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="0.22em"
            color="gold"
          >
            Prijava
          </Text>

          <Text mt={3} fontSize="sm" color="fg.muted">
            Nemaš račun?{" "}
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
              <RouterLink to="/signup">Otvori ga</RouterLink>
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

            {/* Forgot password */}
            <HStack justify="flex-end" fontSize="xs">
              <Box
                asChild
                fontWeight="semibold"
                color="fg"
                _hover={{ opacity: 0.8 }}
              >
                <RouterLink to="/forgot-password">
                  Zaboravljena lozinka?
                </RouterLink>
              </Box>
            </HStack>

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
              {isPending ? "Prijava u tijeku..." : "Prijavi se"}
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
              Nastavi s Googleom
            </Button>

            <Text fontSize="10px" color="fg.muted/60" textAlign="center">
              Nastavkom s Googleom prihvaćaš{" "}
              <Link asChild fontWeight="bold" color="fg.muted">
                <RouterLink to="/uvjeti-koristenja">
                  Uvjete korištenja
                </RouterLink>
              </Link>{" "}
              i{" "}
              <Link asChild fontWeight="bold" color="fg.muted">
                <RouterLink to="/politika-privatnosti">
                  Pravila privatnosti
                </RouterLink>
              </Link>
              .
            </Text>
          </VStack>
        </Box>
      </Grid>
    </Flex>
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
