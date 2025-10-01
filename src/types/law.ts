export type LawItem = {
  id: number;
  lawName: string;
  lawField: string; // 정해져있다면 리터럴로 바꾸는걸로
  ministry: string;
  promulgationNumber: string;
  promulgationDate: string; // "YYYY-MM-DD" 형식
  enforcementDate: string;
  firstJoContent: string;
};

export type LawResponse = {
  content: LawItem[];
  totalElements: number;
  totalPages: number;
  pageNumber: number; // 0-based
  pageSize: number;
};

export type LawRequest = {
  lawName?: string | null;
  lawField?: string;
  ministry?: string;
  promulgationDateStart?: string;
  promulgationDateEnd?: string;
  enforcementDateStart?: string;
  enforcementDateEnd?: string;
  pageNumber: number;
  pageSize: number;
};
