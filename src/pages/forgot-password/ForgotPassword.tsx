import { useState, useEffect, useCallback, useRef } from "react";
import { Link as RouterLink } from "react-router";
import { useResetPassword } from "../../hooks/useResetPassword";
import Field from "../../components/field-form/Field";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  Icon,
} from "@chakra-ui/react";
import {
  LuNotebookPen,
  LuMail,
  LuArrowLeft,
  LuCircleCheck,
} from "react-icons/lu";

const COOLDOWN_SECONDS = 60;
const MAX_ATTEMPTS_PER_WINDOW = 3;
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const STORAGE_KEY_LAST_ATTEMPT = "forgotPwLastAttempt";
const STORAGE_KEY_ATTEMPTS = "forgotPwAttempts";

function getRemainingCooldown(): number {
  const raw = sessionStorage.getItem(STORAGE_KEY_LAST_ATTEMPT);
  if (!raw) return 0;
  const elapsed = Date.now() - Number(raw);
  const remaining = Math.ceil((COOLDOWN_SECONDS * 1000 - elapsed) / 1000);
  return remaining > 0 ? remaining : 0;
}

function getRecentAttempts(): number {
  try {
    const attempts: number[] = JSON.parse(
      sessionStorage.getItem(STORAGE_KEY_ATTEMPTS) || "[]",
    );
    const windowStart = Date.now() - ATTEMPT_WINDOW_MS;
    return attempts.filter((t) => t > windowStart).length;
  } catch {
    return 0;
  }
}

function recordAttempt() {
  const now = Date.now();
  sessionStorage.setItem(STORAGE_KEY_LAST_ATTEMPT, String(now));
  try {
    const attempts: number[] = JSON.parse(
      sessionStorage.getItem(STORAGE_KEY_ATTEMPTS) || "[]",
    );
    attempts.push(now);
    // Keep only the last 10 entries to avoid bloat
    sessionStorage.setItem(
      STORAGE_KEY_ATTEMPTS,
      JSON.stringify(attempts.slice(-10)),
    );
  } catch {
    sessionStorage.setItem(STORAGE_KEY_ATTEMPTS, JSON.stringify([now]));
  }
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [cooldown, setCooldown] = useState(getRemainingCooldown);
  const [rateLimited, setRateLimited] = useState(
    () => getRecentAttempts() >= MAX_ATTEMPTS_PER_WINDOW,
  );
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { resetPassword, error, isPending, isSuccess } = useResetPassword();

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, []);

  // Cooldown countdown effect
  useEffect(() => {
    if (cooldown <= 0) {
      if (cooldownRef.current) {
        clearInterval(cooldownRef.current);
        cooldownRef.current = null;
      }
      sessionStorage.removeItem(STORAGE_KEY_LAST_ATTEMPT);
      return;
    }

    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          sessionStorage.removeItem(STORAGE_KEY_LAST_ATTEMPT);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, [cooldown]);

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (cooldown > 0) return;

      const recentAttempts = getRecentAttempts();
      if (recentAttempts >= MAX_ATTEMPTS_PER_WINDOW) {
        setRateLimited(true);
        return;
      }

      recordAttempt();
      resetPassword(email);
      setCooldown(COOLDOWN_SECONDS);

      // Check if we just hit the limit
      if (recentAttempts + 1 >= MAX_ATTEMPTS_PER_WINDOW) {
        setRateLimited(true);
      }
    },
    [email, cooldown, resetPassword],
  );

  // Determine why the button is blocked
  const isBlocked = isPending || cooldown > 0 || rateLimited;
  const buttonLabel = rateLimited
    ? "Previše pokušaja. Pričekaj 15 minuta."
    : isPending
      ? "Šaljem..."
      : cooldown > 0
        ? `Pričekaj ${cooldown}s...`
        : "Pošalji poveznicu";

  return (
    <Flex
      as="main"
      minH="100vh"
      px={{ base: 4, sm: 8 }}
      py={10}
      align="center"
      justify="center"
    >
      <Box
        as="section"
        w="full"
        maxW="md"
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
          display={{ base: "flex", md: "none" }}
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
          <Text
            fontFamily="display"
            fontSize="sm"
            fontWeight="semibold"
            letterSpacing="0.18em"
          >
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
          Zaboravljena lozinka
        </Text>

        <Heading
          as="h1"
          mt={3}
          fontSize="2xl"
          fontWeight="semibold"
          letterSpacing="tight"
        >
          Vrati pristup svom računu.
        </Heading>

        <Text mt={2} fontSize="sm" color="fg.muted" lineHeight="relaxed">
          Unesi svoju email adresu i poslat ćemo ti poveznicu za postavljanje
          nove lozinke.
        </Text>

        {/* Success state */}
        {isSuccess ? (
          <VStack mt={8} gap={5} align="stretch">
            <Flex
              direction="column"
              align="center"
              gap={3}
              py={6}
              px={4}
              borderRadius="2xl"
              bg="green.50"
              color="green.700"
              _dark={{ bg: "green.950", color: "green.300" }}
            >
              <LuCircleCheck size="2.5rem" />
              <Text textAlign="center" fontWeight="medium">
                Ako račun s tom email adresom postoji, poslali smo ti poveznicu
                za resetiranje lozinke. Provjeri svoju pristiglu poštu.
              </Text>
            </Flex>

            <RouterLink to="/signin">
              <Button
                variant="outline"
                w="full"
                borderRadius="2xl"
                size="lg"
                fontSize="sm"
              >
                <LuArrowLeft />
                Natrag na prijavu
              </Button>
            </RouterLink>
          </VStack>
        ) : (
          /* Form */
          <VStack
            as="form"
            mt={8}
            gap={5}
            align="stretch"
            onSubmit={handleSubmit}
          >
            {/* Error message */}
            {error && (
              <Text color="red.500" fontSize="sm" fontWeight="medium">
                {error}
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

            {/* Submit button */}
            <Button
              type="submit"
              loading={isPending}
              disabled={isBlocked}
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
              {buttonLabel}
            </Button>

            {/* Back to sign in */}
            <Text textAlign="center" fontSize="sm" color="fg.muted">
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
                <RouterLink to="/signin">
                  <LuArrowLeft
                    style={{ display: "inline", verticalAlign: "middle" }}
                  />{" "}
                  Natrag na prijavu
                </RouterLink>
              </Box>
            </Text>
          </VStack>
        )}
      </Box>
    </Flex>
  );
}
