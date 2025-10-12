import { useStaggerFade } from '@/hooks/useStaggerFade';
import Image from 'next/image';

function FeatChart() {
  const containerRef = useStaggerFade({ stagger: 0.4, duration: 1 });
  return (
    <section className="center-col gap-78" ref={containerRef}>
      <div className="flex flex-col-reverse md:flex-row md:gap-24 gap-12">
        <div className="stagger-item">
          <Image
            src={'/images/landingVoteDt.png'}
            alt="투표 상세 이미지"
            width={630}
            height={663}
            className="shadow-landing-card rounded-[30px] dark:hidden"
          />
          <Image
            src={'/images/landingVoteDtDark.png'}
            alt="투표 상세 이미지"
            width={630}
            height={663}
            className="shadow-landing-card-dark rounded-[30px] hidden dark:block"
          />
        </div>
        <div className="center-col stagger-item">
          <p className="landing-content">
            참여한 투표의 결과를 통해,
            <br />
            간단하고 빠르게 반응을 확인해보세요
            <br />
            다양한 차트로 여러 인사이트를 얻을 수 있어요
          </p>
        </div>
      </div>
      <div className="center-col mb-50 w-[80%]">
        <p className="md:landing-sub text-3xl font-semibold">
          본 서비스는 참고용 법률 정보만을 제공합니다.
        </p>
        <p className="md:text-4xl text-2xl font-medium">
          법적 효력이나 책임은 없으며, 구체적인 사안은 반드시 전문가와 상담하시기 바랍니다.
        </p>
      </div>
    </section>
  );
}
export default FeatChart;
