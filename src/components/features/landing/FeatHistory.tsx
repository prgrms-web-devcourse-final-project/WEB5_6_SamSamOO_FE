import { useMounted } from '@/hooks/useMounted';
import { useStaggerFade } from '@/hooks/useStaggerFade';
import { useTheme } from 'next-themes';
import Image from 'next/image';

function FeatHistory() {
  const containerRef = useStaggerFade({ stagger: 0.4, duration: 1 });
  const { resolvedTheme } = useTheme();

  const mounted = useMounted();

  const imageSrc =
    mounted && resolvedTheme === 'dark'
      ? '/images/landingChatbotDark.png'
      : '/images/landingChatbot.png';
  return (
    <section className="h-screen center-col" ref={containerRef}>
      <div className="flex flex-col gap-10 w-[80%]">
        <div className="stagger-item">
          <h2 className="landing-title dark:bg-background-white dark:text-primary-black w-fit">
            상담 히스토리
          </h2>
        </div>
        <div className="flex flex-col justify-between lg:flex-row gap-13">
          <div className="flex flex-col lg:landing-sub text-3xl font-semibold stagger-item">
            <p>내가 한 상담,</p>
            <p>자동으로 정리되는</p>
            <p>나만의 기록</p>
          </div>
          <div className="center-col stagger-item">
            <Image
              src={imageSrc}
              alt="채팅 히스토리 화면"
              width={300}
              height={682}
              className="rounded-[30px] shadow-landing-card dark:shadow-landing-card-dark"
              loading="lazy"
            />
          </div>
          <div className="lg:landing-content text-xl font-semibold flex flex-col  stagger-item ">
            <p>필요할 때, 언제든 다시 확인할 수 있어요</p>
            <p>메신저에서 상담 기록을 확인하고,</p>
            <p>이를 바탕으로 법령과 판례를</p>
            <p>더 편하게 검색해보세요</p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default FeatHistory;
