export type MenuItem = {
  label: string;
};

export type LawSearchFilter = {
  lawField?: string;
  authority?: string;
  ministry?: string;
  promulgationDateStart?: string;
  promulgationDateEnd?: string;
  enforcementDateStart?: string;
  enforcementDateEnd?: string;
};

export type LawSearchFilterLabel = keyof LawSearchFilter;

export type TestSearchFilter = {
  field1: string;
  field2: string;
  field3: string;
};

export type CalendarRange = { start: string | null; end: string | null };

// export type TestSearchFilter = {
//   필드1: {
//     field1: string;
//   };
//   필드2: {
//     field2: string;
//   };
//   필드3: {
//     field3: string;
//   };
// }

// type TestKeys = 'field1' | 'field2' | 'filed3';
// type TestValues = Record<TestKeys, string>;
// const koLabel: Record<TestKeys, string> = {
//   field1: '필드1',
//   field2: '필드2',
//   filed3: '필드3',
// };
