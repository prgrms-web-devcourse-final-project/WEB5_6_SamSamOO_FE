import { useEffect, useRef, useState } from 'react';
import FilterDetailDown from '@/assets/icons/filterDetailDown.svg';

import { ministryData, authorityData, lawFieldData } from './filterItemList';

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
  const [openCalendar, setOpenCalendar] = useState<'promulgation' | 'enforcement' | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const promulgationRef = useRef<HTMLDivElement>(null);
  const enforcementRef = useRef<HTMLDivElement>(null);
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

  useClosePopup({ onClose, isOpen, ref: modalRef });
  useClosePopup({
    isOpen: !!openCalendar,
    onClose: () => setOpenCalendar(null),
    ignoreSelectors: ['[data-radix-popper-content-wrapper]'],
    hiddenOverflow: false,
    ref: openCalendar === 'promulgation' ? promulgationRef : enforcementRef,
  });

  return (
    <div className="fixed flex inset-0 z-10 bg-black/40 backdrop-blur-sm w-screen h-screen items-center justify-center">
      <section
        ref={modalRef}
        className="w-full h-screen overflow-y-scroll sm:overflow-y-visible sm:w-fit sm:h-fit px-10 pt-30 pb-10 sm:px-10 sm:py-10 bg-white sm:rounded-modal sm:mb-5  dark:bg-background-black3 dark:text-primary-white dark:shadow-modal-dark"
      >
        <div className="flex flex-col gap-6 text-lg justify-center ">
          <h1 className="text-3xl font-bold text-brand-primary dark:text-primary-white">
            법령 상세 검색
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-7 sm:items-center">
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
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-7 sm:items-center">
            <label className="min-w-fit" htmlFor="authority">
              소관부처
            </label>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-7">
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
                  authority === '전체'
                    ? '전체'
                    : authority
                      ? `${authority} 선택`
                      : '먼저 소관기관 선택'
                }
              />
            </div>
          </div>

          <div
            ref={promulgationRef}
            className="relative flex flex-col sm:flex-row gap-2 sm:gap-7 sm:items-center"
          >
            <label htmlFor="promulgation" className="min-w-fit">
              공포일자
            </label>
            <button
              id="promulgation"
              type="button"
              onClick={() => {
                setOpenCalendar(openCalendar === 'promulgation' ? null : 'promulgation');
              }}
              className="w-full py-2 px-6 text-sm sm:text-[16px] flex gap-3 items-center justify-between rounded-full bg-background-white  outline-none border border-filter-outline1 text-primary-gray2 focus:shadow-filter-light-active dark:bg-primary-gray3 dark:text-primary-white dark:border-filter-outline2 data-[state=open]:shadow-filter-light-active dark:data-[state=open]:shadow-filter-dark-active'"
            >
              {promulgationRange.start === null || promulgationRange.end === null
                ? '기간을 선택해주세요'
                : `${promulgationRange.start} ~ ${promulgationRange.end}`}
              <FilterDetailDown className="dark:text-[#6E6E6E]" />
            </button>
            {openCalendar === 'promulgation' && (
              <div className="absolute top-22 sm:top-13 sm:right-0 z-10 w-full sm:w-[82%]">
                <CalendarWithDateInputRange onChangeValue={setPromulgationRange} />
              </div>
            )}
          </div>

          <div
            ref={enforcementRef}
            className="relative flex flex-col sm:flex-row gap-2 sm:gap-7 sm:items-center mb-5"
          >
            <label htmlFor="enforcement" className="min-w-fit">
              시행일자
            </label>
            <button
              id="enforcement"
              type="button"
              onClick={() => {
                setOpenCalendar(openCalendar === 'enforcement' ? null : 'enforcement');
              }}
              className="w-full py-2 px-6 text-sm sm:text-[16px] flex gap-3 items-center justify-between rounded-full bg-background-white  outline-none border border-filter-outline1 text-primary-gray2 focus:shadow-filter-light-active dark:bg-primary-gray3 dark:text-primary-white dark:border-filter-outline2 data-[state=open]:shadow-filter-light-active dark:data-[state=open]:shadow-filter-dark-active'"
            >
              {enforcementRange.start === null || enforcementRange.end === null
                ? '기간을 선택해주세요'
                : `${enforcementRange.start} ~ ${enforcementRange.end}`}
              <FilterDetailDown className="dark:text-[#6E6E6E]" />
            </button>
            {openCalendar === 'enforcement' && (
              <div className="absolute bottom-14 sm:top-13 sm:right-0 z-10 w-full sm:w-[82%]">
                <CalendarWithDateInputRange onChangeValue={setEnforcementRange} />
              </div>
            )}
          </div>

          <div className="flex gap-4 items-center justify-center">
            <button
              type="button"
              className="px-9 sm:px-11 py-3 bg-brand-primary text-primary-white font-bold rounded-full dark:bg-primary-white dark:text-primary-black"
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
              className="px-9 sm:px-11 py-3 border border-brand-primary font-bold rounded-full dark:border-primary-white"
              onClick={onClose}
            >
              닫기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
export default LawSearchFilterModal;
