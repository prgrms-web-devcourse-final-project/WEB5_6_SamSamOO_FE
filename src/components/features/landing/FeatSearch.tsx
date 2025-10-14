import { useMounted } from '@/hooks/useMounted';
import { useStaggerFade } from '@/hooks/useStaggerFade';
import { useTheme } from 'next-themes';
import Image from 'next/image';

function FeatSearch() {
  const containerRef = useStaggerFade({ stagger: 0.4, duration: 1.2 });
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const imageSrc =
    mounted && resolvedTheme === 'dark'
      ? '/images/landingDetailDark.png'
      : '/images/landingDetail.png';
  return (
    <section className="h-screen center-col" ref={containerRef} aria-labelledby="feat-search-title">
      <div className="flex flex-col gap-10 w-[80%]">
        <div className="stagger-item">
          <h2 className="landing-title dark:bg-background-white dark:text-primary-black w-fit">
            법령 판례 검색
          </h2>
        </div>
        <div className="flex lg:flex-row flex-col gap-8">
          <div className="lg:landing-sub text-3xl font-semibold stagger-item min-w-[280px] sm:min-w-[370px]">
            <p>복잡한 법령과 판례,</p>
            <p>보기 쉽게 정리했어요</p>
          </div>
          <div className="stagger-item">
            <Image
              src={imageSrc}
              alt={'검색 상세 페이지 이미지'}
              width={820}
              height={420}
              className="shadow-landing-card dark:shadow-landing-card-dark rounded-[30px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default FeatSearch;
