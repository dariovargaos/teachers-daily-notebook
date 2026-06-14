import { useMemo, useState } from "react";
import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

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

  // Sync viewMonth when prop changes
  const propKey = `${month.getFullYear()}-${month.getMonth()}`;
  const viewKey = `${viewMonth.getFullYear()}-${viewMonth.getMonth()}`;
  if (propKey !== viewKey) {
    // Sync on next render
    queueMicrotask(() =>
      setViewMonth(new Date(month.getFullYear(), month.getMonth(), 1)),
    );
  }

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

  const monthLabel = viewMonth.toLocaleDateString("en-US", {
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
            aria-label="Previous month"
          >
            <LuChevronLeft />
          </Button>
          <Button
            size="xs"
            variant="ghost"
            rounded="full"
            onClick={() => shiftMonth(1)}
            aria-label="Next month"
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
              aria-label={day.toLocaleDateString("en-US", {
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
