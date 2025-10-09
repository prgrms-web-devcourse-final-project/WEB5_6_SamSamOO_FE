import Hamburger from '@/assets/icons/hamburger.svg';
import { PrecedentDetailsResponse } from '@/types/precedent';
import extractPrecedentHeadings from '@/utils/extractPrecedentHeadings';
import Toc from './Toc';
import { Metadata } from '@/types/detail';
import MetadataGrid from './MetadataGrid';
import CategoryTag from './CategoryTag';

function PrecedentDetailResult({ data }: { data: PrecedentDetailsResponse }) {
  console.log(data);
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

  let count = 0;
  const regex = /^(?=.{0,2}\d+\.\s)/;
  const toc = extractPrecedentHeadings(notice, summaryOfTheJudgment, precedentContent);
  const metadata: Metadata = {
    사건번호: caseNumber,
    사건종류명: caseTypeName,
    법원명: courtName,
    선고: sentence,
    선고일자: sentencingDate,
  };
  return (
    <>
      <div className="w-full h-full flex flex-1">
        <section className="flex max-w-[366px] flex-col text-primary-gray2 dark:text-primary-white border-r">
          <h2 className="sr-only">네비게이션</h2>
          <div>
            <div className="w-full flex gap-2 items-center py-10 mb-12 px-8 border-b">
              <Hamburger className="dark:text-primary-white w-8 h-4" />
              <p className="font-bold text-3xl">판례 목차</p>
            </div>
          </div>
          <div className="flex-1 px-8">
            <Toc toc={toc} />
          </div>
          <div className="px-8 pb-10">
            <MetadataGrid metadata={metadata} />
          </div>
        </section>
        <section className="w-[1200px] px-25 py-10 ">
          <h2 className="sr-only">컨텐츠</h2>
          <header className="text-primary-gray1 dark:text-primary-white pb-10">
            <div className="flex gap-2 items-center mb-3">
              <CategoryTag text="판례" />
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
              <div id={String(count++)} className="scroll-mt-24">
                <p className="text-2xl font-medium pb-6 text-primary-gray2 dark:text-primary-white">
                  판시사항
                </p>
                <p>{notice.slice(0, notice.indexOf('<br/>'))}</p>
              </div>
            )}
            {summaryOfTheJudgment && (
              <div id={String(count++)} className="scroll-mt-12">
                <p className="text-2xl font-medium mb-5 pt-14 text-primary-gray2 dark:text-primary-white ">
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
              <div id={String(count++)} className="scroll-mt-12">
                <p className="text-2xl font-medium mb-5 pt-14 text-primary-gray2 dark:text-primary-white">
                  판례내용
                </p>
                <span>
                  {precedentContent.split('<br/>').map((row, index) => {
                    if (row.includes('【') && row[1] !== '주') return '';
                    if (
                      (row.includes('【') && row[1] === '주') ||
                      (regex.test(row) && row.length <= 30)
                    ) {
                      return (
                        <li
                          key={index}
                          id={String(count++)}
                          className="pb-3 text-red-700 scroll-mt-22"
                        >
                          <p>{row}</p>
                        </li>
                      );
                    }
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
