import Sidebar from './Sidebar';
// import SidebarRagcay from './SidebarRegacy';
import CategoryTag from './CategoryTag';

import tw from '@/utils/tw';
import extractLawHeadings from '@/utils/extractLawHeadings';
import ScrollButton from '@/components/ui/ScrollButton';
import InlineText from '@/components/ui/InlineText';
import { Metadata } from '@/types/detail';
import { LawDetailsResponse } from '@/types/law';

function LawDetailResult({ data }: { data: LawDetailsResponse }) {
  const {
    lawName,
    lawField,
    ministry,
    promulgationNumber,
    enforcementDate,
    promulgationDate,
    jangList,
  } = data;

  let count = 0;
  const toc = extractLawHeadings(jangList);
  const metadata: Metadata = {
    법령분야: lawField,
    소관부처: ministry,
    공포번호: promulgationNumber,
    공포일자: promulgationDate,
    시행일자: enforcementDate,
  };

  return (
    <>
      <div className="w-full h-full flex flex-1 bg-background-white dark:bg-background-black1">
        <Sidebar toc={toc} metadata={metadata} category="법령" />
        <section className="flex-1 justify-center px-8 pt-22 pb-10 md:px-25 md:py-10">
          <InlineText>
            <div className="w-full max-w-[1200px]">
              <h2 className="sr-only">컨텐츠</h2>
              <header className="text-primary-gray1 dark:text-primary-white pb-10">
                <div className="flex gap-2 items-center mb-5 sm:mb-3 flex-wrap">
                  <CategoryTag text="법령" />
                  <p className="text-2xl font-extrabold leading-[36px]">{lawName}</p>
                </div>
                <div className="flex gap-3 sm:gap-8 text-xl font-normal sm:pl-2 sm:flex-row flex-col">
                  <p>시행일자 : {enforcementDate}</p>
                  <p>공포일자 : {promulgationDate}</p>
                  <p>{lawField}</p>
                </div>
              </header>
              <article className="leading-[26px] dark:text-primary-white pb-20">
                {jangList.map((jang, index) => (
                  <div key={`jang${index}`} className="pb-30">
                    <h2
                      id={jang.content !== null ? String(count++) : ''}
                      className={tw(
                        jang.content !== null
                          ? 'text-2xl font-medium pb-6 text-primary-gray2 dark:text-primary-white scroll-mt-38 md:scroll-mt-25'
                          : '',
                      )}
                    >
                      {jang.content}
                    </h2>
                    <div>
                      {jang.joList.map((jo, index) => {
                        if (jo.content.includes('조 삭제')) return '';
                        return (
                          <div key={`jo${index}`} className="pb-6">
                            <h2
                              id={String(count++)}
                              className={tw(
                                jang.content === null
                                  ? 'text-xl font-medium pb-6 text-primary-gray2 dark:text-primary-white scroll-mt-38 md:scroll-mt-22'
                                  : 'text-xl font-medium text-primary-gray2 dark:text-primary-white scroll-mt-36 md:scroll-mt-22',
                              )}
                            >
                              {jo.content}
                            </h2>
                            <div>
                              {jo.hangList.map((hang, index) => (
                                <div key={`hang${index}`}>
                                  <div>{hang.content}</div>
                                  <div>
                                    {hang.hoList.map((ho, index) => (
                                      <div key={`ho${index}`}>
                                        <div>{ho.content}</div>
                                        <div>{ho.hang}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </article>
            </div>
          </InlineText>
        </section>
        <ScrollButton />
      </div>
    </>
  );
}
export default LawDetailResult;
