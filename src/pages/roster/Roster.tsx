import { useState, useCallback, useEffect } from "react";
import { Box, Button, Container, Flex, Input, Text } from "@chakra-ui/react";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useCollection } from "@/hooks/useCollection";
import { useFirestore } from "@/hooks/useFirestore";
import AppHeader from "@/components/layout/AppHeader";

// ═══════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  uid: string;
};

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
  const { user } = useAuthContext();
  const [teacherFirstName, setTeacherFirstName] = useState("");
  const year = new Date().getFullYear();

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

  const { data: roster = [], isLoading: rosterLoading } =
    useCollection<Student>("students");
  const { addDocument, deleteDocument, isAddingDocument, deletingDocumentId } =
    useFirestore("students");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
    <Box
      as="main"
      minH="100dvh"
      py={{ base: 6, sm: 10 }}
      px={{ base: 4, sm: 8 }}
    >
      <Container maxW="5xl" p={0}>
        <AppHeader teacherFirstName={teacherFirstName} year={year} />

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
                  Last Name
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
                  First Name
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
                Add
              </Button>
            </Flex>
          </Box>

          {/* Student list */}
          <Box mt={8}>
            {(() => {
              const sortedRoster = [...roster].sort((a, b) => {
                const last = a.lastName.localeCompare(b.lastName);
                return last !== 0
                  ? last
                  : a.firstName.localeCompare(b.firstName);
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
                  Loading students…
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
                      transition="background 0.15s"
                      _hover={{
                        bg: "secondary.solid/50",
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
                        onClick={() => removeStudent(student.id)}
                        aria-label={`Remove ${student.lastName} ${student.firstName}`}
                        className="delete-btn"
                        loading={deletingDocumentId === student.id}
                        disabled={deletingDocumentId !== null}
                        variant="ghost"
                        h={8}
                        w={8}
                        minW={0}
                        p={0}
                        rounded="lg"
                        opacity={deletingDocumentId === student.id ? 1 : 0}
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
