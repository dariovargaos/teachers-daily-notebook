import { useNavigate, useLocation } from "react-router";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { LuNotebookPen, LuLogOut } from "react-icons/lu";
import { useLogout } from "@/hooks/useLogout";

interface Props {
  teacherFirstName: string;
  year: number;
}

export default function AppHeader({ teacherFirstName, year }: Props) {
  const { logout, isPending } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const isPlanner = location.pathname === "/";
  const isRoster = location.pathname === "/roster";

  return (
    <Flex
      as="header"
      mb={{ base: 8, sm: 10 }}
      align="center"
      justify="space-between"
    >
      {/* Logo + title */}
      <Flex align="center" gap={3}>
        <Flex
          h={10}
          w={10}
          align="center"
          justify="center"
          rounded="xl"
          bg="primary.solid"
          color="primary.contrast"
          boxShadow="0 8px 24px -12px oklch(0.2 0.03 50 / 0.6)"
        >
          <LuNotebookPen size="1.125rem" />
        </Flex>
        <Box lineHeight="tight">
          {teacherFirstName && (
            <Text
              fontSize="xs"
              fontWeight="medium"
              color="muted.contrast"
              mb={0.5}
            >
              Good day, {teacherFirstName}
            </Text>
          )}
          <Text
            textStyle="display"
            fontSize="sm"
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="0.18em"
            color="fg"
          >
            Atelier
          </Text>
          <Text
            fontSize="10px"
            fontWeight="medium"
            letterSpacing="0.18em"
            color="muted.contrast"
          >
            EST. {year}
          </Text>
        </Box>
      </Flex>

      {/* Nav tabs */}
      <Flex
        as="nav"
        align="center"
        gap={1}
        rounded="full"
        bg="secondary.solid/85"
        p={1}
      >
        <Button
          onClick={() => navigate("/")}
          variant="plain"
          rounded="full"
          px={4}
          py={1.5}
          fontSize="xs"
          fontWeight="semibold"
          bg={isPlanner ? "card.solid" : "transparent"}
          color={isPlanner ? "fg" : "muted.contrast/70"}
          boxShadow={isPlanner ? "sm" : undefined}
          _hover={{ color: "fg" }}
          transition="all 0.15s"
        >
          Planner
        </Button>
        <Button
          onClick={() => navigate("/roster")}
          variant="plain"
          rounded="full"
          px={4}
          py={1.5}
          fontSize="xs"
          fontWeight="semibold"
          bg={isRoster ? "card.solid" : "transparent"}
          color={isRoster ? "fg" : "muted.contrast/70"}
          boxShadow={isRoster ? "sm" : undefined}
          _hover={{ color: "fg" }}
          transition="all 0.15s"
        >
          Roster
        </Button>

        {/* Logout */}
        <Button
          onClick={logout}
          loading={isPending}
          aria-label="Sign out"
          variant="ghost"
          minW={0}
          rounded="full"
          borderWidth="1px"
          borderColor="border/70"
          bg="card.solid/60"
          color="muted.contrast"
          _hover={{ color: "fg", borderColor: "fg/30" }}
          _active={{ transform: "scale(0.95)" }}
          transition="all 0.15s"
        >
          Log out
          <LuLogOut />
        </Button>
      </Flex>
    </Flex>
  );
}
