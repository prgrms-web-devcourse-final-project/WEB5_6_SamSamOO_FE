import { LawDetailsResponse } from '@/types/law';
import Hamburger from '@/assets/icons/hamburger.svg';
import tw from '@/utils/tw';

function LawDetailResult({ data }: { data: LawDetailsResponse }) {
  console.log(data);
  const {
    lawName,
    lawField,
    ministry,
    promulgationNumber,
    enforcementDate,
    promulgationDate,
    jangList,
  } = data;
  return (
    <>
      <div className="w-full h-full flex flex-1">
        <section className="w-[366px] text-primary-gray2 dark:text-primary-white h-[calc(100vh-50px)] border-r">
          <h2 className="sr-only">네비게이션</h2>
          <div className="w-[366px] flex gap-2 items-center py-10 border-b mb-8 px-8">
            <Hamburger className="dark:text-primary-white w-8 h-4" />
            <p className="font-bold text-3xl">법령 목차</p>
          </div>
          <div className="px-8">
            <nav className="h-[calc(100vh-450px)]  space-y-4">
              <p className="font-medium text-2xl text-brand-accent">제 1장 총칙</p>
              <p className="pl-4 text-xl">제 1조(목적)</p>
              <p className="pl-4 text-xl">제 2조(정의)</p>
              <p className="pl-4 text-xl">제 3조(국가의 책무)</p>
              <p className="font-medium text-2xl">제 2장 112 신고의 접수 처리 등</p>
              <p className="pl-4 text-xl">제 6조(112치안종합 상황실의 설치운영)</p>
              <p className="font-medium text-2xl">제 3장 112시스템의 구축 운영 등</p>
            </nav>
            {/* k,v로 null 값 검사해서 렌더링되게 해야할듯 */}
            <div className="border border-filter-outline2 font-medium rounded-2xl">
              <div className="flex gap-2 border-b items-center">
                <p className="border-r px-4 py-2">법령분야</p>
                <p className="pl-2">{lawField}</p>
              </div>
              <div className="flex gap-2 border-b items-center">
                <p className="border-r px-4 py-2">소관부처</p>
                <p className="pl-2">{ministry}</p>
              </div>
              <div className="flex gap-2 border-b items-center">
                <p className="border-r px-4 py-2">공포번호</p>
                <p className="pl-2">{promulgationNumber}</p>
              </div>
              <div className="flex gap-2 border-b items-center">
                <p className="border-r px-4 py-2">공포일자</p>
                <p className="pl-2">{promulgationDate}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="border-r px-4 py-2">시행일자</p>
                <p className="pl-2">{enforcementDate}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-[1200px] px-25 py-10 ">
          <h2 className="sr-only">컨텐츠</h2>
          <header className="text-primary-gray1 dark:text-primary-white">
            <div className="flex gap-2 items-center mb-3">
              <div className="border-4 border-brand-accent rounded-3xl px-4 py-1 text-brand-accent font-extrabold text-2xl">
                법령
              </div>
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
              <div key={`jang${index}`}>
                <p
                  className={tw(
                    jang.content !== null
                      ? 'text-2xl font-medium mb-5 pt-14 text-primary-gray2 dark:text-primary-white'
                      : '',
                  )}
                >
                  {jang.content}
                </p>
                <div>
                  {jang.joList.map((jo, index) => {
                    if (jo.content.includes('조 삭제')) return '';
                    return (
                      <div key={`jo${index}`}>
                        <div
                          className={tw(
                            jang.content === null
                              ? 'text-xl font-medium mb-5 pt-14 text-primary-gray2 dark:text-primary-white'
                              : '',
                          )}
                        >
                          {jo.content}
                        </div>
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
