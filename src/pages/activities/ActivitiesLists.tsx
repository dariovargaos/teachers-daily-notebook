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

type Activity = {
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
// ActivitiesLists
// ═══════════════════════════════════════════════════════════════

export default function ActivitiesLists() {
  const { data: activities = [] } = useCollection<Activity>("activities");
  const { data: students = [] } = useCollection<Student>("students");

  const {
    addDocument: addActivity,
    deleteDocument: deleteActivity,
    updateDocument: updateActivity,
  } = useFirestore("activities");

  const [newActivityName, setNewActivityName] = useState("");
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
    null,
  );

  const selectedActivity = useMemo(
    () => activities.find((a) => a.id === selectedActivityId) ?? null,
    [activities, selectedActivityId],
  );

  const handleAddActivity = useCallback(async () => {
    const name = newActivityName.trim();
    if (!name) return;
    await addActivity({ name, paidStudentIds: [] });
    setNewActivityName("");
  }, [newActivityName, addActivity]);

  const handleDeleteActivity = useCallback(
    async (id: string) => {
      await deleteActivity(id);
      if (selectedActivityId === id) setSelectedActivityId(null);
    },
    [deleteActivity, selectedActivityId],
  );

  const togglePaid = useCallback(
    async (studentId: string) => {
      if (!selectedActivity) return;
      const current = selectedActivity.paidStudentIds ?? [];
      const updated = current.includes(studentId)
        ? current.filter((id) => id !== studentId)
        : [...current, studentId];
      await updateActivity(selectedActivity.id, { paidStudentIds: updated });
    },
    [selectedActivity, updateActivity],
  );

  const paidIds = selectedActivity?.paidStudentIds ?? [];
  const paidCount = students.filter((s) => paidIds.includes(s.id)).length;

  return (
    <>
      {/* Page heading */}
      <Flex align="end" justify="space-between" gap={4} mb={6} px={1}>
        <Box>
          <Text
            fontSize="10px"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="0.22em"
            color="gold"
          >
            Školske aktivnosti
          </Text>
          <Text
            textStyle="display"
            mt={1}
            fontSize={{ base: "5xl", sm: "6xl" }}
            fontWeight="normal"
            letterSpacing="tight"
            color="fg"
            lineHeight="1.05"
          >
            Aktivnosti
          </Text>
        </Box>
      </Flex>

      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        gap={{ base: 6, lg: 8 }}
        alignItems="start"
      >
        {/* ── Left: activity list ──────────────────────────────── */}
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
            h="65vh"
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
              Nova aktivnost
            </Box>

            {/* Add activity row */}
            <Flex
              gap={2}
              mb={6}
              pb={5}
              borderBottomWidth="1px"
              borderColor="border/30"
            >
              <Input
                flex={1}
                placeholder="npr. Fotografiranje razreda…"
                value={newActivityName}
                onChange={(e) => setNewActivityName(e.target.value)}
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
                  if (e.key === "Enter") handleAddActivity();
                }}
              />
              <IconButton
                aria-label="Dodaj aktivnost"
                size="sm"
                rounded="xl"
                bg="primary.solid"
                color="primary.contrast"
                _hover={{ opacity: 0.85 }}
                _active={{ transform: "scale(0.95)" }}
                transition="all 0.15s"
                onClick={handleAddActivity}
              >
                <LuPlus />
              </IconButton>
            </Flex>

            {/* Activity list */}
            {activities.length === 0 ? (
              <Text fontSize="md" color="fg/30" py={3} fontStyle="italic">
                Još nema aktivnosti. Dodaj prvu iznad…
              </Text>
            ) : (
              <Flex
                direction="column"
                gap={2}
                flex={1}
                overflowY="auto"
                minH={0}
              >
                {activities.map((a) => {
                  const isSelected = a.id === selectedActivityId;
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
                        setSelectedActivityId(isSelected ? null : a.id)
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
                        aria-label="Obriši aktivnost"
                        variant="ghost"
                        size="2xs"
                        color="muted.contrast/50"
                        _hover={{ color: "red.500" }}
                        transition="color 0.15s"
                        flexShrink={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteActivity(a.id);
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
          {selectedActivity ? (
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
                    {selectedActivity.name}
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
            /* Empty state — no activity selected */
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
                Odaberi aktivnost
              </Text>
              <Text fontSize="xs" color="muted.contrast/50">
                Klikni na aktivnost s lijeve strane da vidiš popis učenika i
                upravljaš uplatama.
              </Text>
            </Box>
          )}
        </Box>
      </Grid>
    </>
  );
}
