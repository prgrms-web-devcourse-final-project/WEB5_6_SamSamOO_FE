import PromptInput from '@/components/forms/PromptInput';

function page() {
  return (
    <div className="w-full h-[80vh] sm:justify-center flex flex-col justify-around items-center m-auto gap-40">
      <section className="w-fit text-primary dark:text-accent text-4xl font-bold">
        <h2 className="a11y">AI 상담 환영 글 영역</h2>
        <p>누구나 쉽고 편하게, 디케와 함께 법률 정보를 확인하세요</p>
      </section>
      <article className="w-[80%]">
        <h2 className="a11y">AI 상담 프롬프트 영역</h2>
        <div className="center-col gap-5">
          <p className="text-xs font-light text-primary-black dark:text-primary-white">
            AI가 제공하는 답변은 이해를 돕기 위한 것이며 법적 효력은 없습니다. 중요한 결정은 반드시
            전문가와 상의하세요. 또한, 당사는 본 서비스의 결과 활용에 대해 법적 책임을 지지
            않습니다.
          </p>
          <PromptInput />
        </div>
      </article>
    </div>
  );
}
export default page;
