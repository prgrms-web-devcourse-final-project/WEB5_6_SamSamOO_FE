import { useEffect, useState } from 'react';
import FilterDetailDown from '@/assets/icons/filterDetailDown.svg';

import { groupTestData, lawFieldData } from './_testData/mockData';

import SelectMenu from '@/components/ui/SelectMenu';
import useClosePopup from '@/hooks/useClosePopup';
import { CalendarRange, LawSearchFilter } from '@/types/filter';

import CalendarWithDateInputRange from './CalendarWithDateInputRange';

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  setLawSearchFilter: React.Dispatch<React.SetStateAction<LawSearchFilter>>;
}

function LawSearchFilterModal({ isOpen = false, onClose = () => {}, setLawSearchFilter }: Props) {
  const [lawField, setLawField] = useState<string>('');
  const [authority, setAuthority] = useState<string>('');
  const [ministry, setMinistry] = useState<string>('');
  const [openPromulgationCalender, setOpenPromulgationCalender] = useState<boolean>(false);
  const [openEnforcementCalender, setOpenEnforcementCalender] = useState<boolean>(false);
  const [promulgationRange, setPromulgationRange] = useState<CalendarRange>({
    start: null,
    end: null,
  });
  const [enforcementRange, setEnforcementRange] = useState<CalendarRange>({
    start: null,
    end: null,
  });

  const [ministryList, setMinistryList] = useState<{ label: string }[]>([]);

  useEffect(() => {
    const ministryList = groupTestData.find((item) => item.label === authority);
    setMinistryList(ministryList?.contents ?? []);
    setMinistry('');
  }, [authority]);

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
          법령 상세 검색
        </h1>
        <div className="flex gap-7 items-center">
          <label className="min-w-fit" htmlFor="lawField">
            법령분야
          </label>
          <SelectMenu
            field="lawField"
            value={lawField}
            itemList={lawFieldData}
            triggerStyle="w-[165px]"
            onValueChange={(value) => {
              setLawField(value);
            }}
          />
        </div>
        <div className="flex gap-7 items-center">
          <label className="min-w-fit" htmlFor="authority">
            소관부처
          </label>
          <SelectMenu
            field="authority"
            value={authority}
            itemList={lawFieldData}
            triggerStyle="w-[165px]"
            onValueChange={(value) => {
              setAuthority(value);
            }}
          />
          <SelectMenu
            field="ministry"
            key={authority}
            value={ministry}
            itemList={ministryList}
            triggerStyle="w-[230px]"
            onValueChange={(value) => {
              setMinistry(value);
            }}
            disabled={!authority}
            placeholder={authority ? `${authority} 선택` : '먼저 소관기관 선택'}
          />
        </div>

        <div className="relative flex gap-7 items-center">
          <label htmlFor="promulgation" className="min-w-fit">
            공포일자
          </label>
          <button
            type="button"
            onClick={() => setOpenPromulgationCalender((prev) => !prev)}
            className="w-full py-2 px-6 flex gap-3 items-center justify-between rounded-full bg-background-white  outline-none border border-filter-outline1 text-primary-gray2 focus:shadow-filter-light-active dark:bg-primary-gray3 dark:text-primary-white dark:border-filter-outline2 data-[state=open]:shadow-filter-light-active dark:data-[state=open]:shadow-filter-dark-active'"
          >
            {promulgationRange.start === null || promulgationRange.end === null
              ? '기간을 선택해주세요'
              : `${promulgationRange.start} ~ ${promulgationRange.end}`}
            <FilterDetailDown className="dark:text-[#6E6E6E]" />
          </button>
          <div hidden={!openPromulgationCalender} className="absolute top-13 right-0 z-10">
            <CalendarWithDateInputRange id="promulgation" onChangeValue={setPromulgationRange} />
          </div>
        </div>

        <div className="relative flex gap-7 items-center">
          <label htmlFor="enforcement" className="min-w-fit">
            시행일자
          </label>
          <button
            type="button"
            onClick={() => setOpenEnforcementCalender((prev) => !prev)}
            className="w-full py-2 px-6 flex gap-3 items-center justify-between rounded-full bg-background-white  outline-none border border-filter-outline1 text-primary-gray2 focus:shadow-filter-light-active dark:bg-primary-gray3 dark:text-primary-white dark:border-filter-outline2 data-[state=open]:shadow-filter-light-active dark:data-[state=open]:shadow-filter-dark-active'"
          >
            {enforcementRange.start === null || enforcementRange.end === null
              ? '기간을 선택해주세요'
              : `${enforcementRange.start} ~ ${enforcementRange.end}`}
            <FilterDetailDown className="dark:text-[#6E6E6E]" />
          </button>
          <div hidden={!openEnforcementCalender} className="absolute top-13 right-0 z-10">
            <CalendarWithDateInputRange id="promulgation" onChangeValue={setEnforcementRange} />
          </div>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <button
            type="button"
            className="px-11 py-3 bg-brand-primary text-primary-white font-bold rounded-full dark:bg-primary-white dark:text-primary-black"
            onClick={() => {
              setLawSearchFilter({
                lawField,
                ministry,
                promulgationDateStart: promulgationRange.start ?? '',
                promulgationDateEnd: promulgationRange.end ?? '',
                enforcementDateStart: enforcementRange.start ?? '',
                enforcementDateEnd: enforcementRange.end ?? '',
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
export default LawSearchFilterModal;
