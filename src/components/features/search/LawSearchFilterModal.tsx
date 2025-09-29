import { useEffect, useState } from 'react';

import { groupTestData, lawFieldData } from './_testData/mockData';

import SelectMenu from '@/components/ui/SelectMenu';
import useClosePopup from '@/hooks/useClosePopup';
import { LawSearchFilter } from '@/types/global';

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  setLawSearchFilter: React.Dispatch<React.SetStateAction<LawSearchFilter>>;
}

function LawSearchFilterModal({ isOpen = false, onClose = () => {}, setLawSearchFilter }: Props) {
  const [lawField, setLawField] = useState<string>('');
  const [authority, setAuthority] = useState<string>('');
  const [ministry, setMinistry] = useState<string>('');
  const [promulgationStart, setPromulgationStart] = useState<string>('');
  const [promulgationEnd, setPromulgationEnd] = useState<string>('');
  const [enforcementStart, setEnforcementStart] = useState<string>('');
  const [enforcementEnd, setEnforcementEnd] = useState<string>('');

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
        <h1 className="text-3xl font-bold text-primary dark:text-primary-white">법령 상세 검색</h1>
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
              // console.log('법령분야 : ', value);
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
              // console.log('소관기관 : ', value);
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
              // console.log(`${authority} : `, value);
              setMinistry(value);
            }}
            disabled={!authority}
            placeholder={authority ? `${authority} 선택` : '먼저 소관기관 선택'}
          />
        </div>

        {/* 아래는 캘린더로 변환 필요 */}
        <div className="flex gap-7 items-center">
          <label htmlFor="promulgationStart" className="min-w-fit">
            공포일자
          </label>
          <input
            type="date"
            id="promulgationStart"
            onChange={(e) => {
              // console.log(e.target.value);
              setPromulgationStart(e.target.value);
            }}
          />
          <input
            type="date"
            id="promulgationEnd"
            onChange={(e) => {
              // console.log(e.target.value);
              setPromulgationEnd(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-7 items-center">
          <label htmlFor="enforcementStart" className="min-w-fit">
            시행일자
          </label>
          <input
            type="date"
            id="enforcementStart"
            onChange={(e) => {
              // console.log(e.target.value);
              setEnforcementStart(e.target.value);
            }}
          />
          <input
            type="date"
            id="enforcementEnd"
            onChange={(e) => {
              // console.log(e.target.value);
              setEnforcementEnd(e.target.value);
            }}
          />
        </div>

        <div className="flex gap-4 items-center justify-center">
          <button
            type="button"
            className="px-11 py-3 bg-primary text-primary-white font-bold rounded-full dark:bg-primary-white dark:text-primary-black"
            onClick={() =>
              setLawSearchFilter({
                lawField,
                authority,
                ministry,
                promulgationStart,
                promulgationEnd,
                enforcementStart,
                enforcementEnd,
              })
            }
          >
            검색
          </button>
          <button
            type="button"
            className="px-11 py-3 border border-primary font-bold rounded-full dark:border-primary-white"
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
