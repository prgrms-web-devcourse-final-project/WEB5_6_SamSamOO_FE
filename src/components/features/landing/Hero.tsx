import Link from 'next/link';
import LadingArrow from '@/assets/icons/landingArrow.svg';
import Image from 'next/image';
import tw from '@/utils/tw';

function Hero() {
  const INPUT_STYLE = 'bg-background-white/80 rounded-modal p-3 dark:bg-background-black1/80';
  const INPUT_BUTTON = 'bg-background-white rounded-[50%] center-col';

  return (
    <section
      className="w-full h-screen center-col text-primary-black dark:text-primary-white"
      aria-label="메인 히어로 섹션"
    >
      <h2 className="a11y">메인 히어로 섹션</h2>
      <div className="flex flex-col gap-[162px]">
        <header className="center-col relative">
          <p className="md:text-[64px] text-5xl font-extrabold">혼자 고민하지 말고, 당신 곁에</p>
          <div className="flex md:text-[40px] text-3xl font-semibold">
            <span
              className="bg-brand-primary dark:bg-background-white text-primary-white dark:text-brand-primary px-1"
              aria-label="바로"
            >
              바로
            </span>
            <p>가 언제나 함께 고민해볼게요</p>
          </div>
          <Image
            className="absolute left-[-300px] top-[-40] dark:drop-shadow-[0_4px_76px_0_rgb(74,74,74)] md:block hidden"
            src={'/images/landingDike.png'}
            alt="마스코트 디케 이미지"
            width={503}
            height={503}
            priority
          />
        </header>
        <div className="max-w-[900px]">
          <Link href={'/advice'} aria-label="법률 상담 시작하기">
            <div
              className={`${INPUT_STYLE} shadow-landing-input-outer w-full mb-[30px] relative dark:shadow-landing-input-outer-dark`}
            >
              <div
                className={tw(`${INPUT_STYLE} shadow-landing-input-inner`, 'dark:bg-[#1f1f1f]/80')}
              >
                <p className="p-1 md:text-2xl text-xl font-light text-primary-gray1 dark:text-gray-400">
                  무엇이 궁금하신가요?
                </p>
              </div>
              <div
                className={tw(
                  `${INPUT_BUTTON} md:w-[74px] w-[60px] md:h-[74px] h-[60px] drop-shadow-[3px_6px_10.9px_rgba(0,0,0,0.25)] dark:drop-shadow-[3px_6px_10.9px_rgba(91,91,91,0.25)] absolute md:right-[-30px] right-[-20px] top-[40px]`,
                  'dark:bg-primary-gray3',
                )}
                aria-hidden="true"
              >
                <div
                  className={tw(
                    `${INPUT_BUTTON} md:w-[60px] w-[46px] md:h-[60px] h-[46px] drop-shadow-[5px_6px_9.7px_rgba(0,0,0,0.25)] dark:drop-shadow-[5px_6px_9.7px_rgba(66,66,66,0.25)]`,
                    'dark:bg-[#0c0c0c]',
                  )}
                >
                  <LadingArrow
                    className="md:w-[27px] w-[20px] md:h-[27px] h-[20px] text-brand-primary dark:text-background-white"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </Link>
          <aside
            className="center-col text-[#575757] dark:text-[#F3F3F3] md:text-base text-sm"
            aria-label="법적 고지사항"
          >
            <p>
              AI가 제공하는 답변은 이해를 돕기 위한 것이며 법적 효력은 없습니다. 중요한 결정은
              반드시 전문가와 상의하세요
            </p>
            <p>또한, 당사는 본 서비스의 결과 활용에 대해 법적 책임을 지지 않습니다.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
export default Hero;
