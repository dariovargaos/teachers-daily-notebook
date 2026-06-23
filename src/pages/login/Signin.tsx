import { useState } from "react";
import { Link as RouterLink } from "react-router";
import { useLogin } from "../../hooks/useLogin";
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
  LuArrowRight,
  LuEye,
  LuEyeOff,
} from "react-icons/lu";

export default function Signin() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isPending } = useLogin();

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
              Welcome back
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
              A quiet place
              <br />
              for loud days.
            </Heading>
            <Text
              mt={4}
              maxW="sm"
              fontSize="sm"
              opacity={0.75}
              lineHeight="relaxed"
            >
              Pick up the chalk where you left off. Your lessons, reminders and
              reflections are right where you wrote them.
            </Text>
          </Box>

          {/* Footer */}
          <HStack
            position="relative"
            justify="space-between"
            fontSize="10px"
            textTransform="uppercase"
            letterSpacing="0.2em"
            opacity={0.6}
          >
            <Text as="span">Vol. {new Date().getFullYear()}</Text>
            <Text as="span">A planner for modern teachers</Text>
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
            Sign in
          </Text>
          <Heading
            as="h2"
            fontFamily="display"
            mt={2}
            fontSize={{ base: "4xl", sm: "5xl" }}
            fontWeight="normal"
            letterSpacing="tight"
            color="fg"
            lineHeight="1.05"
          >
            Good to see you
          </Heading>
          <Text mt={3} fontSize="sm" color="fg.muted">
            Don&apos;t have an account?{" "}
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
              <RouterLink to="/sign-up">Create one</RouterLink>
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
                placeholder="you@school.edu"
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
              label="Password"
              icon={<LuLock />}
              trailing={
                <Box
                  as="button"
                  onClick={() => setShow((s) => !s)}
                  color="fg.muted"
                  _hover={{ color: "fg" }}
                  transition="colors"
                  aria-label={show ? "Hide password" : "Show password"}
                  bg="transparent"
                  border="none"
                  cursor="pointer"
                  p={0}
                >
                  {show ? <LuEyeOff /> : <LuEye />}
                </Box>
              }
            >
              <Input
                type={show ? "text" : "password"}
                required
                placeholder="••••••••"
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

            {/* Remember me & Forgot password */}
            <HStack justify="space-between" fontSize="xs">
              <Checkbox.Root colorPalette="primary" variant="subtle">
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label color="fg.muted">Remember me</Checkbox.Label>
              </Checkbox.Root>
              <Link
                href="#"
                fontWeight="semibold"
                color="fg"
                _hover={{ opacity: 0.8 }}
              >
                Forgot password?
              </Link>
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
              {isPending ? "Signing in..." : "Sign in"}
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
              or
              <Separator flex="1" />
            </HStack>

            {/* Google button */}
            <Button
              type="button"
              variant="outline"
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

          <Text
            mt={8}
            fontSize="10px"
            textTransform="uppercase"
            letterSpacing="0.2em"
            color="fg.muted/60"
            textAlign="center"
          >
            By signing in you agree to the quiet little terms
          </Text>
        </Box>
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
    <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4-5.5 4-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.6 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12S6.8 21.5 12 21.5c6.9 0 9.5-4.8 9.5-9 0-.6-.1-1.1-.2-1.6H12z"
      />
    </svg>
  );
}
