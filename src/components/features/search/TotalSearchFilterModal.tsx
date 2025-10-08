import { useEffect, useRef, useState } from 'react';
import { ministryData, authorityData, lawFieldData } from './filterItemList';
import FilterDetailDown from '@/assets/icons/filterDetailDown.svg';
import SelectMenu from '@/components/ui/SelectMenu';
import useClosePopup from '@/hooks/useClosePopup';
import { CalendarRange, TotalSearchFilter } from '@/types/filter';
import CalendarWithDateInputRange from './CalendarWithDateInputRange';

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  setTotalSearchFilter: React.Dispatch<React.SetStateAction<TotalSearchFilter>>;
}

function TotalSearchFilterModal({ isOpen, onClose = () => {}, setTotalSearchFilter }: Props) {
  const [lawField, setLawField] = useState<string>('');
  const [authority, setAuthority] = useState<string>('');
  const [ministry, setMinistry] = useState<string>('');
  const [openCalendar, setOpenCalendar] = useState<
    'promulgation' | 'enforcement' | 'sentencing' | null
  >(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const promulgationRef = useRef<HTMLDivElement>(null);
  const enforcementRef = useRef<HTMLDivElement>(null);
  const precedentRef = useRef<HTMLDivElement>(null);
  const [sentencingRange, setSentencingRange] = useState<CalendarRange>({
    start: null,
    end: null,
  });
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
    const ministryList = ministryData.find((item) => item.label === authority);
    setMinistryList(ministryList?.contents ?? []);
    setMinistry('');
  }, [authority]);

  useClosePopup({ onClose, isOpen });

  useClosePopup({
    isOpen: !!openCalendar,
    onClose: () => setOpenCalendar(null),
    ignoreSelectors: ['[data-radix-popper-content-wrapper]'],
  });

  return (
    <div
      className="absolute inset-0 z-10 bg-black/40 backdrop-blur-sm w-screen h-screen flex items-center justify-center"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        ref={modalRef}
        className="p-10 bg-white rounded-modal mb-5 flex flex-col gap-6 text-lg justify-center dark:bg-background-black3 dark:text-primary-white dark:shadow-modal-dark"
      >
        <h1 className="text-3xl font-bold text-brand-primary dark:text-primary-white">통합 검색</h1>
        <div className="flex items-center">
          <h2 className="text-2xl w-1/8 font-bold text-brand-primary dark:text-primary-white">
            법령
          </h2>
          <div className="bg-filter-outline1 h-[1] w-full"></div>
        </div>
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
            onOpenChange={(open) => {
              if (open) setOpenCalendar(null);
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
            itemList={authorityData}
            triggerStyle="w-[165px]"
            onValueChange={(value) => {
              setAuthority(value);
            }}
            onOpenChange={(open) => {
              if (open) setOpenCalendar(null);
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
            onOpenChange={(open) => {
              if (open) setOpenCalendar(null);
            }}
            disabled={!authority || authority === '전체'}
            placeholder={
              authority === '전체' ? '전체' : authority ? `${authority} 선택` : '먼저 소관기관 선택'
            }
          />
        </div>

        <div ref={promulgationRef} className="relative flex gap-7 items-center">
          <label htmlFor="promulgation" className="min-w-fit">
            공포일자
          </label>
          <button
            id="promulgation"
            type="button"
            onClick={() => {
              setOpenCalendar(openCalendar === 'promulgation' ? null : 'promulgation');
            }}
            className="w-full py-2 px-6 flex gap-3 items-center justify-between rounded-full bg-background-white  outline-none border border-filter-outline1 text-primary-gray2 focus:shadow-filter-light-active dark:bg-primary-gray3 dark:text-primary-white dark:border-filter-outline2 data-[state=open]:shadow-filter-light-active dark:data-[state=open]:shadow-filter-dark-active'"
          >
            {promulgationRange.start === null || promulgationRange.end === null
              ? '기간을 선택해주세요'
              : `${promulgationRange.start} ~ ${promulgationRange.end}`}
            <FilterDetailDown className="dark:text-[#6E6E6E]" />
          </button>
          {openCalendar === 'promulgation' && (
            <div className="absolute top-13 right-0 z-10">
              <CalendarWithDateInputRange onChangeValue={setPromulgationRange} />
            </div>
          )}
        </div>

        <div ref={enforcementRef} className="relative flex gap-7 items-center mb-5">
          <label htmlFor="enforcement" className="min-w-fit">
            시행일자
          </label>
          <button
            id="enforcement"
            type="button"
            onClick={() => {
              setOpenCalendar(openCalendar === 'enforcement' ? null : 'enforcement');
            }}
            className="w-full py-2 px-6 flex gap-3 items-center justify-between rounded-full bg-background-white  outline-none border border-filter-outline1 text-primary-gray2 focus:shadow-filter-light-active dark:bg-primary-gray3 dark:text-primary-white dark:border-filter-outline2 data-[state=open]:shadow-filter-light-active dark:data-[state=open]:shadow-filter-dark-active'"
          >
            {enforcementRange.start === null || enforcementRange.end === null
              ? '기간을 선택해주세요'
              : `${enforcementRange.start} ~ ${enforcementRange.end}`}
            <FilterDetailDown className="dark:text-[#6E6E6E]" />
          </button>
          {openCalendar === 'enforcement' && (
            <div className="absolute top-13 right-0 z-10">
              <CalendarWithDateInputRange onChangeValue={setEnforcementRange} />
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <h2 className="text-2xl w-1/8 font-bold text-brand-primary dark:text-primary-white">
            판례
          </h2>
          <div className="bg-filter-outline1 h-[1] w-full"></div>
        </div>

        <div ref={precedentRef} className="relative flex gap-7 items-center mb-5">
          <label htmlFor="sentencing" className="min-w-fit">
            선고일자
          </label>
          <button
            id="sentencing"
            type="button"
            onClick={() => {
              setOpenCalendar(openCalendar === 'sentencing' ? null : 'sentencing');
            }}
            className="w-full py-2 px-6 flex gap-3 items-center justify-between rounded-full bg-background-white  outline-none border border-filter-outline1 text-primary-gray2 focus:shadow-filter-light-active dark:bg-primary-gray3 dark:text-primary-white dark:border-filter-outline2 data-[state=open]:shadow-filter-light-active dark:data-[state=open]:shadow-filter-dark-active'"
          >
            {sentencingRange.start === null || sentencingRange.end === null
              ? '기간을 선택해주세요'
              : `${sentencingRange.start} ~ ${sentencingRange.end}`}
            <FilterDetailDown className="dark:text-[#6E6E6E]" />
          </button>
          {openCalendar === 'sentencing' && (
            <div className="absolute bottom-13 right-0 z-10">
              <CalendarWithDateInputRange onChangeValue={setSentencingRange} />
            </div>
          )}
        </div>

        <div className="flex gap-4 items-center justify-center">
          <button
            type="button"
            className="px-11 py-3 bg-brand-primary text-primary-white font-bold rounded-full dark:bg-primary-white dark:text-primary-black"
            onClick={() => {
              setTotalSearchFilter({
                lawField,
                ministry,
                promulgationDateStart: promulgationRange.start ?? '',
                promulgationDateEnd: promulgationRange.end ?? '',
                enforcementDateStart: enforcementRange.start ?? '',
                enforcementDateEnd: enforcementRange.end ?? '',
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
export default TotalSearchFilterModal;
