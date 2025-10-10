'use client';

import { useEffect, useId, useState } from 'react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/features/search/calendar/calendar';
import { Card, CardContent, CardHeader } from '@/components/features/search/calendar/card';
import { Input } from '@/components/features/search/calendar/input';
import { Label } from '@/components/features/search/calendar/label';
import { DateRange } from 'react-day-picker';
import { CalendarRange } from '@/types/filter';
import tw from '@/utils/tw';

interface Props {
  id?: string;
  cardStyle?: string;
  onChangeValue?: React.Dispatch<React.SetStateAction<CalendarRange>>;
}

const CalendarWithDateInputRange = ({ id, cardStyle, onChangeValue }: Props) => {
  const startID = useId();
  const endID = useId();
  const today = new Date();
  const [showMonth, setShowMonth] = useState(today);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(today);
  const [inputStartValue, setInputStartValue] = useState('');
  const [inputEndValue, setInputEndValue] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
    // from: new Date(2025, 8, 12), // MM : 0-based
    // to: today,
  });

  useEffect(() => {
    onChangeValue?.({
      start: formmatter(dateRange?.from),
      end: formmatter(dateRange?.to),
    });
  }, [dateRange, onChangeValue]);

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

  const formmatter = (date: Date | undefined) => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

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

  return (
    <div>
      <Card className={tw('gap-5 py-5 w-full rounded-modal sm:flex sm:flex-row', cardStyle)}>
        <CardHeader className="sm:hidden w-full flex flex-col sm:flex-row justify-between gap-2 border-b px-4">
          <div className="flex flex-row sm:flex-col gap-2 justify-center">
            <Label id={id} htmlFor={startID} className="text-sm sm:text-lg">
              시작일
            </Label>
            <div className="relative">
              <Input
                id={startID}
                type="date"
                value={inputStartValue}
                onChange={handleInputStartChange}
                className="text-sm sm:text-[16px] peer appearance-none pl-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                aria-label="시작일 선택"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                <CalendarIcon size={16} aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="flex flex-row sm:flex-col gap-2">
            <Label htmlFor={endID} className="text-sm sm:text-lg">
              종료일
            </Label>
            <div className="relative">
              <Input
                id={endID}
                type="date"
                value={inputEndValue}
                onChange={handleInputEndChange}
                className="text-sm sm:text-[16px] peer appearance-none pl-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                aria-label="종료일 선택"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                <CalendarIcon size={16} aria-hidden="true" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 w-full sm:w-[70%]">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleDayPickerSelect}
            month={showMonth}
            onMonthChange={setShowMonth}
            disabled={{
              after: today,
            }}
            className="w-full bg-transparent p-0 [--cell-size:12%] sm:[--cell-size:--spacing(7)]"
          />
        </CardContent>
        <CardHeader className="hidden sm:flex w-full flex-col gap-4 ">
          <div className="flex flex-col gap-2 justify-center">
            <Label id={id} htmlFor={startID} className="text-[16px]">
              시작일
            </Label>
            <div className="relative">
              <Input
                id={startID}
                type="date"
                value={inputStartValue}
                onChange={handleInputStartChange}
                className="text-[16px] peer appearance-none pl-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                aria-label="시작일 선택"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                <CalendarIcon size={16} aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={endID} className="text-[16px]">
              종료일
            </Label>
            <div className="relative">
              <Input
                id={endID}
                type="date"
                value={inputEndValue}
                onChange={handleInputEndChange}
                className="text-sm sm:text-[16px] peer appearance-none pl-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                aria-label="종료일 선택"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                <CalendarIcon size={16} aria-hidden="true" />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default CalendarWithDateInputRange;
