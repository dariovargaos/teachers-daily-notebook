import { useMemo, useState, useCallback, useReducer, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Input,
  Text,
  Textarea,
  Container,
} from "@chakra-ui/react";
import {
  LuCheck,
  LuChevronLeft,
  LuChevronRight,
  LuPencilLine,
  LuPlus,
  LuTrash2,
  LuX,
} from "react-icons/lu";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useCollection } from "@/hooks/useCollection";
import { useFirestore } from "@/hooks/useFirestore";
import Calendar from "@/components/calendar/Calendar";
import AppHeader from "@/components/layout/AppHeader";

// ═══════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function dateKey(d: Date) {
  return `planner:${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function eventKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

type Reminder = {
  id: string;
  date: string;
  text: string;
  uid: string;
};

// ═══════════════════════════════════════════════════════════════
// PlannerPage — main component
// ═══════════════════════════════════════════════════════════════

export default function Home() {
  const { user } = useAuthContext();
  const [teacherFirstName, setTeacherFirstName] = useState("");

  // Fetch the teacher's first name from Firestore
  useEffect(() => {
    if (!user) return;
    const fetchName = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        setTeacherFirstName(data.firstName ?? "");
      }
    };
    fetchName();
  }, [user]);

  const [date, setDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  // localStorage is the source of truth — forceUpdate triggers re-reads
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);
  const notes: string =
    typeof window !== "undefined"
      ? (window.localStorage.getItem(dateKey(date)) ?? "")
      : "";

  const handleNotesChange = (value: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(dateKey(date), value);
    }
    forceUpdate(); // trigger re-render so notes reads the new value
  };

  // ── Reminders — read via useCollection, write via useFirestore ──
  const { data: allReminders = [] } = useCollection<Reminder>("reminders");

  const dateReminders = useMemo(
    () => allReminders.filter((r) => r.date === eventKey(date)),
    [allReminders, date],
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [newReminderText, setNewReminderText] = useState("");

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

  const shiftDay = (delta: number) => {
    const next = new Date(date);
    next.setDate(next.getDate() + delta);
    setDate(next);
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
    <Box
      as="main"
      minH="100dvh"
      py={{ base: 6, sm: 10 }}
      px={{ base: 4, sm: 8 }}
    >
      <Container maxW="5xl" p={0}>
        <AppHeader teacherFirstName={teacherFirstName} year={year} />

        {/* Two-column layout */}
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
                      Today
                    </Flex>
                  )}
                </Flex>
              </Box>

              {/* Day navigation arrows */}
              <Flex gap={2} mb={1} shrink={0}>
                <Button
                  onClick={() => shiftDay(-1)}
                  aria-label="Previous day"
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
                  aria-label="Next day"
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
            <Box position="relative">
              <Box
                rounded="2rem"
                bg="paper/75"
                borderWidth="1px"
                borderColor="white/70"
                backdropFilter="blur(12px)"
                p={{ base: 6, sm: 8 }}
                boxShadow="0 30px 70px -40px oklch(0.3 0.06 60 / 0.3)"
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
                  Teaching Focus
                </Box>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  placeholder="What are you teaching today? Lessons, reminders, ideas…"
                  autoresize
                  minH="48vh"
                  w="full"
                  resize="none"
                  border={0}
                  p={0}
                  fontSize="lg"
                  lineHeight="relaxed"
                  color="fg/85"
                  _placeholder={{ color: "fg/30" }}
                  _focus={{ outline: "none" }}
                />
              </Box>

              {/* Floating auto-save bar */}
              <Flex
                position="absolute"
                bottom="-20px"
                left="50%"
                transform="translateX(-50%)"
                w={{ base: "88%", sm: "70%" }}
                bg="primary.solid"
                color="primary.contrast"
                rounded="2xl"
                px={4}
                py={2.5}
                align="center"
                justify="space-between"
                boxShadow="0 20px 40px -15px oklch(0.2 0.05 50 / 0.5)"
                borderWidth="1px"
                borderColor="white/5"
              >
                <Flex
                  align="center"
                  gap={2}
                  fontSize="11px"
                  fontWeight="semibold"
                >
                  <Box h={1.5} w={1.5} rounded="full" bg="gold" />
                  Auto-saved
                </Flex>
                <Text fontSize="11px" opacity={0.6} fontWeight="medium">
                  Day{" "}
                  {Math.ceil(
                    (date.getTime() - new Date(year, 0, 1).getTime()) /
                      86400000,
                  ) + 1}{" "}
                  · {year}
                </Text>
              </Flex>
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
                    Important
                  </Text>
                  <Text
                    textStyle="display"
                    fontSize="md"
                    fontWeight="semibold"
                    color="fg"
                    mt={0.5}
                  >
                    Exams &amp; reminders
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
                    No reminders for this day.
                  </Text>
                )}

                {dateReminders.map((r) => (
                  <Flex
                    key={r.id}
                    align="center"
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
                        <Input
                          flex={1}
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          size="sm"
                          autoFocus
                          fontSize="sm"
                          color="fg"
                          variant="flushed"
                          _focus={{
                            boxShadow: "none",
                            borderColor: "primary.solid/40",
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && editText.trim()) {
                              updateReminder(r.id, editText.trim());
                              setEditingId(null);
                            }
                            if (e.key === "Escape") setEditingId(null);
                          }}
                        />
                        <IconButton
                          variant="ghost"
                          size="2xs"
                          aria-label="Save"
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
                          aria-label="Cancel"
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
                          lineClamp={3}
                          wordBreak="break-word"
                        >
                          {r.text}
                        </Text>
                        <IconButton
                          variant="ghost"
                          size="2xs"
                          aria-label="Edit"
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
                          aria-label="Delete"
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
                    placeholder="Add a reminder…"
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
                    aria-label="Add reminder"
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

              <Flex mt={3} align="center" justify="space-between">
                <Text fontSize="10px" color="muted.contrast">
                  Hover a reminder to edit or delete it.
                </Text>
              </Flex>
            </Box>
          </Box>
        </Grid>

        <Flex
          as="footer"
          mt={10}
          justify="center"
          fontSize="10px"
          textTransform="uppercase"
          letterSpacing="0.2em"
          color="muted.contrast/70"
        >
          <Text>Atelier · A quiet planner for modern teachers</Text>
        </Flex>
      </Container>
    </Box>
  );
}
