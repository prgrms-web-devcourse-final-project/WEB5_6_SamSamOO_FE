import Hamburger from '@/assets/icons/hamburger.svg';
import { PrecedentDetailsResponse } from '@/types/precedent';

function PrecedentDetailResult({ data }: { data: PrecedentDetailsResponse }) {
  const {
    precedentNumber, // 판례일련번호
    caseName, // 사건명
    caseNumber, // 사건번호
    sentencingDate, // 선고일자
    sentence, // 선고
    courtName, // 법원명
    // courtTypeCode, // 법원종류코드
    caseTypeName, // 사건종류명
    caseTypeCode, // 사건종류코드
    typeOfJudgment, // 판결유형
    notice, // 판시사항
    summaryOfTheJudgment, // 판결요지
    // referenceArticle, // 참조조문
    // referencePrecedent, // 참조판례
    precedentContent, // 판례내용
  } = data;
  return (
    <>
      <div className="w-full h-full flex flex-1">
        <section className="w-[366px] text-primary-gray2 dark:text-primary-white h-[calc(100vh-50px)] border-r">
          <h2 className="sr-only">네비게이션</h2>
          <div className="w-[366px] flex gap-2 items-center py-10 border-b mb-8 px-8">
            <Hamburger className="dark:text-primary-white w-8 h-4" />
            <p className="font-bold text-3xl">판례 목차</p>
          </div>
          <div className="px-8">
            <nav className="h-[calc(100vh-450px)] space-y-4">
              <p className="font-medium text-2xl text-brand-accent">판시 사항</p>
              <p className="font-medium text-2xl">판결요지</p>
              <p className="font-medium text-2xl">판례내용</p>
              <p className="pl-4 text-xl">주문</p>
              <p className="pl-4 text-xl">관련 법리</p>
              <p className="pl-4 text-xl">공소사실의 요지</p>
              <p className="pl-4 text-xl">원심의 판단</p>
              <p className="pl-4 text-xl">대법원의 판단</p>
              <p className="pl-4 text-xl">결론</p>
            </nav>
            {/* k,v로 null 값 검사해서 렌더링되게 해야할듯 */}
            <div className="border border-filter-outline2 font-medium rounded-2xl">
              <div className="flex gap-2 border-b items-center">
                <p className="border-r px-4 py-2">사건번호</p>
                <p className="pl-2">{caseNumber}</p>
              </div>
              <div className="flex gap-2 border-b items-center">
                <p className="border-r px-4 py-2">사건종류명</p>
                <p className="pl-2">{caseTypeName}</p>
              </div>
              <div className="flex gap-2 border-b items-center">
                <p className="border-r px-4 py-2">법원명</p>
                <p className="pl-2">{courtName}</p>
              </div>
              <div className="flex gap-2 border-b items-center">
                <p className="border-r px-4 py-2">선고</p>
                <p className="pl-2">{sentence}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="border-r px-4 py-2">선고일자</p>
                <p className="pl-2">{sentencingDate}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-[1200px] px-25 py-10 ">
          <h2 className="sr-only">컨텐츠</h2>
          <header className="text-primary-gray1 dark:text-primary-white">
            <div className="flex gap-2 items-center mb-3">
              <div className="border-4 border-brand-accent rounded-3xl px-4 py-1 text-brand-accent font-extrabold text-2xl">
                판례
              </div>
              <p className="text-3xl font-extrabold">{caseName}</p>
            </div>
            <div className="flex gap-8 text-xl font-normal pl-2">
              <p>{typeOfJudgment}</p>
              <p>선고일자 : {sentencingDate}</p>
              <p>판례일련번호 : {precedentNumber}</p>
              <p>사건종류코드 : {caseTypeCode}</p>
            </div>
          </header>
          <article className="leading-[26px] dark:text-primary-white">
            {notice && (
              <div>
                <p className="text-2xl font-medium mb-5 pt-14 text-primary-gray2 dark:text-primary-white">
                  판시사항
                </p>
                <p>{notice.slice(0, notice.indexOf('<br/>'))}</p>
              </div>
            )}
            {summaryOfTheJudgment && (
              <div>
                <p className="text-2xl font-medium mb-5 pt-14 text-primary-gray2 dark:text-primary-white">
                  판결요지
                </p>
                <span>
                  {summaryOfTheJudgment.split('<br/>').map((row, index) => (
                    <li key={index} className="pb-3">
                      <p>{row}</p>
                    </li>
                  ))}
                </span>
              </div>
            )}
            {precedentContent && (
              <div>
                <p className="text-2xl font-medium mb-5 pt-14 text-primary-gray2 dark:text-primary-white">
                  판례내용
                </p>
                <span>
                  {precedentContent.split('<br/>').map((row, index) => {
                    if (row.includes('【') && row[1] !== '주') return '';
                    return (
                      <li key={index} className="pb-3">
                        <p>{row}</p>
                      </li>
                    );
                  })}
                </span>
              </div>
            )}
          </article>
        </section>
      </div>
    </>
  );
}
export default PrecedentDetailResult;
