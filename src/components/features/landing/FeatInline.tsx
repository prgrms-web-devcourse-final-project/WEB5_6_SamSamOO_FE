import { useMounted } from '@/hooks/useMounted';
import { useStaggerFade } from '@/hooks/useStaggerFade';
import { useTheme } from 'next-themes';
import Image from 'next/image';

function FeatInline() {
  const containerRef = useStaggerFade({ stagger: 0.4, duration: 1.2 });
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const imageSrc =
    mounted && resolvedTheme === 'dark'
      ? '/images/landingInlineDark.png'
      : '/images/landingInline.png';
  return (
    <section className="h-screen center-col" ref={containerRef} aria-labelledby="feat-inline-title">
      <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-20 w-[80%]">
        <div className="stagger-item center-col">
          <Image
            src={imageSrc}
            alt="인라인 용어 검색 이미지"
            width={675}
            height={366}
            className="shadow-landing-card dark:shadow-landing-card-dark rounded-[30px]"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-20">
          <div className="stagger-item">
            <h2 className="landing-title dark:bg-background-white dark:text-primary-black w-fit mb-5">
              인라인 용어 해설
            </h2>
            <div className="flex flex-col lg:landing-sub md:text-3xl text-2xl font-semibold">
              <p>읽다가 모르는 법률 용어,</p>
              <p>드래그 한 번이면 끝</p>
            </div>
          </div>
          <div className="lg:landing-content md:text-xl text-base font-semibold stagger-item">
            <p>법령이나 판례 속 낯선 단어를</p>
            <p>드래그하면 바로 해설을 볼 수 있어요</p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default FeatInline;
