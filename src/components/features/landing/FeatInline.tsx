import { useStaggerFade } from '@/hooks/useStaggerFade';
import Image from 'next/image';

function FeatInline() {
  const containerRef = useStaggerFade({ stagger: 0.4, duration: 1.2 });
  return (
    <section className="h-screen center-col" ref={containerRef}>
      <h2 className="a11y">인라인 랜딩 영역</h2>
      <div className="flex flex-col-reverse md:flex-row gap-19">
        <div className="stagger-item">
          <Image
            src={'/images/landingInline.png'}
            alt="인라인 용어 검색 이미지"
            width={675}
            height={366}
            className="shadow-landing-card rounded-[30px] dark:hidden"
          />
          <Image
            src={'/images/landingInlineDark.png'}
            alt="인라인 용어 검색 이미지"
            width={675}
            height={366}
            className="shadow-landing-card-dark rounded-[30px] hidden dark:block"
          />
        </div>
        <div className="flex flex-col gap-20">
          <div className="stagger-item">
            <h2 className="landing-title dark:bg-background-white dark:text-primary-black w-fit mb-5">
              인라인 용어 해설
            </h2>
            <p className="md:landing-sub text-3xl font-semibold">
              읽다가 모르는 법률 용어,
              <br />
              드래그 한 번이면 끝
            </p>
          </div>
          <div className="landing-content stagger-item">
            <p>
              법령이나 판례 속 낯선 단어를
              <br />
              드래그하면 바로 해설을 볼 수 있어요
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default FeatInline;
