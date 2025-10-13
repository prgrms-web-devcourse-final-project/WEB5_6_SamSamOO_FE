import Image from 'next/image';
import { useStaggerFade } from '@/hooks/useStaggerFade';
import { useTheme } from 'next-themes';
import { useMounted } from '@/hooks/useMounted';

function FeatChat() {
  const containerRef = useStaggerFade({ stagger: 0.6, duration: 1 });
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return null;
  const imageSrc =
    resolvedTheme === 'dark' ? '/images/landingChatDark.png' : '/images/landingChat.png';
  return (
    <section className="h-screen center-col" ref={containerRef} aria-labelledby="feat-chat-title">
      <h2 className="a11y">법률 상담 채팅</h2>
      <div className="flex lg:flex-row flex-col gap-6 lg:landing-content text-xl font-semibold w-[80%]">
        <div className="stagger-item min-w-[280px] sm:min-w-[440px]">
          <p>법률 고민, </p>
          <p>이제 AI 디케에게 바로 물어보세요</p>
          <p>다양한 분야의 법과, 생활 속 궁금증까지</p>
          <p>디케가 함께할게요</p>
        </div>

        <div className="stagger-item">
          <Image
            src={imageSrc}
            alt="AI 디케 법률 상담 채팅 인터페이스 예시 화면"
            width={820}
            height={420}
            className="rounded-[30px] shadow-landing-card dark:shadow-landing-card-dark"
            quality={90}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
export default FeatChat;
