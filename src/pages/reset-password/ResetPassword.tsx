import { useState, useEffect } from "react";
import { useSearchParams, Link as RouterLink } from "react-router";
import { useConfirmPasswordReset } from "../../hooks/useConfirmPasswordReset";
import Field from "../../components/field-form/Field";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  HStack,
  VStack,
  Icon,
} from "@chakra-ui/react";
import {
  LuNotebookPen,
  LuLock,
  LuArrowRight,
  LuCircleCheck,
  LuTriangleAlert,
} from "react-icons/lu";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const [newPassword, setNewPassword] = useState("");
  const [show, setShow] = useState(false);

  const { verifyCode, resetPassword, error, isPending, isSuccess, email } =
    useConfirmPasswordReset();

  // If oobCode is present, the template is unlocked — verify it
  useEffect(() => {
    if (oobCode) {
      verifyCode(oobCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oobCode]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (oobCode) {
      resetPassword(oobCode, newPassword);
    }
  };

  // ── Mode 1: Custom reset (template unlocked, oobCode present) ──
  if (oobCode) {
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
            Nova lozinka
          </Text>

          <Heading
            as="h1"
            mt={3}
            fontSize="2xl"
            fontWeight="semibold"
            letterSpacing="tight"
          >
            Postavi novu lozinku.
          </Heading>

          {email && (
            <Text mt={2} fontSize="sm" color="fg.muted">
              Za račun:{" "}
              <Text as="strong" color="fg">
                {email}
              </Text>
            </Text>
          )}

          {/* Success after custom reset */}
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
                  Lozinka je uspješno promijenjena!
                </Text>
              </Flex>
              <RouterLink to="/signin">
                <Button
                  colorPalette="primary"
                  w="full"
                  borderRadius="2xl"
                  size="lg"
                  fontSize="sm"
                >
                  Prijavi se
                  <LuArrowRight />
                </Button>
              </RouterLink>
            </VStack>
          ) : (
            /* Custom reset form */
            <VStack
              as="form"
              mt={8}
              gap={5}
              align="stretch"
              onSubmit={handleSubmit}
            >
              {error && (
                <Flex
                  gap={2}
                  p={3}
                  borderRadius="xl"
                  bg="red.50"
                  color="red.600"
                  _dark={{ bg: "red.950", color: "red.300" }}
                >
                  <LuTriangleAlert style={{ flexShrink: 0, marginTop: 2 }} />
                  <Text fontSize="sm" fontWeight="medium">
                    {error}
                  </Text>
                </Flex>
              )}

              <Field label="Nova lozinka" icon={<LuLock />}>
                <Input
                  type={show ? "text" : "password"}
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  variant="flushed"
                  fontSize="sm"
                  color="fg"
                  _placeholder={{ color: "fg.muted/60" }}
                  placeholder="Najmanje 8 znakova"
                  p={0}
                  border="none"
                  outline="none"
                  _focus={{ outline: "none" }}
                />
              </Field>

              <HStack
                justify="flex-start"
                fontSize="xs"
                color="fg.muted"
                mt={-3}
              >
                <Button
                  type="button"
                  variant="plain"
                  size="xs"
                  onClick={() => setShow((s) => !s)}
                  color="fg.muted"
                  _hover={{ color: "fg" }}
                >
                  {show ? "Sakrij lozinku" : "Prikaži lozinku"}
                </Button>
              </HStack>

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
                {isPending ? "Spremam..." : "Spremi novu lozinku"}
              </Button>
            </VStack>
          )}
        </Box>
      </Flex>
    );
  }

  // ── Mode 2: Post-Firebase success landing (template still locked) ──
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
        textAlign="center"
      >
        <Flex
          w="full"
          display={{ base: "flex", md: "none" }}
          align="center"
          justify="center"
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

        <VStack gap={5}>
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
            <LuCircleCheck size="3rem" />
            <Heading as="h1" fontSize="xl" fontWeight="semibold">
              Lozinka uspješno promijenjena!
            </Heading>
            <Text fontSize="sm" color="fg.muted">
              Tvoja nova lozinka je spremljena. Sada se možeš prijaviti s njom.
            </Text>
          </Flex>

          <RouterLink to="/signin">
            <Button
              colorPalette="primary"
              w="full"
              borderRadius="2xl"
              size="lg"
              fontSize="sm"
              boxShadow="0 18px 40px -20px oklch(0.2 0.05 50 / 0.6)"
            >
              Prijavi se
              <LuArrowRight />
            </Button>
          </RouterLink>
        </VStack>
      </Box>
    </Flex>
  );
}
