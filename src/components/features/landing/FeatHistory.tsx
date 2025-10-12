import { useStaggerFade } from '@/hooks/useStaggerFade';
import Image from 'next/image';

function FeatHistory() {
  const containerRef = useStaggerFade({ stagger: 0.4, duration: 1 });
  return (
    <section className="h-screen center-col" ref={containerRef}>
      <h2 className="a11y">챗봇 기능 섹션</h2>
      <div className="flex flex-col gap-10 w-[80%]">
        <div className="stagger-item">
          <h2 className="landing-title dark:bg-background-white dark:text-primary-black w-fit">
            상담 히스토리
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-13">
          <div className="flex lg:landing-sub text-3xl font-semibold stagger-item">
            <p>
              내가 한 상담,
              <br />
              자동으로 정리되는
              <br />
              나만의 기록
            </p>
          </div>
          <div className="center-col stagger-item">
            <Image
              src={'/images/landingChatbot.png'}
              alt="챗팅 모달 이미지"
              width={300}
              height={682}
              className=" rounded-[30px] dark:hidden shadow-landing-card"
            />
            <Image
              src={'/images/landingChatbotDark.png'}
              alt="챗팅 모달 이미지"
              width={300}
              height={682}
              className=" rounded-[30px] hidden dark:block shadow-landing-card-dark"
            />
          </div>
          <div className="lg:landing-content text-2xl font-medium center-col stagger-item ">
            <p>
              필요할 때, 언제든 다시 확인할 수 있어요
              <br />
              메신저에서 상담 기록을 확인하고,
              <br />
              이를 바탕으로 법령과 판례를
              <br />더 편하게 검색해보세요
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default FeatHistory;
