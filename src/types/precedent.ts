export type PrecedentItem = {
  id: number;
  caseName: string;
  caseNumber: string;
  sentencingDate: Date; // "YYYY-MM-DD" 선고일자
  contents: string;
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
  sentencingDateStart?: string; // 선고일자 시작
  sentencingDateEnd?: string; // 선고일자 끝
  pageNumber: number;
  pageSize: number;
};

export type PrecedentDetailsResponse = {
  precedentNumber: string; // 판례일련번호
  caseName: string; // 사건명
  caseNumbe: string; // 사건번호
  sentencingDate: string; // 선고일자
  sentence: string; // 선고
  courtName: string; // 법원명
  courtTypeCode: string; // 법원종류코드
  caseTypeName: string; // 사건종류명
  caseTypeCode: string; // 사건종류코드
  typeOfJudgment: string; // 판결유형
  notice: string; // 판시사항
  summaryOfTheJudgment: string; // 판결요지
  referenceArticle: string; // 참조조문
  referencePrecedent: string; // 참조판례
  precedentContent: string; // 판례내용
};
