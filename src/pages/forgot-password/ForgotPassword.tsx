import { useState } from "react";
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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { resetPassword, error, isPending, isSuccess } = useResetPassword();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    resetPassword(email);
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
              {isPending ? "Šaljem..." : "Pošalji poveznicu"}
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
