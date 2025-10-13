import { useStaggerFade } from '@/hooks/useStaggerFade';
import Image from 'next/image';

function FeatSearch() {
  const containerRef = useStaggerFade({ stagger: 0.4, duration: 1.2 });
  return (
    <section className="h-screen center-col" ref={containerRef}>
      <div className="flex flex-col gap-10 w-[80%]">
        <div className="stagger-item">
          <h2 className="landing-title dark:bg-background-white dark:text-primary-black w-fit">
            법령 판례 검색
          </h2>
        </div>
        <div className="flex md:flex-row flex-col gap-8">
          <div className="md:landing-sub text-3xl font-semibold stagger-item min-w-[370px]">
            <p>
              복잡한 법령과 판례, <br />
              보기 쉽게 정리했어요
            </p>
          </div>
          <div className="stagger-item">
            <Image
              src={'/images/landingDetail.png'}
              alt={'검색 상세 페이지 이미지'}
              width={820}
              height={420}
              className="shadow-landing-card rounded-[30px] dark:hidden"
            />
            <Image
              src={'/images/landingDetailDark.png'}
              alt={'검색 상세 페이지 이미지'}
              width={820}
              height={420}
              className="shadow-landing-card-dark rounded-[30px] hidden dark:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default FeatSearch;
