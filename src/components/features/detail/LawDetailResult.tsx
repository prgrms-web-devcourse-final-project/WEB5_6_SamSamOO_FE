import Toc from './Toc';

import tw from '@/utils/tw';
import Hamburger from '@/assets/icons/hamburger.svg';
import extractLawHeadings from '@/utils/extractLawHeadings';
import MetadataGrid from './MetadataGrid';
import { Metadata } from '@/types/detail';
import { LawDetailsResponse } from '@/types/law';
import CategoryTag from './CategoryTag';

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
      <div className="w-full h-full flex flex-1">
        <section className="flex max-w-[366px] flex-col text-primary-gray2 dark:text-primary-white border-r">
          <h2 className="sr-only">네비게이션</h2>
          <div>
            <div className="w-full flex gap-2 items-center py-10 mb-12 px-8 border-b">
              <Hamburger className="dark:text-primary-white w-8 h-4" />
              <p className="font-bold text-3xl">법령 목차</p>
            </div>
          </div>
          <div className="flex-1 px-8">
            <Toc toc={toc} />
          </div>
          <div className="px-8 pb-10">
            <MetadataGrid metadata={metadata} />
          </div>
        </section>
        <section className="w-[1200px] px-25 py-10">
          <h2 className="sr-only">컨텐츠</h2>
          <header className="text-primary-gray1 dark:text-primary-white pb-10">
            <div className="flex gap-2 items-center mb-3">
              <CategoryTag text="법령" />
              <p className="text-3xl font-extrabold">{lawName}</p>
            </div>
            <div className="flex gap-8 text-xl font-normal pl-2">
              <p>시행일자 : {enforcementDate}</p>
              <p>공포일자 : {promulgationDate}</p>
              <p>{lawField}</p>
            </div>
          </header>
          <article className="leading-[26px] dark:text-primary-white">
            {jangList.map((jang, index) => (
              <div key={`jang${index}`} className="pb-30">
                <h2
                  id={jang.content !== null ? String(count++) : ''}
                  className={tw(
                    jang.content !== null
                      ? 'text-2xl font-medium pb-6 text-primary-gray2 dark:text-primary-white scroll-mt-24'
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
                              ? 'text-xl font-medium pb-6 text-primary-gray2 dark:text-primary-white scroll-mt-24'
                              : 'text-xl font-medium text-primary-gray2 dark:text-primary-white scroll-mt-22',
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
        </section>
      </div>
    </>
  );
}
export default LawDetailResult;
