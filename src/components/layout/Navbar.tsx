import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Drawer,
  Flex,
  IconButton,
  Input,
  Portal,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuNotebookPen, LuLogOut, LuMenu, LuUserX } from "react-icons/lu";
import { useLogout } from "@/hooks/useLogout";
import { useDeleteAccount } from "@/hooks/useDeleteAccount";

interface Props {
  teacherFirstName: string;
}

export default function Navbar({ teacherFirstName }: Props) {
  const navigate = useNavigate();
  const { logout, isPending } = useLogout();
  const {
    deleteAccount,
    reauthAndDelete,
    resetState: resetDeleteState,
    needsReauth,
    isPending: deleteIsPending,
    error: deleteError,
  } = useDeleteAccount(() => navigate("/prijava", { replace: true }));
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const isPlanner =
    location.pathname === "/planer" || location.pathname === "/planer/";
  const isRoster = location.pathname === "/planer/razred";
  const isRecords = location.pathname === "/planer/evidencija";

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
              Dobar dan, {teacherFirstName}
            </Text>
          )}
          <Text
            textStyle="display"
            fontSize="sm"
            fontWeight="semibold"
            color="fg"
          >
            e-Rokovnik
          </Text>
        </Box>
      </Flex>

      {/* Desktop nav + delete button — hidden on mobile */}
      <Flex hideBelow="md" align="center" gap={2}>
        <Flex
          as="nav"
          align="center"
          gap={1}
          rounded="full"
          bg="secondary.solid/85"
          p={1}
        >
          <Button
            onClick={() => navigate("/planer")}
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
            Planer
          </Button>
          <Button
            onClick={() => navigate("/planer/razred")}
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
            Razred
          </Button>
          <Button
            onClick={() => navigate("/planer/evidencija")}
            variant="plain"
            rounded="full"
            px={4}
            py={1.5}
            fontSize="xs"
            fontWeight="semibold"
            bg={isRecords ? "card.solid" : "transparent"}
            color={isRecords ? "fg" : "muted.contrast/70"}
            boxShadow={isRecords ? "sm" : undefined}
            _hover={{ color: "fg" }}
            transition="all 0.15s"
          >
            Evidencija
          </Button>

          <Button
            onClick={logout}
            loading={isPending}
            aria-label="Odjava"
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
            Odjava
            <LuLogOut />
          </Button>
        </Flex>

        {/* Danger action lives outside the nav pill so it reads as distinct */}
        <IconButton
          onClick={() => setDeleteOpen(true)}
          aria-label="Obriši račun"
          variant="ghost"
          size="sm"
          rounded="full"
          color="fg/30"
          _hover={{ bg: "red.500/15", color: "red.400" }}
          _active={{ transform: "scale(0.95)" }}
          transition="all 0.15s"
        >
          <LuUserX />
        </IconButton>
      </Flex>

      {/* Mobile hamburger menu — hidden on desktop */}
      <Box hideFrom="md">
        <Drawer.Root
          placement="end"
          size="xs"
          open={menuOpen}
          onOpenChange={(e) => setMenuOpen(e.open)}
        >
          <Drawer.Trigger asChild>
            <IconButton
              aria-label="Otvori izbornik"
              variant="ghost"
              rounded="full"
              borderWidth="1px"
              borderColor="border/70"
              bg="secondary.solid/85"
              color="muted.contrast"
              _hover={{ color: "fg" }}
            >
              <LuMenu />
            </IconButton>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content bg="bg">
                <Drawer.Header borderBottomWidth="1px" borderColor="border/50">
                  <Drawer.Title fontSize="sm" fontWeight="semibold">
                    Navigacija
                  </Drawer.Title>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton
                      size="sm"
                      position="absolute"
                      top={3}
                      right={3}
                    />
                  </Drawer.CloseTrigger>
                </Drawer.Header>
                <Drawer.Body pt={4}>
                  <VStack gap={2} align="stretch">
                    <Button
                      onClick={() => {
                        navigate("/planer");
                        setMenuOpen(false);
                      }}
                      variant="ghost"
                      justifyContent="flex-start"
                      rounded="lg"
                      fontWeight="semibold"
                      fontSize="sm"
                      bg={isPlanner ? "secondary.solid/60" : "transparent"}
                      color={isPlanner ? "fg" : "muted.contrast"}
                      _hover={{ color: "fg", bg: "secondary.solid/40" }}
                    >
                      Planer
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/planer/razred");
                        setMenuOpen(false);
                      }}
                      variant="ghost"
                      justifyContent="flex-start"
                      rounded="lg"
                      fontWeight="semibold"
                      fontSize="sm"
                      bg={isRoster ? "secondary.solid/60" : "transparent"}
                      color={isRoster ? "fg" : "muted.contrast"}
                      _hover={{ color: "fg", bg: "secondary.solid/40" }}
                    >
                      Razred
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/planer/evidencija");
                        setMenuOpen(false);
                      }}
                      variant="ghost"
                      justifyContent="flex-start"
                      rounded="lg"
                      fontWeight="semibold"
                      fontSize="sm"
                      bg={isRecords ? "secondary.solid/60" : "transparent"}
                      color={isRecords ? "fg" : "muted.contrast"}
                      _hover={{ color: "fg", bg: "secondary.solid/40" }}
                    >
                      Evidencije
                    </Button>
                  </VStack>
                </Drawer.Body>
                <Drawer.Footer borderTopWidth="1px" borderColor="border/50">
                  <VStack gap={2} w="full">
                    <Button
                      onClick={logout}
                      loading={isPending}
                      variant="outline"
                      w="full"
                      rounded="lg"
                      fontSize="sm"
                      color="muted.contrast"
                      _hover={{ color: "fg" }}
                    >
                      Odjava
                      <LuLogOut />
                    </Button>
                    <Separator />
                    <Button
                      onClick={() => {
                        setMenuOpen(false);
                        setDeleteOpen(true);
                      }}
                      variant="ghost"
                      w="full"
                      rounded="lg"
                      fontSize="sm"
                      color="red.400"
                      _hover={{ bg: "red.500/15", color: "red.500" }}
                    >
                      Obriši račun
                      <LuUserX />
                    </Button>
                  </VStack>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Box>

      {/* Delete account confirmation dialog */}
      <Dialog.Root
        open={deleteOpen}
        onOpenChange={(e) => {
          setDeleteOpen(e.open);
          if (!e.open) {
            resetDeleteState();
            setDeletePassword("");
          }
        }}
        placement="center"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content bg="bg" maxW="sm" rounded="2xl">
              <Dialog.Header>
                <Dialog.Title fontSize="md" fontWeight="semibold">
                  Obriši račun
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text fontSize="sm" color="fg/80">
                  Ova radnja je trajna. Svi tvoji podaci — bilješke,
                  podsjetnici, razred i evidencije — bit će nepovratno obrisani.
                </Text>
                {needsReauth && (
                  <Input
                    type="password"
                    placeholder="Unesi lozinku za potvrdu…"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    mt={3}
                    size="sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && deletePassword)
                        reauthAndDelete(deletePassword);
                    }}
                  />
                )}
                {deleteError && (
                  <Text fontSize="sm" color="red.500" mt={3}>
                    {deleteError}
                  </Text>
                )}
              </Dialog.Body>
              <Dialog.Footer gap={2}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteOpen(false)}
                >
                  Odustani
                </Button>
                <Button
                  colorPalette="red"
                  size="sm"
                  loading={deleteIsPending}
                  onClick={
                    needsReauth
                      ? () => reauthAndDelete(deletePassword)
                      : deleteAccount
                  }
                  disabled={deleteIsPending || (needsReauth && !deletePassword)}
                >
                  Trajno obriši
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" position="absolute" top={3} right={3} />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Flex>
  );
}
