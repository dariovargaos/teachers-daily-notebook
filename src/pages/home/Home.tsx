import { useMemo, useState, useCallback, useReducer, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Text,
  Textarea,
  Container,
} from "@chakra-ui/react";
import {
  LuChevronLeft,
  LuChevronRight,
  LuNotebookPen,
  LuTrash2,
  LuPlus,
  LuLogOut,
} from "react-icons/lu";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useLogout } from "@/hooks/useLogout";
import Calendar from "@/components/calendar/Calendar";

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

const EVENTS_KEY = "planner:events";

function eventKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function loadEvents(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(EVENTS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveEvents(events: Record<string, string>) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  }
}

const ROSTER_KEY = "planner:roster";

type Student = {
  id: string;
  firstName: string;
  lastName: string;
};

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function loadRoster(): Student[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ROSTER_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveRoster(students: Student[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(ROSTER_KEY, JSON.stringify(students));
  }
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
// PlannerPage — main component
// ═══════════════════════════════════════════════════════════════

export default function Home() {
  const { logout, isPending } = useLogout();
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

  const [page, setPage] = useState<"roster" | "planner">("planner");
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

  const [roster, setRoster] = useState<Student[]>(() => loadRoster());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [events, setEvents] = useState<Record<string, string>>(() =>
    loadEvents(),
  );

  // Derived from events — no separate state or effect needed
  const eventDraft = events[eventKey(date)] ?? "";

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

  const addStudent = useCallback(() => {
    const f = firstName.trim();
    const l = lastName.trim();
    if (!f && !l) return;
    const updated = [
      ...roster,
      { id: generateId(), firstName: f, lastName: l },
    ];
    setRoster(updated);
    saveRoster(updated);
    setFirstName("");
    setLastName("");
  }, [firstName, lastName, roster]);

  const removeStudent = useCallback(
    (id: string) => {
      const updated = roster.filter((s) => s.id !== id);
      setRoster(updated);
      saveRoster(updated);
    },
    [roster],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addStudent();
    }
  };

  const handleEventChange = (value: string) => {
    const key = eventKey(date);
    const next = { ...events };
    if (value.trim()) {
      next[key] = value;
    } else {
      delete next[key];
    }
    setEvents(next);
    saveEvents(next);
  };

  const clearEvent = () => {
    handleEventChange("");
  };

  const eventDates = useMemo(
    () =>
      Object.keys(events).map((k) => {
        const [y, m, d] = k.split("-").map(Number);
        return new Date(y, m - 1, d);
      }),
    [events],
  );

  // ═══════════════════════════════════════════════════════════
  // Shared header (logo + nav)
  // ═══════════════════════════════════════════════════════════
  const Header = (
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
          onClick={() => setPage("planner")}
          variant="plain"
          rounded="full"
          px={4}
          py={1.5}
          fontSize="xs"
          fontWeight="semibold"
          bg={page === "planner" ? "card.solid" : "transparent"}
          color={page === "planner" ? "fg" : "muted.contrast/70"}
          boxShadow={page === "planner" ? "sm" : undefined}
          _hover={{ color: "fg" }}
          transition="all 0.15s"
        >
          Planner
        </Button>
        <Button
          onClick={() => setPage("roster")}
          variant="plain"
          rounded="full"
          px={4}
          py={1.5}
          fontSize="xs"
          fontWeight="semibold"
          bg={page === "roster" ? "card.solid" : "transparent"}
          color={page === "roster" ? "fg" : "muted.contrast/70"}
          boxShadow={page === "roster" ? "sm" : undefined}
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
          _hover={{
            color: "fg",
            borderColor: "fg/30",
          }}
          _active={{ transform: "scale(0.95)" }}
          transition="all 0.15s"
        >
          Log out
          <LuLogOut />
        </Button>
      </Flex>
    </Flex>
  );

  // ═══════════════════════════════════════════════════════════
  // Shared footer
  // ═══════════════════════════════════════════════════════════
  const Footer = (
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
  );

  // ═══════════════════════════════════════════════════════════
  // Roster page
  // ═══════════════════════════════════════════════════════════
  if (page === "roster") {
    return (
      <Box
        as="main"
        minH="100dvh"
        py={{ base: 6, sm: 10 }}
        px={{ base: 4, sm: 8 }}
      >
        <Container maxW="5xl" p={0}>
          {Header}

          <Shell>
            {/* Title row */}
            <Flex
              align="end"
              justify="space-between"
              gap={4}
              pb={6}
              borderBottomWidth="1px"
              borderColor="border"
            >
              <Box>
                <Text
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="0.2em"
                  color="muted.contrast"
                >
                  Class Roster
                </Text>
                <Text
                  textStyle="display"
                  mt={2}
                  fontSize={{ base: "4xl", sm: "5xl" }}
                  fontWeight="semibold"
                  letterSpacing="tight"
                  color="fg"
                >
                  My students
                </Text>
                <Text mt={2} fontSize="sm" color="muted.contrast">
                  {roster.length} {roster.length === 1 ? "student" : "students"}{" "}
                  enrolled
                </Text>
              </Box>
            </Flex>

            {/* Add student row */}
            <Box mt={6}>
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
                    First Name
                  </Text>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. Emma"
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
                    Last Name
                  </Text>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. Johnson"
                    {...sharedInputProps}
                  />
                </Box>
                <Button
                  onClick={addStudent}
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
                  Add
                </Button>
              </Flex>
            </Box>

            {/* Student list */}
            <Box mt={8}>
              {roster.length === 0 ? (
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
                  No students yet. Add your first student above.
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
                  overflow="hidden"
                >
                  {roster.map((student, index) => (
                    <Box
                      key={student.id}
                      as="li"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      gap={3}
                      px={5}
                      py={3.5}
                      bg="card.solid"
                      borderBottomWidth={index < roster.length - 1 ? "1px" : 0}
                      borderColor="border"
                      transition="background 0.15s"
                      _hover={{
                        bg: "secondary.solid/40",
                        "& .delete-btn": { opacity: 1 },
                      }}
                    >
                      <Flex align="center" gap={3} minW={0}>
                        <Flex
                          h={8}
                          w={8}
                          shrink={0}
                          align="center"
                          justify="center"
                          rounded="full"
                          bg="primary.solid/10"
                          color="primary.fg"
                          fontSize="xs"
                          fontWeight="semibold"
                        >
                          {(student.firstName[0] ?? "?").toUpperCase()}
                          {(student.lastName[0] ?? "").toUpperCase()}
                        </Flex>
                        <Box minW={0}>
                          <Text
                            truncate
                            fontSize="sm"
                            fontWeight="medium"
                            color="fg"
                          >
                            {student.firstName} {student.lastName}
                          </Text>
                          <Text fontSize="11px" color="muted.contrast">
                            Student #{index + 1}
                          </Text>
                        </Box>
                      </Flex>
                      <Button
                        onClick={() => removeStudent(student.id)}
                        aria-label={`Remove ${student.firstName} ${student.lastName}`}
                        className="delete-btn"
                        variant="ghost"
                        h={8}
                        w={8}
                        minW={0}
                        p={0}
                        rounded="lg"
                        opacity={0}
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
              )}
            </Box>
          </Shell>

          {Footer}
        </Container>
      </Box>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // Planner page (default)
  // ═══════════════════════════════════════════════════════════
  return (
    <Box
      as="main"
      minH="100dvh"
      py={{ base: 6, sm: 10 }}
      px={{ base: 4, sm: 8 }}
    >
      <Container maxW="5xl" p={0}>
        {Header}

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

              <Textarea
                value={eventDraft}
                onChange={(e) => handleEventChange(e.target.value)}
                placeholder="e.g. Class 7B — Math exam, Chapter 4"
                autoresize
                variant="outline"
                rounded="xl"
                borderColor="border/70"
                bg="card.solid/60"
                p={3}
                fontSize="sm"
                lineHeight="6"
                color="fg"
                minH="130px"
                w="full"
                resize="none"
                _placeholder={{ color: "muted.contrast/60" }}
                _focusVisible={{
                  outline: "none",
                  borderColor: "primary.solid/40",
                  boxShadow: "0 0 0 2px {colors.primary.solid/20}",
                }}
              />

              <Flex mt={2} align="center" justify="space-between">
                <Text fontSize="10px" color="muted.contrast">
                  Days with notes show a red dot.
                </Text>
                {eventDraft.trim() && (
                  <Button
                    onClick={clearEvent}
                    variant="plain"
                    fontSize="10px"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    color="destructive.fg"
                    h="auto"
                    p={0}
                    _hover={{ textDecoration: "underline" }}
                  >
                    Clear
                  </Button>
                )}
              </Flex>
            </Box>
          </Box>
        </Grid>

        {Footer}
      </Container>
    </Box>
  );
}
