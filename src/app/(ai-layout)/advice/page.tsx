import PromptArea from '@/components/features/advice/components/chat/PromptArea';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '바로 | AI 상담',
  description: '바로 BaLaw AI 상담 페이지입니다',
  robots: { index: false, follow: false },
};

function page() {
  return (
    <div className="w-full h-[80vh] flex flex-col justify-around lg:justify-center items-center gap-40">
      <section className="md:w-fit w-[80%] max-w-[1024px] md:px-14 text-center md:leading-14 text-brand-primary dark:text-brand-accent md:text-4xl text-2xl font-bold">
        <h2 className="a11y">AI 상담 환영 글 영역</h2>
        <p className="break-words">누구나 쉽고 편하게, 디케와 함께 법률 정보를 확인하세요</p>
      </section>
      <PromptArea />
    </div>
  );
}
export default page;
