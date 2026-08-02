import { useState, useCallback } from "react";
import { Box, Button, Dialog, Flex, Grid, Input, Text } from "@chakra-ui/react";
import { LuPlus, LuTrash2, LuX } from "react-icons/lu";
import { useCollection } from "@/hooks/useCollection";
import { useFirestore } from "@/hooks/useFirestore";

// ═══════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  uid: string;
  parent1FirstName?: string;
  parent1LastName?: string;
  parent1Phone?: string;
  parent2FirstName?: string;
  parent2LastName?: string;
  parent2Phone?: string;
  address?: string;
};

type StudentDetails = {
  parent1FirstName: string;
  parent1LastName: string;
  parent1Phone: string;
  parent2FirstName: string;
  parent2LastName: string;
  parent2Phone: string;
  address: string;
};

// ═══════════════════════════════════════════════════════════════
// Student details dialog
// ═══════════════════════════════════════════════════════════════

const labelProps = {
  as: "label" as const,
  display: "block",
  fontSize: "10px",
  textTransform: "uppercase" as const,
  letterSpacing: "wider",
  color: "muted.contrast",
  mb: 1.5,
};

const sectionHeadingProps = {
  fontSize: "xs" as const,
  textTransform: "uppercase" as const,
  letterSpacing: "0.15em",
  color: "primary.solid",
  fontWeight: "medium" as const,
  mb: 3,
};

function StudentDetailsDialog({
  student,
  open,
  onClose,
  onSave,
  isSaving,
}: {
  student: Student | null;
  open: boolean;
  onClose: () => void;
  onSave: (id: string, details: StudentDetails) => Promise<void>;
  isSaving: boolean;
}) {
  const [form, setForm] = useState<StudentDetails>(() => ({
    parent1FirstName: student?.parent1FirstName ?? "",
    parent1LastName: student?.parent1LastName ?? "",
    parent1Phone: student?.parent1Phone ?? "",
    parent2FirstName: student?.parent2FirstName ?? "",
    parent2LastName: student?.parent2LastName ?? "",
    parent2Phone: student?.parent2Phone ?? "",
    address: student?.address ?? "",
  }));

  const set =
    (field: keyof StudentDetails) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = async () => {
    if (!student) return;
    try {
      await onSave(student.id, {
        parent1FirstName: form.parent1FirstName.trim(),
        parent1LastName: form.parent1LastName.trim(),
        parent1Phone: form.parent1Phone.trim(),
        parent2FirstName: form.parent2FirstName.trim(),
        parent2LastName: form.parent2LastName.trim(),
        parent2Phone: form.parent2Phone.trim(),
        address: form.address.trim(),
      });
      onClose();
    } catch {
      // error handled by hook
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
      size="md"
      motionPreset="slide-in-bottom"
      scrollBehavior="inside"
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          rounded="2xl"
          bg="card.solid/80"
          borderWidth="1px"
          borderColor="fg/8"
          backdropFilter="blur(12px)"
        >
          <Dialog.CloseTrigger asChild position="absolute" top={3} right={3}>
            <Button
              variant="ghost"
              size="xs"
              rounded="lg"
              p={1.5}
              minW={0}
              h="auto"
              color="muted.contrast"
            >
              <LuX />
            </Button>
          </Dialog.CloseTrigger>

          <Dialog.Header flexDirection="column" pb={1}>
            <Text fontSize="xs" color="gold" mt={0.5}>
              Podaci o učeniku
            </Text>
            <Dialog.Title fontSize="xl" fontWeight="semibold" color="fg">
              {student?.lastName} {student?.firstName}
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body pb={4} display="flex" flexDirection="column" gap={5}>
            <Box>
              <Text {...sectionHeadingProps}>Roditelj 1</Text>
              <Grid
                templateColumns={{ base: "1fr", sm: "1fr 1fr" }}
                gap={3}
                mb={3}
              >
                <Box>
                  <Text {...labelProps}>Prezime</Text>
                  <Input
                    value={form.parent1LastName}
                    onChange={set("parent1LastName")}
                    {...sharedInputProps}
                  />
                </Box>
                <Box>
                  <Text {...labelProps}>Ime</Text>
                  <Input
                    value={form.parent1FirstName}
                    onChange={set("parent1FirstName")}
                    {...sharedInputProps}
                  />
                </Box>
              </Grid>
              <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={3}>
                <Box>
                  <Text {...labelProps}>Telefon</Text>
                  <Input
                    type="tel"
                    value={form.parent1Phone}
                    onChange={set("parent1Phone")}
                    {...sharedInputProps}
                  />
                </Box>
              </Grid>
            </Box>

            <Box borderTopWidth="1px" borderColor="border" pt={5}>
              <Text {...sectionHeadingProps}>Roditelj 2</Text>
              <Grid
                templateColumns={{ base: "1fr", sm: "1fr 1fr" }}
                gap={3}
                mb={3}
              >
                <Box>
                  <Text {...labelProps}>Prezime</Text>
                  <Input
                    value={form.parent2LastName}
                    onChange={set("parent2LastName")}
                    {...sharedInputProps}
                  />
                </Box>
                <Box>
                  <Text {...labelProps}>Ime</Text>
                  <Input
                    value={form.parent2FirstName}
                    onChange={set("parent2FirstName")}
                    {...sharedInputProps}
                  />
                </Box>
              </Grid>
              <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={3}>
                <Box>
                  <Text {...labelProps}>Telefon</Text>
                  <Input
                    type="tel"
                    value={form.parent2Phone}
                    onChange={set("parent2Phone")}
                    {...sharedInputProps}
                  />
                </Box>
              </Grid>
            </Box>

            <Box borderTopWidth="1px" borderColor="border" pt={5}>
              <Text {...sectionHeadingProps}>Adresa</Text>
              <Box>
                <Text {...labelProps}>Kućna adresa</Text>
                <Input
                  value={form.address}
                  onChange={set("address")}
                  {...sharedInputProps}
                />
              </Box>
            </Box>
          </Dialog.Body>

          <Dialog.Footer
            gap={2}
            borderTopWidth="1px"
            borderColor="border"
            pt={4}
          >
            <Button
              variant="ghost"
              onClick={onClose}
              rounded="xl"
              fontSize="sm"
              color="muted.contrast"
              _hover={{ bg: "secondary.solid/50" }}
            >
              Odustani
            </Button>
            <Button
              onClick={handleSave}
              loading={isSaving}
              rounded="xl"
              bg="primary.solid"
              color="primary.contrast"
              px={5}
              fontSize="sm"
              fontWeight="medium"
              boxShadow="sm"
              _hover={{ opacity: 0.9 }}
              _active={{ transform: "scale(0.98)" }}
              transition="all 0.15s"
            >
              Spremi
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}

// ═══════════════════════════════════════════════════════════════
// Shell — glassmorphism card wrapper
// ═══════════════════════════════════════════════════════════════

function Shell({
  children,
  padded = true,
}: {
  children: React.ReactNode;
  padded?: boolean;
}) {
  return (
    <Box
      position="relative"
      rounded="2rem"
      bg="card.solid/70"
      borderWidth="1px"
      borderColor="fg/8"
      backdropFilter="blur(12px)"
      boxShadow="0 30px 70px -40px oklch(0.3 0.06 60 / 0.35)"
      overflow="visible"
      px={padded ? { base: 6, sm: 10 } : undefined}
      py={padded ? { base: 8, sm: 10 } : undefined}
    >
      {children}
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════════
// Shared input style
// ═══════════════════════════════════════════════════════════════

const sharedInputProps = {
  size: "sm" as const,
  rounded: "xl",
  borderColor: "border",
  bg: "secondary.solid/50",
  color: "fg",
  fontSize: "sm",
  _placeholder: { color: "muted.contrast/60" },
  _focusVisible: {
    outline: "none",
    borderColor: "primary.solid/40",
    boxShadow: "0 0 0 2px {colors.primary.solid/30}",
  },
};

// ═══════════════════════════════════════════════════════════════
// Roster page
// ═══════════════════════════════════════════════════════════════

export default function Roster() {
  const { data: roster = [], isLoading: rosterLoading } =
    useCollection<Student>("students");
  const {
    addDocument,
    deleteDocument,
    updateDocument,
    isAddingDocument,
    isUpdatingDocument,
    deletingDocumentId,
  } = useFirestore("students");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const addStudent = useCallback(async () => {
    const f = firstName.trim();
    const l = lastName.trim();
    if (!f && !l) return;
    await addDocument({ firstName: capitalize(f), lastName: capitalize(l) });
    setFirstName("");
    setLastName("");
  }, [firstName, lastName, addDocument]);

  const removeStudent = useCallback(
    async (id: string) => {
      await deleteDocument(id);
    },
    [deleteDocument],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addStudent();
    }
  };

  return (
    <>
      <Shell>
        {/* Title row */}
        <Flex
          align="end"
          justify="space-between"
          gap={4}
          pb={4}
          borderBottomWidth="1px"
          borderColor="border"
        >
          <Box>
            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="0.2em"
              color="gold"
            >
              Razredni popis
            </Text>
            <Text
              textStyle="display"
              fontSize={{ base: "4xl", sm: "5xl" }}
              fontWeight="semibold"
              letterSpacing="tight"
              color="fg"
            >
              Moji učenici
            </Text>
          </Box>
        </Flex>

        {/* Add student row */}
        <Box mt={4}>
          <Flex
            direction={{ base: "column", sm: "row" }}
            align={{ base: "stretch", sm: "end" }}
            gap={3}
          >
            <Box flex={1}>
              <Text
                as="label"
                display="block"
                fontSize="10px"
                textTransform="uppercase"
                letterSpacing="wider"
                color="muted.contrast"
                mb={1.5}
              >
                Prezime
              </Text>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onKeyDown={handleKeyDown}
                {...sharedInputProps}
              />
            </Box>
            <Box flex={1}>
              <Text
                as="label"
                display="block"
                fontSize="10px"
                textTransform="uppercase"
                letterSpacing="wider"
                color="muted.contrast"
                mb={1.5}
              >
                Ime
              </Text>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onKeyDown={handleKeyDown}
                {...sharedInputProps}
              />
            </Box>

            <Button
              onClick={addStudent}
              loading={isAddingDocument}
              rounded="xl"
              bg="primary.solid"
              color="primary.contrast"
              px={5}
              py={2.5}
              fontSize="sm"
              fontWeight="medium"
              boxShadow="sm"
              _hover={{ opacity: 0.9 }}
              _active={{ transform: "scale(0.98)" }}
              transition="all 0.15s"
            >
              <LuPlus style={{ marginRight: "0.375rem" }} />
              Dodaj
            </Button>
          </Flex>
        </Box>

        {/* Student list */}
        <Box mt={8}>
          {(() => {
            const sortedRoster = [...roster].sort((a, b) => {
              const last = a.lastName.localeCompare(b.lastName);
              return last !== 0 ? last : a.firstName.localeCompare(b.firstName);
            });
            return rosterLoading ? (
              <Box
                rounded="2xl"
                borderWidth="1px"
                borderColor="border"
                bg="secondary.solid/30"
                py={16}
                textAlign="center"
                fontSize="sm"
                color="muted.contrast"
              >
                Učitavanje učenika…
              </Box>
            ) : sortedRoster.length === 0 ? (
              <Box
                rounded="2xl"
                borderWidth="1px"
                borderStyle="dashed"
                borderColor="border"
                bg="secondary.solid/30"
                py={16}
                textAlign="center"
                fontSize="sm"
                color="muted.contrast"
              >
                Još nema učenika. Dodaj prvog učenika iznad.
              </Box>
            ) : (
              <Box
                as="ul"
                listStyleType="none"
                m={0}
                p={0}
                rounded="2xl"
                borderWidth="1px"
                borderColor="border"
                overflowX="hidden"
                overflowY="auto"
                maxH="400px"
              >
                {sortedRoster.map((student, index) => (
                  <Box
                    key={student.id}
                    as="li"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={3}
                    px={5}
                    py={3.5}
                    bg="secondary.solid/40"
                    borderBottomWidth={
                      index < sortedRoster.length - 1 ? "1px" : 0
                    }
                    borderColor="border"
                    cursor="pointer"
                    transition="background 0.15s"
                    onClick={() => setSelectedStudent(student)}
                    _hover={{
                      bg: "secondary.solid/60",
                      "& .delete-btn": { opacity: 1 },
                    }}
                  >
                    <Flex align="center" gap={3} minW={0}>
                      <Box minW={0}>
                        <Text
                          truncate
                          fontSize="sm"
                          fontWeight="medium"
                          color="fg"
                        >
                          {index + 1}. {student.lastName} {student.firstName}
                        </Text>
                      </Box>
                    </Flex>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeStudent(student.id);
                      }}
                      aria-label={`Ukloni ${student.lastName} ${student.firstName}`}
                      className="delete-btn"
                      loading={deletingDocumentId === student.id}
                      disabled={deletingDocumentId !== null}
                      variant="ghost"
                      h={8}
                      w={8}
                      minW={0}
                      p={0}
                      rounded="lg"
                      color="muted.contrast"
                      transition="opacity 0.15s"
                      _hover={{
                        bg: "destructive.solid/10",
                        color: "destructive.fg",
                      }}
                    >
                      <LuTrash2 />
                    </Button>
                  </Box>
                ))}
              </Box>
            );
          })()}
        </Box>
      </Shell>
      <StudentDetailsDialog
        key={selectedStudent?.id ?? "none"}
        student={selectedStudent}
        open={selectedStudent !== null}
        onClose={() => setSelectedStudent(null)}
        onSave={(id, details) => updateDocument(id, details)}
        isSaving={isUpdatingDocument}
      />
    </>
  );
}
