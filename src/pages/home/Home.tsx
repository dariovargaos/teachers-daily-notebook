import { useMemo, useState, useCallback } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  LuCheck,
  LuChevronLeft,
  LuChevronRight,
  LuCircleCheck,
  LuPencilLine,
  LuPlus,
  LuTrash2,
  LuX,
} from "react-icons/lu";
import { useCollection } from "@/hooks/useCollection";
import { useFirestore } from "@/hooks/useFirestore";
import Calendar from "@/components/calendar/Calendar";

// ═══════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════

// Order matches Date.getDay(): 0=Sunday, 1=Monday, …, 6=Saturday
const WEEKDAYS = [
  "Nedjelja",
  "Ponedjeljak",
  "Utorak",
  "Srijeda",
  "Četvrtak",
  "Petak",
  "Subota",
];
const MONTHS = [
  "Siječanj",
  "Veljača",
  "Ožujak",
  "Travanj",
  "Svibanj",
  "Lipanj",
  "Srpanj",
  "Kolovoz",
  "Rujan",
  "Listopad",
  "Studeni",
  "Prosinac",
];

function eventKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

const notesPerPage = 6;
const remindersPerPage = 3;

type Reminder = {
  id: string;
  date: string;
  text: string;
  uid: string;
};

type PlannerNote = {
  id: string;
  date: string;
  text: string;
  uid: string;
  done?: boolean;
};

// ═══════════════════════════════════════════════════════════════
// PlannerPage — main component
// ═══════════════════════════════════════════════════════════════

export default function Home() {
  const [date, setDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  // ── Planner notes — read via useCollection, write via useFirestore ──
  const { data: allNotes = [] } = useCollection<PlannerNote>("plannerNotes");

  const dateNotes = useMemo(
    () => allNotes.filter((n) => n.date === eventKey(date)),
    [allNotes, date],
  );

  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editNoteText, setEditNoteText] = useState("");
  const [newNoteText, setNewNoteText] = useState("");
  const [notePage, setNotePage] = useState(0);

  const {
    addDocument: addNoteDoc,
    deleteDocument: deleteNoteDoc,
    updateDocument: updateNoteDoc,
  } = useFirestore("plannerNotes");

  const addNote = useCallback(
    async (text: string) => {
      await addNoteDoc({ date: eventKey(date), text });
    },
    [date, addNoteDoc],
  );

  const updateNote = useCallback(
    async (id: string, newText: string) => {
      await updateNoteDoc(id, { text: newText });
    },
    [updateNoteDoc],
  );

  const deleteNote = useCallback(
    async (id: string) => {
      await deleteNoteDoc(id);
    },
    [deleteNoteDoc],
  );

  const toggleNote = useCallback(
    async (id: string, currentDone: boolean) => {
      await updateNoteDoc(id, { done: !currentDone });
    },
    [updateNoteDoc],
  );

  // ── Reminders — read via useCollection, write via useFirestore ──
  const { data: allReminders = [] } = useCollection<Reminder>("reminders");

  const dateReminders = useMemo(
    () => allReminders.filter((r) => r.date === eventKey(date)),
    [allReminders, date],
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [newReminderText, setNewReminderText] = useState("");
  const [reminderPage, setReminderPage] = useState(0);

  // Derived: Date objects for calendar dots (dates with ≥1 reminder)
  const eventDates = useMemo(
    () =>
      [...new Set(allReminders.map((r) => r.date))].map((k) => {
        const [y, m, d] = k.split("-").map(Number);
        return new Date(y, m - 1, d);
      }),
    [allReminders],
  );

  const {
    addDocument: addReminderDoc,
    deleteDocument: deleteReminderDoc,
    updateDocument: updateReminderDoc,
  } = useFirestore("reminders");

  // ── CRUD on the current date's reminders ──
  const addReminder = useCallback(
    async (text: string) => {
      await addReminderDoc({ date: eventKey(date), text });
    },
    [date, addReminderDoc],
  );

  const updateReminder = useCallback(
    async (id: string, newText: string) => {
      await updateReminderDoc(id, { text: newText });
    },
    [updateReminderDoc],
  );

  const deleteReminder = useCallback(
    async (id: string) => {
      await deleteReminderDoc(id);
    },
    [deleteReminderDoc],
  );

  const totalReminderPages =
    Math.ceil(dateReminders.length / remindersPerPage) || 1;
  const safePage = Math.min(reminderPage, totalReminderPages - 1);
  const pagedReminders = dateReminders.slice(
    safePage * remindersPerPage,
    (safePage + 1) * remindersPerPage,
  );

  const totalNotePages = Math.ceil(dateNotes.length / notesPerPage) || 1;
  const safeNotePage = Math.min(notePage, totalNotePages - 1);
  const pagedNotes = dateNotes.slice(
    safeNotePage * notesPerPage,
    (safeNotePage + 1) * notesPerPage,
  );

  const shiftDay = (delta: number) => {
    const next = new Date(date);
    next.setDate(next.getDate() + delta);
    setDate(next);
    setReminderPage(0);
    setNotePage(0);
  };

  const weekday = WEEKDAYS[date.getDay()];
  const month = MONTHS[date.getMonth()];
  const dayNum = date.getDate();
  const year = date.getFullYear();

  const isToday = useMemo(() => {
    const t = new Date();
    return (
      t.getFullYear() === year &&
      t.getMonth() === date.getMonth() &&
      t.getDate() === dayNum
    );
  }, [date, year, dayNum]);

  // ═══════════════════════════════════════════════════════════
  // Planner page
  // ═══════════════════════════════════════════════════════════
  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "1fr 300px" }}
      gap={{ base: 6, lg: 8 }}
      alignItems="start"
    >
      {/* ── Left column: date hero + paper canvas ──────────── */}
      <Box minW={0}>
        {/* Date hero */}
        <Flex align="end" justify="space-between" gap={4} mb={6} px={1}>
          <Box>
            <Text
              fontSize="10px"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="0.22em"
              color="gold"
            >
              {weekday}
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
              {month} {dayNum}
            </Text>
            <Flex mt={2} align="center" gap={2}>
              <Text
                textStyle="display"
                fontSize="lg"
                fontStyle="italic"
                color="muted.contrast"
              >
                {year}
              </Text>
              {isToday && (
                <Flex
                  align="center"
                  gap={1.5}
                  rounded="full"
                  bg="secondary.solid"
                  px={2.5}
                  py={0.5}
                  fontSize="10px"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="0.15em"
                  color="muted.contrast"
                >
                  <Box h={1} w={1} rounded="full" bg="gold" />
                  Danas
                </Flex>
              )}
            </Flex>
          </Box>

          {/* Day navigation arrows */}
          <Flex gap={2} mb={1} shrink={0}>
            <Button
              onClick={() => shiftDay(-1)}
              aria-label="Prethodni dan"
              variant="ghost"
              h={10}
              w={10}
              minW={0}
              rounded="full"
              borderWidth="1px"
              borderColor="border/70"
              bg="card.solid/60"
              color="fg"
              backdropFilter="blur(8px)"
              _hover={{ bg: "card.solid", boxShadow: "sm" }}
              _active={{ transform: "scale(0.95)" }}
              transition="all 0.15s"
            >
              <LuChevronLeft />
            </Button>
            <Button
              onClick={() => shiftDay(1)}
              aria-label="Sljedeći dan"
              variant="ghost"
              h={10}
              w={10}
              minW={0}
              rounded="full"
              borderWidth="1px"
              borderColor="border/70"
              bg="card.solid/60"
              color="fg"
              backdropFilter="blur(8px)"
              _hover={{ bg: "card.solid", boxShadow: "sm" }}
              _active={{ transform: "scale(0.95)" }}
              transition="all 0.15s"
            >
              <LuChevronRight />
            </Button>
          </Flex>
        </Flex>

        {/* Paper canvas */}
        <Box
          rounded="2rem"
          bg="paper/75"
          borderWidth="1px"
          borderColor="white/70"
          backdropFilter="blur(12px)"
          p={{ base: 6, sm: 8 }}
          boxShadow="0 30px 70px -40px oklch(0.3 0.06 60 / 0.3)"
          minH="55vh"
          display="flex"
          flexDirection="column"
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
            Nastavni fokus
          </Box>

          <Flex direction="column" gap={0} flex={1}>
            {/* Add new note row */}
            <Flex
              align="start"
              gap={3}
              py={2.5}
              px={2}
              mx={-2}
              mb={2}
              borderBottomWidth="1px"
              borderColor="border/30"
              minW={0}
            >
              <Text
                as="span"
                flexShrink={0}
                color="muted.contrast/40"
                fontSize="sm"
                lineHeight="1.8"
                minW="18px"
                textAlign="right"
              >
                {dateNotes.length + 1}.
              </Text>
              <Textarea
                flex={1}
                placeholder="Dodaj bilješku…"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                autoresize
                fontSize="md"
                lineHeight="relaxed"
                color="fg"
                p={0}
                resize="none"
                border={0}
                _placeholder={{ color: "fg/30", fontStyle: "italic" }}
                _focus={{ outline: "none", boxShadow: "none" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && newNoteText.trim()) {
                    e.preventDefault();
                    addNote(newNoteText.trim());
                    setNewNoteText("");
                  }
                }}
              />
              <IconButton
                variant="ghost"
                size="2xs"
                aria-label="Dodaj bilješku"
                flexShrink={0}
                mt={1}
                onClick={() => {
                  if (newNoteText.trim()) {
                    addNote(newNoteText.trim());
                    setNewNoteText("");
                  }
                }}
              >
                <LuPlus />
              </IconButton>
            </Flex>

            {dateNotes.length === 0 && (
              <Text fontSize="md" color="fg/30" py={3} fontStyle="italic">
                Što danas predaješ? Dodaj svoju prvu bilješku iznad…
              </Text>
            )}

            {pagedNotes.map((n, i) => (
              <Flex
                key={n.id}
                align="start"
                gap={3}
                py={2.5}
                px={2}
                mx={-2}
                borderBottomWidth="1px"
                borderColor="border/20"
                minW={0}
                overflow="hidden"
                rounded="lg"
                _hover={{ bg: "secondary.solid/20" }}
                role="group"
              >
                <Text
                  as="span"
                  flexShrink={0}
                  color="primary.solid"
                  fontSize="sm"
                  lineHeight="1.8"
                  minW="18px"
                  textAlign="right"
                >
                  {safeNotePage * notesPerPage + i + 1}.
                </Text>

                {editingNoteId === n.id ? (
                  <>
                    <Textarea
                      flex={1}
                      value={editNoteText}
                      onChange={(e) => setEditNoteText(e.target.value)}
                      autoFocus
                      autoresize
                      fontSize="md"
                      lineHeight="relaxed"
                      color="fg"
                      p={0}
                      resize="none"
                      border={0}
                      _focus={{ outline: "none", boxShadow: "none" }}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          !e.shiftKey &&
                          editNoteText.trim()
                        ) {
                          e.preventDefault();
                          updateNote(n.id, editNoteText.trim());
                          setEditingNoteId(null);
                        }
                        if (e.key === "Escape") setEditingNoteId(null);
                      }}
                    />
                    <Flex gap={1} flexShrink={0}>
                      <IconButton
                        variant="ghost"
                        size="2xs"
                        aria-label="Spremi"
                        onClick={() => {
                          if (editNoteText.trim())
                            updateNote(n.id, editNoteText.trim());
                          setEditingNoteId(null);
                        }}
                      >
                        <LuCheck />
                      </IconButton>
                      <IconButton
                        variant="ghost"
                        size="2xs"
                        aria-label="Odustani"
                        onClick={() => setEditingNoteId(null)}
                      >
                        <LuX />
                      </IconButton>
                    </Flex>
                  </>
                ) : (
                  <>
                    <Text
                      flex={1}
                      minW={0}
                      fontSize="md"
                      lineHeight="relaxed"
                      color={n.done ? "fg/35" : "fg/85"}
                      wordBreak="break-word"
                      textDecoration={n.done ? "line-through" : "none"}
                      transition="color 0.2s, text-decoration 0.2s"
                    >
                      {n.text}
                    </Text>
                    <Flex
                      gap={1}
                      flexShrink={0}
                      _groupHover={{ opacity: 1 }}
                      transition="opacity 0.15s"
                    >
                      <IconButton
                        variant="ghost"
                        size="2xs"
                        aria-label={
                          n.done ? "Označi nedovršenim" : "Označi dovršenim"
                        }
                        color={n.done ? "green.500" : undefined}
                        onClick={() => toggleNote(n.id, !!n.done)}
                      >
                        <LuCircleCheck />
                      </IconButton>
                      <IconButton
                        variant="ghost"
                        size="2xs"
                        aria-label="Uredi"
                        onClick={() => {
                          setEditingNoteId(n.id);
                          setEditNoteText(n.text);
                        }}
                      >
                        <LuPencilLine />
                      </IconButton>
                      <IconButton
                        variant="ghost"
                        size="2xs"
                        aria-label="Obriši"
                        onClick={() => deleteNote(n.id)}
                      >
                        <LuTrash2 />
                      </IconButton>
                    </Flex>
                  </>
                )}
              </Flex>
            ))}
          </Flex>

          {/* Notes pagination — pinned to canvas bottom */}
          {totalNotePages > 1 && (
            <Flex align="center" justify="space-between" pt={2} pb={1}>
              <IconButton
                variant="ghost"
                size="2xs"
                aria-label="Prethodna stranica"
                disabled={safeNotePage === 0}
                onClick={() => setNotePage((p) => Math.max(0, p - 1))}
              >
                <LuChevronLeft />
              </IconButton>
              <Text fontSize="10px" color="muted.contrast/70">
                {safeNotePage + 1} / {totalNotePages}
              </Text>
              <IconButton
                variant="ghost"
                size="2xs"
                aria-label="Sljedeća stranica"
                disabled={safeNotePage >= totalNotePages - 1}
                onClick={() =>
                  setNotePage((p) => Math.min(totalNotePages - 1, p + 1))
                }
              >
                <LuChevronRight />
              </IconButton>
            </Flex>
          )}
        </Box>
      </Box>

      {/* ── Right rail: calendar + events ──────────────────── */}
      <Box
        as="aside"
        position={{ lg: "sticky" }}
        top={{ lg: 6 }}
        mt={{ base: 6, lg: 0 }}
        display="flex"
        flexDirection="column"
        gap={4}
      >
        {/* Calendar card */}
        <Box
          rounded="1.5rem"
          bg="paper/70"
          borderWidth="1px"
          borderColor="white/70"
          backdropFilter="blur(12px)"
          p={3}
          boxShadow="0 20px 50px -30px oklch(0.3 0.06 60 / 0.25)"
        >
          <Calendar
            selected={date}
            month={date}
            onSelect={(d) => {
              const nd = new Date(d);
              nd.setHours(0, 0, 0, 0);
              setDate(nd);
              setReminderPage(0);
              setNotePage(0);
            }}
            eventDates={eventDates}
          />
        </Box>

        {/* Events card */}
        <Box
          rounded="1.5rem"
          bg="paper/70"
          borderWidth="1px"
          borderColor="white/70"
          backdropFilter="blur(12px)"
          p={5}
          boxShadow="0 20px 50px -30px oklch(0.3 0.06 60 / 0.25)"
        >
          <Flex align="center" justify="space-between" mb={3}>
            <Box>
              <Text
                fontSize="10px"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="0.18em"
                color="gold"
              >
                Važno
              </Text>
              <Text
                textStyle="display"
                fontSize="md"
                fontWeight="semibold"
                color="fg"
                mt={0.5}
              >
                Ispiti i podsjetnici
              </Text>
            </Box>
            <Box
              h={2}
              w={2}
              rounded="full"
              bg="destructive.solid"
              aria-hidden
            />
          </Flex>

          {/* ── Reminder list ── */}
          <Flex direction="column" gap={1}>
            {dateReminders.length === 0 && (
              <Text fontSize="xs" color="muted.contrast/60" py={2}>
                Nema podsjetnika za ovaj dan.
              </Text>
            )}

            {pagedReminders.map((r) => (
              <Flex
                key={r.id}
                align={editingId === r.id ? "start" : "center"}
                gap={2}
                py={1.5}
                px={1}
                rounded="lg"
                minW={0}
                overflow="hidden"
                _hover={{ bg: "secondary.solid/30" }}
                role="group"
              >
                <Text
                  as="span"
                  flexShrink={0}
                  color="primary.solid"
                  fontSize="sm"
                  lineHeight="1.5"
                >
                  •
                </Text>

                {editingId === r.id ? (
                  <>
                    <Textarea
                      flex={1}
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      autoFocus
                      autoresize
                      fontSize="sm"
                      color="fg"
                      p={0}
                      resize="none"
                      border={0}
                      _focus={{ outline: "none", boxShadow: "none" }}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          !e.shiftKey &&
                          editText.trim()
                        ) {
                          e.preventDefault();
                          updateReminder(r.id, editText.trim());
                          setEditingId(null);
                        }
                        if (e.key === "Escape") setEditingId(null);
                      }}
                    />
                    <IconButton
                      variant="ghost"
                      size="2xs"
                      aria-label="Spremi"
                      onClick={() => {
                        if (editText.trim())
                          updateReminder(r.id, editText.trim());
                        setEditingId(null);
                      }}
                    >
                      <LuCheck />
                    </IconButton>
                    <IconButton
                      variant="ghost"
                      size="2xs"
                      aria-label="Odustani"
                      onClick={() => setEditingId(null)}
                    >
                      <LuX />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Text
                      flex={1}
                      minW={0}
                      fontSize="sm"
                      color="fg"
                      wordBreak="break-word"
                      maxH="4.5em"
                      overflowY="auto"
                      css={{ scrollbarWidth: "thin" }}
                    >
                      {r.text}
                    </Text>
                    <IconButton
                      variant="ghost"
                      size="2xs"
                      aria-label="Uredi"
                      _groupHover={{ opacity: 1 }}
                      transition="opacity 0.15s"
                      onClick={() => {
                        setEditingId(r.id);
                        setEditText(r.text);
                      }}
                    >
                      <LuPencilLine />
                    </IconButton>
                    <IconButton
                      variant="ghost"
                      size="2xs"
                      aria-label="Obriši"
                      _groupHover={{ opacity: 1 }}
                      transition="opacity 0.15s"
                      onClick={() => deleteReminder(r.id)}
                    >
                      <LuTrash2 />
                    </IconButton>
                  </>
                )}
              </Flex>
            ))}

            {/* ── Pagination ── */}
            {totalReminderPages > 1 && (
              <Flex align="center" justify="space-between" pt={2} pb={1}>
                <IconButton
                  variant="ghost"
                  size="2xs"
                  aria-label="Prethodna stranica"
                  disabled={safePage === 0}
                  onClick={() => setReminderPage((p) => Math.max(0, p - 1))}
                >
                  <LuChevronLeft />
                </IconButton>
                <Text fontSize="10px" color="muted.contrast/70">
                  {safePage + 1} / {totalReminderPages}
                </Text>
                <IconButton
                  variant="ghost"
                  size="2xs"
                  aria-label="Sljedeća stranica"
                  disabled={safePage >= totalReminderPages - 1}
                  onClick={() =>
                    setReminderPage((p) =>
                      Math.min(totalReminderPages - 1, p + 1),
                    )
                  }
                >
                  <LuChevronRight />
                </IconButton>
              </Flex>
            )}

            {/* ── Add new reminder ── */}
            <Flex align="center" gap={2} py={1.5} px={1} minW={0}>
              <Text
                as="span"
                flexShrink={0}
                color="muted.contrast/40"
                fontSize="sm"
                lineHeight="1.5"
              >
                •
              </Text>
              <Input
                flex={1}
                placeholder="Dodaj podsjetnik…"
                value={newReminderText}
                onChange={(e) => setNewReminderText(e.target.value)}
                size="sm"
                fontSize="sm"
                color="fg"
                variant="flushed"
                _placeholder={{
                  color: "muted.contrast/50",
                  fontStyle: "italic",
                }}
                _focus={{
                  boxShadow: "none",
                  borderColor: "primary.solid/40",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newReminderText.trim()) {
                    addReminder(newReminderText.trim());
                    setNewReminderText("");
                  }
                }}
              />
              <IconButton
                variant="ghost"
                size="2xs"
                aria-label="Dodaj podsjetnik"
                onClick={() => {
                  if (newReminderText.trim()) {
                    addReminder(newReminderText.trim());
                    setNewReminderText("");
                  }
                }}
              >
                <LuPlus />
              </IconButton>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Grid>
  );
}
