import Link from 'next/link';
import LandingArrow from '@/assets/icons/landingArrow.svg';
import Image from 'next/image';
import tw from '@/utils/tw';

function Hero() {
  const INPUT_STYLE =
    'bg-background-white/80 rounded-modal lg:p-3 p-2 dark:bg-background-black1/80';
  const INPUT_BUTTON = 'bg-background-white rounded-[50%] center-col';

  return (
    <section
      className="w-full h-screen center-col text-primary-black dark:text-primary-white"
      aria-label="메인 히어로 섹션"
    >
      <h2 className="a11y">메인 히어로 섹션</h2>
      <div className="center-col gap-[162px]">
        <header className="center-col relative">
          <p className="hidden md:flex lg:text-[64px] md:text-5xl md:font-extrabold font-semibold px-4 text-center">
            혼자 고민하지 말고, 당신 곁에
          </p>
          <p className="md:hidden text-3xl font-extrabold px-4 text-center">혼자 고민하지 말고,</p>
          <p className="md:hidden text-3xl font-extrabold px-4 text-center">당신 곁에</p>
          <div className="lg:text-[40px] md:text-3xl text-2xl md:font-semibold font-medium px-4 text-center">
            <span
              className="bg-brand-primary dark:bg-background-white text-primary-white dark:text-brand-primary px-1"
              aria-label="바로"
            >
              바로
            </span>
            <span>가 언제나 함께 고민해볼게요</span>
          </div>
          <Image
            className="absolute  lg:left-[-300px] lg:top-[-40px] left-[-350px] top-[-90px] dark:drop-shadow-[0_4px_76px_0_rgb(74,74,74)] md:block hidden"
            src={'/images/landingDike.png'}
            alt="마스코트 디케 이미지"
            width={503}
            height={503}
            priority
            quality={75}
            fetchPriority="high"
          />
        </header>
        <div className="max-w-[900px] w-[95%] px-4">
          <Link href={'/advice'} aria-label="법률 상담 시작하기">
            <div
              className={`${INPUT_STYLE} shadow-landing-input-outer w-full mb-[30px] relative dark:shadow-landing-input-outer-dark`}
            >
              <div
                className={tw(`${INPUT_STYLE} shadow-landing-input-inner`, 'dark:bg-[#1f1f1f]/80')}
              >
                <p className="p-1 lg:text-2xl md:text-xl text-base font-light text-primary-gray1 dark:text-gray-400">
                  무엇이 궁금하신가요?
                </p>
              </div>
              <div
                className={tw(
                  `${INPUT_BUTTON} lg:w-[74px] md:w-[58px] w-[42px] lg:h-[74px] md:h-[58px] h-[42px] drop-shadow-[3px_6px_10.9px_rgba(0,0,0,0.25)] dark:drop-shadow-[3px_6px_10.9px_rgba(91,91,91,0.25)] absolute lg:right-[-30px] md:right-[-20px] right-[-10px] md:top-[40px] top-[35px]`,
                  'dark:bg-primary-gray3',
                )}
                aria-hidden="true"
              >
                <div
                  className={tw(
                    `${INPUT_BUTTON} lg:w-15 md:w-11 w-7 lg:h-15 md:h-11 h-7 drop-shadow-[5px_6px_9.7px_rgba(0,0,0,0.25)] dark:drop-shadow-[5px_6px_9.7px_rgba(66,66,66,0.25)]`,
                    'dark:bg-[#0c0c0c]',
                  )}
                >
                  <LandingArrow
                    className="lg:w-[27px] md:w-[20px] w-[18px] lg:h-[27px] md:h-[20px] h-[18px] text-brand-primary dark:text-background-white"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </Link>
          <aside
            className="lg:center-col text-[#575757] dark:text-[#F3F3F3] md:text-base text-sm "
            aria-label="법적 고지사항"
          >
            <div className="lg:block hidden">
              <p>
                AI가 제공하는 답변은 이해를 돕기 위한 것이며 법적 효력은 없습니다. 중요한 결정은
                반드시 전문가와 상의하세요
              </p>
              <p>또한, 당사는 본 서비스의 결과 활용에 대해 법적 책임을 지지 않습니다.</p>
            </div>
            <div className="lg:hidden ">
              <p>
                AI가 제공하는 답변은 이해를 돕기 위한 것이며 법적 효력은 없습니다. 중요한 결정은
                반드시 전문가와 상의하세요 또한, 당사는 본 서비스의 결과 활용에 대해 법적 책임을
                지지 않습니다.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
export default Hero;
