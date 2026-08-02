import { useState, useCallback, useMemo } from "react";
import { Box, Flex, Grid, IconButton, Input, Text } from "@chakra-ui/react";
import {
  LuBookOpen,
  LuCircleCheck,
  LuPlus,
  LuTrash2,
  LuUsers,
} from "react-icons/lu";
import { useCollection } from "@/hooks/useCollection";
import { useFirestore } from "@/hooks/useFirestore";

// ═══════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════

type Record = {
  id: string;
  name: string;
  uid: string;
  paidStudentIds?: string[];
};

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  uid: string;
};

// ═══════════════════════════════════════════════════════════════
// RecordsLists
// ═══════════════════════════════════════════════════════════════

export default function RecordsLists() {
  const { data: records = [] } = useCollection<Record>("records");
  const { data: students = [] } = useCollection<Student>("students");

  const {
    addDocument: addRecord,
    deleteDocument: deleteRecord,
    updateDocument: updateRecord,
  } = useFirestore("records");

  const [newRecordName, setNewRecordName] = useState("");
  const [newRecordError, setNewRecordError] = useState("");
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  const selectedRecord = useMemo(
    () => records.find((a) => a.id === selectedRecordId) ?? null,
    [records, selectedRecordId],
  );

  const handleAddRecord = useCallback(async () => {
    const name = newRecordName.trim();
    if (!name) {
      setNewRecordError("Naziv evidencije ne može biti prazan.");
      return;
    }
    await addRecord({ name, paidStudentIds: [] });
    setNewRecordName("");
    setNewRecordError("");
  }, [newRecordName, addRecord]);

  const handleDeleteRecord = useCallback(
    async (id: string) => {
      await deleteRecord(id);
      if (selectedRecordId === id) setSelectedRecordId(null);
    },
    [deleteRecord, selectedRecordId],
  );

  const togglePaid = useCallback(
    async (studentId: string) => {
      if (!selectedRecord) return;
      const current = selectedRecord.paidStudentIds ?? [];
      const updated = current.includes(studentId)
        ? current.filter((id) => id !== studentId)
        : [...current, studentId];
      await updateRecord(selectedRecord.id, { paidStudentIds: updated });
    },
    [selectedRecord, updateRecord],
  );

  const paidIds = selectedRecord?.paidStudentIds ?? [];
  const paidCount = students.filter((s) => paidIds.includes(s.id)).length;

  return (
    <>
      {/* Page heading */}
      <Flex align="end" justify="space-between" gap={4} mb={4} px={1}>
        <Box>
          <Text
            textStyle="display"
            mt={1}
            fontSize={{ base: "5xl", sm: "6xl" }}
            fontWeight="normal"
            letterSpacing="tight"
            color="fg"
            lineHeight="1.05"
          >
            Evidencije
          </Text>
        </Box>
      </Flex>

      <Text
        fontSize="sm"
        color="fg.muted"
        maxW="3xl"
        lineHeight="relaxed"
        mb={8}
        px={1}
      >
        Evidencija omogućuje praćenje izvršenih obveza učenika kroz
        prilagodljive popise. Dodajte naziv evidencije i jednostavno označite
        učenika kada učenik ispuni svoju obvezu.
      </Text>

      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        gap={{ base: 6, lg: 8 }}
        alignItems="start"
      >
        {/* ── Left: record list ──────────────────────────────── */}
        <Box minW={0}>
          {/* Card */}
          <Box
            rounded="2rem"
            bg="paper/75"
            borderWidth="1px"
            borderColor="white/70"
            backdropFilter="blur(12px)"
            p={{ base: 6, sm: 8 }}
            boxShadow="0 30px 70px -40px oklch(0.3 0.06 60 / 0.3)"
            h="55vh"
            display="flex"
            flexDirection="column"
            overflow="hidden"
          >
            <Box
              as="label"
              display="block"
              fontSize="10px"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="0.18em"
              color="gold"
              mb={4}
            >
              Nova evidencija
            </Box>

            {/* Add record row */}
            <Flex
              flexDirection="column"
              borderBottomWidth="1px"
              borderColor="border/30"
              mb={6}
            >
              <Flex gap={2} pb={5}>
                <Input
                  flex={1}
                  placeholder="npr. Fotografiranje razreda…"
                  value={newRecordName}
                  onChange={(e) => {
                    setNewRecordName(e.target.value);
                    if (newRecordError) setNewRecordError("");
                  }}
                  size="sm"
                  rounded="xl"
                  borderColor="border"
                  bg="secondary.solid/50"
                  color="fg"
                  fontSize="sm"
                  _placeholder={{ color: "muted.contrast/60" }}
                  _focusVisible={{
                    outline: "none",
                    borderColor: "primary.solid/40",
                    boxShadow: "0 0 0 2px {colors.primary.solid/30}",
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddRecord();
                  }}
                />
                <IconButton
                  aria-label="Dodaj evidenciju"
                  size="sm"
                  rounded="xl"
                  bg="primary.solid"
                  color="primary.contrast"
                  _hover={{ opacity: 0.85 }}
                  _active={{ transform: "scale(0.95)" }}
                  transition="all 0.15s"
                  onClick={handleAddRecord}
                >
                  <LuPlus />
                </IconButton>
              </Flex>

              {/* Validation error */}
              {newRecordError && (
                <Text fontSize="xs" color="destructive.fg" mb={4} mt={-3}>
                  {newRecordError}
                </Text>
              )}
            </Flex>

            {/* Record list */}
            {records.length === 0 ? (
              <Text fontSize="md" color="fg/30" py={3} fontStyle="italic">
                Još nema evidencija. Dodaj novu evidenciju pomoću polja iznad.
              </Text>
            ) : (
              <Flex
                direction="column"
                gap={2}
                flex={1}
                overflowY="auto"
                minH={0}
              >
                {records.map((a) => {
                  const isSelected = a.id === selectedRecordId;
                  return (
                    <Flex
                      key={a.id}
                      align="center"
                      gap={3}
                      py={3}
                      px={4}
                      rounded="xl"
                      cursor="pointer"
                      bg={
                        isSelected ? "primary.solid/12" : "secondary.solid/30"
                      }
                      borderWidth="1px"
                      borderColor={
                        isSelected ? "primary.solid/35" : "transparent"
                      }
                      _hover={{
                        bg: isSelected
                          ? "primary.solid/18"
                          : "secondary.solid/50",
                      }}
                      transition="all 0.15s"
                      onClick={() =>
                        setSelectedRecordId(isSelected ? null : a.id)
                      }
                      role="button"
                    >
                      <Flex
                        h={8}
                        w={8}
                        align="center"
                        justify="center"
                        rounded="lg"
                        bg={
                          isSelected ? "primary.solid/20" : "secondary.solid/60"
                        }
                        color={isSelected ? "primary.solid" : "muted.contrast"}
                        flexShrink={0}
                        transition="all 0.15s"
                      >
                        <LuBookOpen size="0.9rem" />
                      </Flex>

                      <Box flex={1} minW={0}>
                        <Text
                          fontSize="sm"
                          fontWeight="semibold"
                          color="fg"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          {a.name}
                        </Text>
                      </Box>

                      <IconButton
                        aria-label="Obriši evidenciju"
                        variant="ghost"
                        size="2xs"
                        color="muted.contrast/50"
                        _hover={{ color: "red.500" }}
                        transition="color 0.15s"
                        flexShrink={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRecord(a.id);
                        }}
                      >
                        <LuTrash2 />
                      </IconButton>
                    </Flex>
                  );
                })}
              </Flex>
            )}
          </Box>
        </Box>

        {/* ── Right: student payment roster ───────────────────── */}
        <Box as="aside" position={{ lg: "sticky" }} top={{ lg: 0 }}>
          {selectedRecord ? (
            <Box
              rounded="2rem"
              bg="paper/75"
              borderWidth="1px"
              borderColor="white/70"
              backdropFilter="blur(12px)"
              p={{ base: 6, sm: 8 }}
              boxShadow="0 30px 70px -40px oklch(0.3 0.06 60 / 0.3)"
              h="65vh"
              display="flex"
              flexDirection="column"
              overflow="hidden"
            >
              {/* Panel header */}
              <Flex
                align="start"
                justify="space-between"
                gap={3}
                mb={5}
                flexShrink={0}
              >
                <Box minW={0} flex={1}>
                  <Text
                    textStyle="display"
                    fontSize={{ base: "2xl", sm: "3xl" }}
                    fontWeight="semibold"
                    color="fg"
                    lineHeight="tight"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {selectedRecord.name}
                  </Text>
                </Box>

                <Flex
                  align="center"
                  gap={1.5}
                  rounded="full"
                  bg="secondary.solid"
                  px={3}
                  py={1.5}
                  flexShrink={0}
                >
                  <LuUsers size="0.75rem" />
                  <Text fontSize="xs" fontWeight="bold" color="fg">
                    {paidCount}/{students.length}
                  </Text>
                </Flex>
              </Flex>

              {students.length === 0 ? (
                <Text
                  fontSize="sm"
                  color="fg/30"
                  fontStyle="italic"
                  flexShrink={0}
                >
                  Nema učenika u razredu. Dodaj ih na stranici Razred.
                </Text>
              ) : (
                <Flex direction="column" gap={1.5} overflowY="auto" minH={0}>
                  {students.map((s) => {
                    const paid = paidIds.includes(s.id);
                    return (
                      <Flex
                        key={s.id}
                        align="center"
                        gap={3}
                        py={2.5}
                        px={3}
                        rounded="xl"
                        bg={paid ? "secondary.solid/40" : "secondary.solid/20"}
                        borderWidth="1px"
                        borderColor={paid ? "border/50" : "transparent"}
                        transition="all 0.2s"
                      >
                        <Text
                          flex={1}
                          minW={0}
                          fontSize="sm"
                          fontWeight="medium"
                          color={paid ? "fg/35" : "fg/85"}
                          textDecoration={paid ? "line-through" : "none"}
                          transition="all 0.2s"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          {s.firstName} {s.lastName}
                        </Text>
                        <IconButton
                          aria-label={
                            paid ? "Označi neplaćenim" : "Označi plaćenim"
                          }
                          variant="ghost"
                          size="sm"
                          rounded="lg"
                          color={paid ? "green.500" : undefined}
                          _hover={{ color: "green.500" }}
                          transition="all 0.15s"
                          flexShrink={0}
                          onClick={() => togglePaid(s.id)}
                        >
                          <LuCircleCheck />
                        </IconButton>
                      </Flex>
                    );
                  })}
                </Flex>
              )}
            </Box>
          ) : (
            /* Empty state — no record selected */
            <Box
              rounded="2rem"
              bg="paper/40"
              borderWidth="1px"
              borderColor="white/40"
              backdropFilter="blur(8px)"
              p={{ base: 6, sm: 10 }}
              textAlign="center"
            >
              <Flex
                h={12}
                w={12}
                align="center"
                justify="center"
                rounded="2xl"
                bg="secondary.solid/60"
                color="muted.contrast"
                mx="auto"
                mb={4}
              >
                <LuUsers size="1.25rem" />
              </Flex>
              <Text fontSize="sm" fontWeight="semibold" color="fg/60" mb={1}>
                Odaberi evidenciju
              </Text>
              <Text
                fontSize="xs"
                color="muted.contrast/50"
                display={{ base: "block", lg: "none" }}
              >
                Klikni na evidenciju iznad da vidiš popis učenika.
              </Text>
              <Text
                fontSize="xs"
                color="muted.contrast/50"
                display={{ base: "none", lg: "block" }}
              >
                Klikni na evidenciju s lijeve strane da vidiš popis učenika.
              </Text>
            </Box>
          )}
        </Box>
      </Grid>
    </>
  );
}
