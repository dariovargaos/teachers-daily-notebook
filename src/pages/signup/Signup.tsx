import { useState } from "react";
import { Link as RouterLink } from "react-router";
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
            Create account
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
            Begin your
            <br />
            notebook
          </Heading>
          <Text mt={3} fontSize="sm" color="fg.muted">
            Already a member?{" "}
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
              <RouterLink to="/signin">Sign in</RouterLink>
            </Box>
          </Text>

          <VStack
            as="form"
            mt={8}
            gap={5}
            align="stretch"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Full name field */}
            <Field label="Full name" icon={<LuUser />}>
              <Input
                type="text"
                required
                placeholder="Ms. Emma Johnson"
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

            {/* Email field */}
            <Field label="Email" icon={<LuMail />}>
              <Input
                type="email"
                required
                placeholder="you@school.edu"
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
                minLength={8}
                placeholder="At least 8 characters"
                variant="flushed"
                fontSize="sm"
                color="gray.400"
                _placeholder={{ color: "fg.muted/60" }}
                p={0}
                border="none"
                outline="none"
                _focus={{ outline: "none" }}
              />
            </Field>

            {/* Terms checkbox */}
            <Checkbox.Root colorPalette="primary" variant="subtle" required>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label fontSize="xs" color="fg.muted">
                I agree to the{" "}
                <Link
                  href="#"
                  fontWeight="semibold"
                  color="fg"
                  _hover={{ opacity: 0.8 }}
                >
                  Terms
                </Link>{" "}
                and the{" "}
                <Link
                  href="#"
                  fontWeight="semibold"
                  color="fg"
                  _hover={{ opacity: 0.8 }}
                >
                  Privacy Notice
                </Link>
                .
              </Checkbox.Label>
            </Checkbox.Root>

            {/* Submit button */}
            <Button
              type="submit"
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
              Create account
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
              For modern teachers
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
              The planner that
              <br />
              stays out of the way.
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
                "A page for every day, kept forever.",
                "Exams and reminders, dotted on your calendar.",
                "Your students, neatly in a single roster.",
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
            A quiet planner, made for the loud months
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
    <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4-5.5 4-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.6 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12S6.8 21.5 12 21.5c6.9 0 9.5-4.8 9.5-9 0-.6-.1-1.1-.2-1.6H12z"
      />
    </svg>
  );
}
