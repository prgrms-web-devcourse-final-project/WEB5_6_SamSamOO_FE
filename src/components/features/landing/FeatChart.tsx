import { useMounted } from '@/hooks/useMounted';
import { useStaggerFade } from '@/hooks/useStaggerFade';
import { useTheme } from 'next-themes';
import Image from 'next/image';

function FeatChart() {
  const containerRef = useStaggerFade({ stagger: 0.4, duration: 1 });
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const imageSrc =
    mounted && resolvedTheme === 'dark'
      ? '/images/landingVoteDtDark.png'
      : '/images/landingVoteDt.png';
  return (
    <section className="center-col gap-20" ref={containerRef} aria-labelledby="feat-chart-title">
      <h2 className="a11y">투표 상세 팝업</h2>
      <div className="flex flex-col-reverse lg:flex-row lg:gap-24 gap-12 w-[80%]">
        <div className="stagger-item center-col">
          <Image
            src={imageSrc}
            alt="투표 상세 이미지"
            width={630}
            height={663}
            className="shadow-landing-card dark:shadow-landing-card-dark rounded-[30px]"
            loading="lazy"
          />
        </div>
        <div className="center-col stagger-item">
          <div className="flex flex-col landing-content">
            <p>참여한 투표의 결과를 통해,</p>
            <p>간단하고 빠르게 반응을 확인해보세요</p>
            <p>다양한 차트로 여러 인사이트를 얻을 수 있어요</p>
          </div>
        </div>
      </div>
      <aside aria-label="법적 고지사항" className="center-col mb-12 lg:mb-20 w-[80%]">
        <p className="lg:landing-sub md:text-3xl text-2xl font-semibold">
          본 서비스는 참고용 법률 정보만을 제공합니다.
        </p>
        <p className="lg:text-4xl md:text-2xl text-base font-medium">
          법적 효력이나 책임은 없으며, 구체적인 사안은 반드시 전문가와 상담하시기 바랍니다.
        </p>
      </aside>
    </section>
  );
}
export default FeatChart;
