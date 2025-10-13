import { useMounted } from '@/hooks/useMounted';
import { useStaggerFade } from '@/hooks/useStaggerFade';
import { useTheme } from 'next-themes';
import Image from 'next/image';

function FeatFilter() {
  const containerRef = useStaggerFade({ stagger: 0.4, duration: 1 });
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return null;
  const imageSrc =
    resolvedTheme === 'dark' ? '/images/landingFilterDark.png' : '/images/landingFilter.png';
  return (
    <section className="h-screen center-col" ref={containerRef}>
      <h2 className="a11y">검색 필터링 팝업</h2>
      <div className="flex flex-col md:flex-row gap-20 w-[80%]">
        <div className="stagger-item">
          <Image
            src={imageSrc}
            alt="필터 모달 이미지"
            width={600}
            height={678}
            className="shadow-landing-card dark:shadow-landing-card-dark rounded-modal"
          />
        </div>
        <div className="flex flex-col lg:landing-content text-xl font-semibold stagger-item">
          <p>꼭 필요한 내용만 깔끔하게</p>
          <p>검색과 필터로 원하는 법령과 판례를</p>
          <p>빠르게 찾을 수 있어요</p>
        </div>
      </div>
    </section>
  );
}
export default FeatFilter;
