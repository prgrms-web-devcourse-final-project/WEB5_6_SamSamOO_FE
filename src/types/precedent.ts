export type PrecedentItem = {
  id: number;
  caseName: string;
  caseNumber: string;
  sentencingDate: Date; // "YYYY-MM-DD"
  contents: string; // HTML 포함 가능
};

export type PrecedentResponse = {
  content: PrecedentItem[];
  totalElements: number;
  totalPages: number;
  pageNumber: number; // 0-based
  pageSize: number;
};

export type PrecedentRequest = {
  keyword?: string | null;
  sentencingDateStart?: string;
  sentencingDateEnd?: string;
  pageNumber: number;
  pageSize: number;
};
