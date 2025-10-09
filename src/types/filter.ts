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

export type TestSearchFilter = {
  field1: string;
  field2: string;
  field3: string;
};

export type PrecedentSearchFilter = {
  sentencingDateStart?: string;
  sentencingDateEnd?: string;
};

export type TotalSearchFilter = LawSearchFilter & PrecedentSearchFilter;

export type CalendarRange = { start: string | null; end: string | null };
