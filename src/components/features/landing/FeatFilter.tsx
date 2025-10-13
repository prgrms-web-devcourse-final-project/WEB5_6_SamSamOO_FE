import { useStaggerFade } from '@/hooks/useStaggerFade';
import Image from 'next/image';

function FeatFilter() {
  const containerRef = useStaggerFade({ stagger: 0.4, duration: 1 });
  return (
    <section className="h-screen center-col" ref={containerRef}>
      <div className="flex flex-col md:flex-row gap-20">
        <div className="stagger-item">
          <Image
            src={'/images/landingFilter.png'}
            alt="필터 모달 이미지"
            width={600}
            height={678}
            className="shadow-landing-card rounded-modal dark:hidden"
          />
          <Image
            src={'/images/landingFilterDark.png'}
            alt="필터 모달 이미지"
            width={600}
            height={678}
            className="shadow-landing-card-dark rounded-modal hidden dark:block"
          />
        </div>
        <div className="landing-content stagger-item">
          <p>
            꼭 필요한 내용만 깔끔하게
            <br />
            검색과 필터로 원하는 법령과 판례를
            <br />
            빠르게 찾을 수 있어요
          </p>
        </div>
      </div>
    </section>
  );
}
export default FeatFilter;
