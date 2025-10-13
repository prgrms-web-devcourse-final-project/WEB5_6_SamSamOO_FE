import { useStaggerFade } from '@/hooks/useStaggerFade';
import Image from 'next/image';

function FeatVote() {
  const containerRef = useStaggerFade({ stagger: 0.4, duration: 1.2 });
  return (
    <section className="h-screen center-col" ref={containerRef}>
      <div className="flex md:flex-row flex-col gap-[30px]">
        <div>
          <h2 className="landing-title dark:bg-background-white dark:text-primary-black w-fit mb-5 stagger-item">
            배심원단 투표
          </h2>
          <p className="md:landing-sub text-3xl font-semibold stagger-item">
            다른 사람의 고민,
            <br />
            배심원단이 되어 판단해볼까요?
          </p>
        </div>
        <div className="stagger-item">
          <Image
            src={'/images/landingVote.png'}
            alt="투표 이미지"
            width={640}
            height={664}
            className="shadow-landing-card rounded-[30px] dark:hidden"
          />
          <Image
            src={'/images/landingVoteDark.png'}
            alt="투표 이미지"
            width={640}
            height={664}
            className="shadow-landing-card-dark rounded-[30px] hidden dark:block"
          />
        </div>
      </div>
    </section>
  );
}
export default FeatVote;
