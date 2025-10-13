import { useMounted } from '@/hooks/useMounted';
import { useStaggerFade } from '@/hooks/useStaggerFade';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function FeatAdvice() {
  const containerRef = useStaggerFade({ stagger: 0.5, duration: 1 });
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return null;

  const imageSrc =
    resolvedTheme === 'dark' ? '/images/ladingAdviceDark.png' : '/images/ladingAdvice.png';
  return (
    <section className="h-screen center-col" ref={containerRef}>
      <h2 className="a11y">AI 상담</h2>
      <div className="flex flex-col gap-8 font-bold w-[70%]">
        <header className="flex flex-col gap-8 stagger-item">
          <span
            className="landing-title dark:bg-background-white dark:text-primary-black w-fit"
            role="text"
            aria-label="AI 상담 기능"
          >
            AI 상담
          </span>
          <div className="md:text-4xl text-2xl">
            <p>어떻게 시작해야할지 막막한가요?</p>
            <p>디케와 함께하는 AI 상담으로</p>
          </div>
        </header>
        <figure className="stagger-item">
          <Image
            src={imageSrc}
            alt="바로 AI 상담 화면 - 법률 질문 입력 및 AI 디케의 답변 예시"
            width={1000}
            height={492}
            className="rounded-[30px] shadow-landing-card dark:shadow-landing-card-dark w-full h-auto"
            loading="lazy"
          />

          <figcaption className="sr-only">
            AI 상담 서비스 인터페이스 스크린샷. 사용자가 법률 질문을 입력하면 AI 어시스턴트 디케가
            관련 법령과 판례를 기반으로 답변을 제공합니다.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
export default FeatAdvice;
