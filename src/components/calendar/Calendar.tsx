import { useMemo, useState, useEffect, useRef } from "react";
import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const WEEKDAY_LABELS = ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"];

interface CalendarProps {
  selected: Date;
  month: Date;
  onSelect: (date: Date) => void;
  eventDates: Date[];
  w?: string;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function Calendar({
  selected,
  month,
  onSelect,
  eventDates,
  ...rest
}: CalendarProps) {
  const [viewMonth, setViewMonth] = useState(
    new Date(month.getFullYear(), month.getMonth(), 1),
  );

  // Sync viewMonth only when the month prop actually changes from outside
  const prevMonthKey = useRef(`${month.getFullYear()}-${month.getMonth()}`);
  useEffect(() => {
    const key = `${month.getFullYear()}-${month.getMonth()}`;
    if (key !== prevMonthKey.current) {
      prevMonthKey.current = key;
      setViewMonth(new Date(month.getFullYear(), month.getMonth(), 1));
    }
  }, [month]);

  const days = useMemo(() => {
    const y = viewMonth.getFullYear();
    const m = viewMonth.getMonth();
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const cells: (Date | null)[] = [];

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) cells.push(null);
    // Actual days
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(y, m, d));

    return cells;
  }, [viewMonth]);

  const monthLabel = viewMonth.toLocaleDateString("hr-HR", {
    month: "long",
    year: "numeric",
  });

  const shiftMonth = (delta: number) => {
    setViewMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1),
    );
  };

  const today = new Date();

  return (
    <Box w="full" {...rest}>
      {/* Month navigation */}
      <Flex align="center" justify="space-between" mb={3} px={1}>
        <Text
          textStyle="display"
          fontSize="sm"
          fontWeight="semibold"
          color="fg"
        >
          {monthLabel}
        </Text>
        <Flex gap={0.5}>
          <Button
            size="xs"
            variant="ghost"
            rounded="full"
            onClick={() => shiftMonth(-1)}
            aria-label="Prethodni mjesec"
          >
            <LuChevronLeft />
          </Button>
          <Button
            size="xs"
            variant="ghost"
            rounded="full"
            onClick={() => shiftMonth(1)}
            aria-label="Sljedeći mjesec"
          >
            <LuChevronRight />
          </Button>
        </Flex>
      </Flex>

      {/* Weekday headers */}
      <Grid templateColumns="repeat(7, 1fr)" mb={1}>
        {WEEKDAY_LABELS.map((label) => (
          <Text
            key={label}
            fontSize="10px"
            fontWeight="bold"
            color="muted.contrast"
            textAlign="center"
            py={1}
          >
            {label}
          </Text>
        ))}
      </Grid>

      {/* Day cells */}
      <Grid templateColumns="repeat(7, 1fr)">
        {days.map((day, i) => {
          if (!day) {
            return <Box key={`empty-${i}`} aspectRatio={1} />;
          }

          const isSelected = sameDay(day, selected);
          const isToday = sameDay(day, today);
          const hasEvent = eventDates.some((d) => sameDay(d, day));

          return (
            <Box
              key={day.toISOString()}
              as="button"
              aria-label={day.toLocaleDateString("hr-HR", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
              onClick={() => onSelect(day)}
              aspectRatio={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              position="relative"
              rounded="full"
              fontSize="sm"
              fontWeight={isToday ? "bold" : "normal"}
              cursor="pointer"
              transition="all 0.15s"
              bg={isSelected ? "primary.solid" : "transparent"}
              color={
                isSelected ? "primary.contrast" : isToday ? "primary.fg" : "fg"
              }
              _hover={{
                bg: isSelected ? "primary.solid" : "secondary.solid",
              }}
            >
              {day.getDate()}
              {hasEvent && (
                <Box
                  position="absolute"
                  bottom="4px"
                  left="50%"
                  transform="translateX(-50%)"
                  w="5px"
                  h="5px"
                  rounded="full"
                  bg="oklch(0.62 0.22 25)"
                  pointerEvents="none"
                />
              )}
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
}
