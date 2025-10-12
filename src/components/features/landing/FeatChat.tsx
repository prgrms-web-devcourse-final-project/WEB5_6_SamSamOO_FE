import Image from 'next/image';
import { useStaggerFade } from '@/hooks/useStaggerFade';

function FeatChat() {
  const containerRef = useStaggerFade({ stagger: 0.6, duration: 1 });
  return (
    <section className="h-screen center-col" ref={containerRef}>
      <div className="flex lg:flex-row flex-col gap-6 landing-content w-[80%]">
        <div className="stagger-item min-w-[440px]">
          <p>
            법률 고민, <br />
            이제 AI 디케에게 바로 물어보세요 <br />
            다양한 분야의 법과, 생활 속 궁금증까지
            <br />
            디케가 함께할게요
          </p>
        </div>

        <div className="stagger-item">
          <Image
            src={'/images/landingChat.png'}
            alt="상담 내역 이미지"
            width={820}
            height={420}
            className="rounded-[30px] shadow-landing-card dark:hidden"
          />
          <Image
            src={'/images/landingChatDark.png'}
            alt="상담 내역 이미지"
            width={820}
            height={420}
            className="rounded-[30px] shadow-landing-card-dark hidden dark:block"
          />
        </div>
      </div>
    </section>
  );
}
export default FeatChat;
