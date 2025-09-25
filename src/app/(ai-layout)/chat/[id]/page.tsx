import PromptInput from '@/components/forms/PromptInput';

import UserMessage from '@/components/features/advice/components/UserMessage';
import AIMessage from '@/components/features/advice/components/AIMessage';

function page() {
  return (
    <div className="h-[80vh] w-full center-col gap-6 p-5">
      <div className="w-full center-row overflow-y-auto">
        <div className="flex h-[50vh] flex-col items-end">
          <UserMessage />
          <AIMessage />
        </div>
      </div>
      <article className="sm:w-[80%] w-full">
        <h2 className="a11y">AI 상담 프롬프트 영역</h2>
        <div className="center-col gap-5 p-1">
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
