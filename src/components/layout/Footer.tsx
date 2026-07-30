import { Flex, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      as="footer"
      mt={10}
      justify="center"
      fontSize="10px"
      letterSpacing="0.2em"
      color="muted.contrast/70"
    >
      <Text>e-Rokovnik</Text>
      <Text textTransform="uppercase"> · Planer za moderne učitelje</Text>
    </Flex>
  );
}
