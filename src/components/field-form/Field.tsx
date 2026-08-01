import { Box, HStack, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  icon?: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
}

export default function Field({ label, icon, trailing, children }: FieldProps) {
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
