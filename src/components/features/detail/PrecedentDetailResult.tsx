import CategoryTag from './CategoryTag';
import Sidebar from './Sidebar';
// import SidebarRagcay from './SidebarRegacy';

import extractPrecedentHeadings from '@/utils/extractPrecedentHeadings';
import ScrollButton from '@/components/ui/ScrollButton';
import InlineText from '@/components/ui/InlineText';
import { Metadata } from '@/types/detail';
import { PrecedentDetailsResponse } from '@/types/precedent';

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
  const regex = /^\s{0,2}(?:\d+\.|[가-힣]+\.|[가-힣]+\)|\([가-힣]+\)|\d+\)|\(\d+\))\s?/;
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
      <div className="w-full h-full flex flex-1 bg-background-white dark:bg-background-black1">
        <Sidebar toc={toc} metadata={metadata} category="판례" />
        <section className="flex-1 justify-center px-8 pt-22 pb-10 md:px-25 md:py-10">
          <InlineText>
            <div className="w-full max-w-[1200px]">
              <h2 className="sr-only">컨텐츠</h2>

              <header className="text-primary-gray1 dark:text-primary-white pb-10">
                <div className="flex gap-2 items-center mb-5 sm:mb-3 flex-wrap">
                  <CategoryTag text="판례" />
                  <p className="text-2xl font-extrabold leading-[36px]">{caseName}</p>
                </div>
                <div className="flex gap-3 sm:gap-8 text-xl font-normal sm:pl-2 sm:flex-row flex-col">
                  <p>{typeOfJudgment}</p>
                  <p>선고일자 : {sentencingDate}</p>
                  <p>판례일련번호 : {precedentNumber}</p>
                  <p>사건종류코드 : {caseTypeCode}</p>
                </div>
              </header>

              <article className="leading-[26px] dark:text-primary-white pb-20">
                {notice && (
                  <div id={String(count++)} className="scroll-mt-38 md:scroll-mt-24">
                    <p className="text-2xl font-medium pb-6 text-primary-gray2 dark:text-primary-white">
                      판시사항
                    </p>
                    <p>{notice.slice(0, notice.indexOf('<br/>'))}</p>
                  </div>
                )}
                {summaryOfTheJudgment && (
                  <div id={String(count++)} className="scroll-mt-24 md:scroll-mt-12">
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
                  <div id={String(count++)} className="scroll-mt-24 md:scroll-mt-12">
                    <p className="text-2xl font-medium pt-14 -mb-5 text-primary-gray2 dark:text-primary-white">
                      판례내용
                    </p>
                    <span>
                      {precedentContent.split('<br/>').map((row, index) => {
                        if (row.includes('【') && row[1] !== '주') return '';
                        if (
                          (row.includes('【') && row[1] === '주') ||
                          (regex.test(row) && row.length <= 100)
                        ) {
                          return (
                            <li
                              key={index}
                              id={String(count++)}
                              className="pt-10 pb-1 scroll-mt-30 md:scroll-mt-18"
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
            </div>
          </InlineText>
        </section>
        <ScrollButton />
      </div>
    </>
  );
}
export default PrecedentDetailResult;
