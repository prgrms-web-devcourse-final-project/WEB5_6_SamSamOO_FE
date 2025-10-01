'use client';

import { useEffect, useId, useState } from 'react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/features/search/calendar/calendar';
import { Card, CardContent, CardHeader } from '@/components/features/search/calendar/card';
import { Input } from '@/components/features/search/calendar/input';
import { Label } from '@/components/features/search/calendar/label';
import { DateRange } from 'react-day-picker';

const CalendarWithDateInputRange = () => {
  const startID = useId();
  const endID = useId();
  const today = new Date();
  const [showMonth, setShowMonth] = useState(today);
  const [startDate, setStartDate] = useState<Date | undefined>(today);
  const [endDate, setEndDate] = useState<Date | undefined>(today);
  const [inputStartValue, setInputStartValue] = useState('');
  const [inputEndValue, setInputEndValue] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 8, 12), // MM : 0-based
    to: today,
  });

  const handleDayPickerSelect = (dateRange: DateRange | undefined) => {
    if (!dateRange || !dateRange.from || !dateRange.to) {
      setInputStartValue('');
      setInputEndValue('');
    } else {
      setStartDate(dateRange.from);
      setEndDate(dateRange.to);
      setInputStartValue(format(dateRange.from, 'yyyy-MM-dd'));
      setInputEndValue(format(dateRange.to, 'yyyy-MM-dd'));
      setDateRange(dateRange);
    }
  };

  useEffect(() => {
    console.log(dateRange);
  }, [dateRange]);

  const handleInputStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputStartValue(value);
    const parsedDate = value ? new Date(value) : undefined;

    setStartDate(parsedDate);
    if (parsedDate) {
      setShowMonth(parsedDate);
    }

    if (parsedDate && endDate) {
      const [from, to] = parsedDate <= endDate ? [parsedDate, endDate] : [endDate, parsedDate];
      setDateRange({ from, to });
    } else {
      setDateRange(undefined);
    }
  };

  const handleInputEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputEndValue(value);
    const parsedDate = value ? new Date(value) : undefined;

    setEndDate(parsedDate);
    if (parsedDate) {
      setShowMonth(parsedDate);
    }
    if (parsedDate && startDate) {
      const [from, to] =
        parsedDate >= startDate ? [startDate, parsedDate] : [parsedDate, startDate];
      setDateRange({ from, to });
    } else {
      setDateRange(undefined);
    }
  };

  useEffect(() => {
    setInputStartValue(format(today, 'yyyy-MM-dd'));
    setInputEndValue(format(today, 'yyyy-MM-dd'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Card className="gap-5 py-5 w-fit">
        <CardHeader className="flex items-center flex-col gap-2 border-b px-3 !pb-3">
          <div>
            <Label htmlFor={startID} className="shrink-0 text-xs">
              Enter Start date
            </Label>
            <div className="relative grow">
              <Input
                id={startID}
                type="date"
                value={inputStartValue}
                onChange={handleInputStartChange}
                className="peer appearance-none pl-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                aria-label="Select date"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                <CalendarIcon size={16} aria-hidden="true" />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor={endID} className="shrink-0 text-xs">
              Enter End date
            </Label>
            <div className="relative grow">
              <Input
                id={endID}
                type="date"
                value={inputEndValue}
                onChange={handleInputEndChange}
                className="peer appearance-none pl-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                aria-label="Select date"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                <CalendarIcon size={16} aria-hidden="true" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleDayPickerSelect}
            month={showMonth}
            onMonthChange={setShowMonth}
            disabled={{
              after: today,
            }}
            className="bg-transparent p-0"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarWithDateInputRange;
