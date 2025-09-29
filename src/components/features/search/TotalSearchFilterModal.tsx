import { useState } from 'react';
import { lawFieldData } from './_testData/mockData';

import SelectMenu from '@/components/ui/SelectMenu';
import useClosePopup from '@/hooks/useClosePopup';
import { TestSearchFilter } from '@/types/global';

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  setTotalSearchFilter: React.Dispatch<React.SetStateAction<TestSearchFilter>>;
}

function TotalSearchFilterModal({ isOpen, onClose = () => {}, setTotalSearchFilter }: Props) {
  const [field1, setField1] = useState<string>('');
  const [field2, setField2] = useState<string>('');
  const [field3, setField3] = useState<string>('');
  useClosePopup({ onClose, isOpen });

  return (
    <div
      className="absolute inset-0 z-10 bg-black/40 backdrop-blur-sm w-screen h-screen flex items-center justify-center"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section className="p-10 bg-white rounded-modal flex flex-col gap-6 text-lg justify-center dark:bg-background-black3 dark:text-primary-white dark:shadow-modal-dark">
        <h1 className="text-3xl font-bold text-primary dark:text-primary-white">통합 검색</h1>
        <div className="flex gap-7 items-center">
          <label className="min-w-fit" htmlFor="field1">
            카테고리1
          </label>
          <SelectMenu
            field="field1"
            value={field1}
            itemList={lawFieldData}
            triggerStyle="w-[165px]"
            onValueChange={(value) => {
              console.log('분야1 : ', value);
              setField1(value);
            }}
          />
        </div>
        <div className="flex gap-7 items-center">
          <label className="min-w-fit" htmlFor="field2">
            카테고리2
          </label>
          <SelectMenu
            field="field2"
            value={field2}
            itemList={lawFieldData}
            triggerStyle="w-[165px]"
            onValueChange={(value) => {
              console.log('분야2 : ', value);
              setField2(value);
            }}
          />
        </div>
        <div className="flex gap-7 items-center">
          <label className="min-w-fit" htmlFor="field3">
            카테고리3
          </label>
          <SelectMenu
            field="field3"
            value={field3}
            itemList={lawFieldData}
            triggerStyle="w-[165px]"
            onValueChange={(value) => {
              console.log('분야3 : ', value);
              setField3(value);
            }}
          />
        </div>
        <div className="flex gap-4 items-center justify-center">
          <button
            type="button"
            className="px-11 py-3 bg-primary text-primary-white font-bold rounded-full dark:bg-primary-white dark:text-primary-black"
            // onClick={() => setTotalSearchFilter({
            //   필드1: { field1 },
            //   필드2: { field2 },
            //   필드3: { field3 },
            // })}
            onClick={() =>
              setTotalSearchFilter({
                field1,
                field2,
                field3,
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
export default TotalSearchFilterModal;
