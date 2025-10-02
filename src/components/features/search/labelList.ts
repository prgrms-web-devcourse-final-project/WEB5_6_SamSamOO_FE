import { LawSearchFilter, PrecedentSearchFilter } from '@/types/filter';

export const LawSearchFilterLabel: Record<keyof LawSearchFilter, string> = {
  lawField: '법령분야',
  authority: '소관기관',
  ministry: '소관부처',
  promulgationDateStart: '공포일자 시작',
  promulgationDateEnd: '공포일자 끝',
  enforcementDateStart: '시행일자 시작',
  enforcementDateEnd: '시행일자 끝',
};

export const PrecedentSearchFilterLabel: Record<keyof PrecedentSearchFilter, string> = {
  sentencingDateStart: '선고일자 시작',
  sentencingDateEnd: '선고일자 끝',
};

export const TotalSearchFilterLabel: Record<
  keyof LawSearchFilter | keyof PrecedentSearchFilter,
  string
> = {
  ...LawSearchFilterLabel,
  ...PrecedentSearchFilterLabel,
};
