import { useState } from 'react';

import FilterDetailDown from '@/assets/icons/filterDetailDown.svg';
import useClosePopup from '@/hooks/useClosePopup';
import { CalendarRange, PrecedentSearchFilter } from '@/types/filter';

import CalendarWithDateInputRange from './CalendarWithDateInputRange';

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  setPrecedentSearchFilter: React.Dispatch<React.SetStateAction<PrecedentSearchFilter>>;
}

function PrecedentSearchFilterModal({
  isOpen,
  onClose = () => {},
  setPrecedentSearchFilter,
}: Props) {
  const [openPrecedentCalender, setOpenPrecedentCalender] = useState<boolean>(false);
  const [sentencingRange, setSentencingRange] = useState<CalendarRange>({
    start: null,
    end: null,
  });
  useClosePopup({ onClose, isOpen });
  return (
    <div
      className="absolute inset-0 z-10 bg-black/40 backdrop-blur-sm w-screen h-screen flex items-center justify-center"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section className="p-10 bg-white rounded-modal flex flex-col gap-6 text-lg justify-center dark:bg-background-black3 dark:text-primary-white dark:shadow-modal-dark">
        <h1 className="text-3xl font-bold text-brand-primary dark:text-primary-white">
          판례 상세 검색
        </h1>
        <div className="relative flex gap-7 items-center mb-4">
          <label htmlFor="sentencing" className="min-w-fit">
            선고일자
          </label>
          <button
            id="sentencing"
            type="button"
            onClick={() => setOpenPrecedentCalender((prev) => !prev)}
            className="w-full min-w-[423px] py-2 px-6 flex gap-3 items-center justify-between rounded-full bg-background-white  outline-none border border-filter-outline1 text-primary-gray2 focus:shadow-filter-light-active dark:bg-primary-gray3 dark:text-primary-white dark:border-filter-outline2 data-[state=open]:shadow-filter-light-active dark:data-[state=open]:shadow-filter-dark-active'"
          >
            {sentencingRange.start === null || sentencingRange.end === null
              ? '기간을 선택해주세요'
              : `${sentencingRange.start} ~ ${sentencingRange.end}`}
            <FilterDetailDown className="dark:text-[#6E6E6E]" />
          </button>
          <div hidden={!openPrecedentCalender} className="absolute top-13 right-0 z-10">
            <CalendarWithDateInputRange onChangeValue={setSentencingRange} />
          </div>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <button
            type="button"
            className="px-11 py-3 bg-brand-primary text-primary-white font-bold rounded-full dark:bg-primary-white dark:text-primary-black"
            onClick={() => {
              setPrecedentSearchFilter({
                sentencingDateStart: sentencingRange.start ?? '',
                sentencingDateEnd: sentencingRange.end ?? '',
              });
              onClose();
            }}
          >
            검색
          </button>
          <button
            type="button"
            className="px-11 py-3 border border-brand-primary font-bold rounded-full dark:border-primary-white"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </section>
    </div>
  );
}
export default PrecedentSearchFilterModal;
