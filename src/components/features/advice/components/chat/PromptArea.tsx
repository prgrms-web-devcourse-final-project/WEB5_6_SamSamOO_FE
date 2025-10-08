import PromptInput from '@/components/forms/PromptInput';

function PromptArea() {
  return (
    <article className="w-[80%] max-w-[1024px]">
      <h2 className="a11y">AI 상담 프롬프트 영역</h2>
      <div className="center-col gap-5">
        <p className="text-xs font-light text-primary-black dark:text-primary-white">
          AI가 제공하는 답변은 이해를 돕기 위한 것이며 법적 효력은 없습니다. 중요한 결정은 반드시
          전문가와 상의하세요. 또한, 당사는 본 서비스의 결과 활용에 대해 법적 책임을 지지 않습니다.
        </p>
        <PromptInput />
      </div>
    </article>
  );
}
export default PromptArea;
