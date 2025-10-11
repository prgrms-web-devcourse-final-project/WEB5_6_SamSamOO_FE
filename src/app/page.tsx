import Link from 'next/link';
import LadingArrow from '@/assets/icons/landingArrow.svg';
import Image from 'next/image';
export default function Home() {
  return (
    <div>
      <section className="h-screen center-col text-primary-black">
        <div className="flex flex-col gap-[162px]">
          <div className="center-col relative">
            <p className="text-[64px] font-extrabold">혼자 고민하지 말고, 당신 곁에</p>
            <div className="flex text-[40px] font-bold">
              <span className="bg-brand-primary text-primary-white px-1">바로</span>
              <p>가 언제나 함께 고민해볼게요</p>
            </div>
            <Image
              className="absolute left-[-300px] top-[-40] z-[-999]"
              src={'/images/landingDike.png'}
              alt="마스코트 디케 이미지"
              width={503}
              height={503}
            />
          </div>
          <div>
            <Link href={'/advice'}>
              <div className="bg-background-white/80 rounded-modal  p-3 shadow-landing-input-outer w-[900px] mb-[10px] relative">
                <div className="bg-background-white/80 rounded-modal  p-3  shadow-landing-input-inner">
                  <p className="p-2 text-3xl font-light ">마스코트 이름이 무엇인가요?</p>
                </div>
                <div className="bg-background-white rounded-[50%] w-[74px] h-[74px] center-col drop-shadow-[3px_6px_10.9px_rgba(0,0,0,0.25)] absolute right-[-34px] top-[60px]">
                  <div className="bg-background-white rounded-[50%] w-[60px] h-[60px] center-col drop-shadow-[5px_6px_9.7px_rgba(0,0,0,0.25)]">
                    <LadingArrow className="w-[27px] h-[27px] text-brand-primary" />
                  </div>
                </div>
              </div>
            </Link>
            <div className="center-col">
              <p className="text-[#575757]">
                AI가 제공하는 답변은 이해를 돕기 위한 것이며 법적 효력은 없습니다. 중요한 결정은
                반드시 전문가와 상의하세요
              </p>
              <p className="text-[#575757]">
                또한, 당사는 본 서비스의 결과 활용에 대해 법적 책임을 지지 않습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="h-[50vh] center-col text-primary-black bg-[#f4f4f4]">
        <div className="center-row gap-15 bg-background-white shadow-landing-1 rounded-[30px] w-[1200px] h-[200px]">
          <div className="center-row gap-3">
            <Image
              src={'/images/dataRate.png'}
              width={60}
              height={69}
              alt="전체 데이터 갯수 아이콘"
            />
            <div>
              <p className="text-3xl font-bold">25,254,925</p>
              <p className="text-[20px] font-semibold">전체 데이터 갯수</p>
            </div>
          </div>
          <div className="center-row gap-3">
            <Image
              src={'/images/wordRate.png'}
              width={60}
              height={69}
              alt="법률 용어 갯수 아이콘"
            />
            <div>
              <p className="text-3xl font-bold">354,231</p>
              <p className="text-[20px] font-semibold">법률 용어 갯수</p>
            </div>
          </div>
          <div className="center-row gap-3">
            <Image
              src={'/images/lawRate.png'}
              width={60}
              height={69}
              alt="법령 및 판례 갯수 아이콘"
            />
            <div>
              <p className="text-3xl font-bold">12,354,231</p>
              <p className="text-[20px] font-semibold">법령 및 판례 갯수</p>
            </div>
          </div>
          <div className="center-row gap-3">
            <Image
              src={'/images/voteRate.png'}
              width={60}
              height={69}
              alt="열린 투표 갯수 아이콘"
            />
            <div>
              <p className="text-3xl font-bold">254</p>
              <p className="text-[20px] font-semibold">열린 투표 갯수</p>
            </div>
          </div>
        </div>
      </section>
      <section className="h-screen center-col">
        <div className="flex flex-col gap-8 font-bold">
          <span className="text-primary-white bg-brand-primary text-4xl w-fit p-2">AI 상담</span>
          <div className="text-4xl">
            <p>어떻게 시작해야할지 막막한가요?</p>
            <p>디케와 함께하는 AI 상담으로</p>
          </div>
          <Image
            src={'/images/ladingAdvice.png'}
            alt="AI 상담 이미지"
            width={1000}
            height={560}
            className="rounded-[30px] shadow-landing-card"
          />
        </div>
      </section>
      <section className="h-screen center-col">
        <div className="flex gap-6 text-[28px] font-semibold">
          <div>
            <p>
              법률 고민, <br />
              이제 AI 디케에게 바로 물어보세요 <br />
              다양한 분야의 법과, 생활 속 궁금증까지
              <br />
              디케가 함께할게요
            </p>
          </div>
          <div>
            <Image
              src={'/images/landingChat.png'}
              alt="상담 내역 이미지"
              width={694}
              height={505}
              className="rounded-[30px] shadow-landing-card"
            />
          </div>
        </div>
      </section>
      <section className="h-screen center-col">
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="text-4xl font-extrabold text-primary-white bg-brand-primary p-2 w-fit">
              상담 히스토리
            </h2>
          </div>
          <div className="flex gap-13">
            <div className="text-[44px] font-bold flex">
              <p>
                내가 한 상담,
                <br />
                자동으로 정리되는
                <br />
                나만의 기록
              </p>
            </div>
            <div>
              <Image
                src={'/images/ladingChatbot.png'}
                alt="챗팅 모달 이미지"
                width={360}
                height={800}
                className="shadow-landing-card rounded-[30px]"
              />
            </div>
            <div className="text-[28px] font-semibold center-col">
              <p>
                필요할 때, 언제든 다시 확인할 수 있어요
                <br />
                메신저에서 상담 기록을 확인하고,
                <br />
                이를 바탕으로 법령과 판례를
                <br />더 편하게 검색해보세요
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="h-screen center-col">
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="text-4xl font-extrabold text-primary-white bg-brand-primary p-2 w-fit">
              법령 판례 검색
            </h2>
          </div>
          <div className="flex gap-7">
            <div className="text-[44px] font-bold">
              <p>
                복잡한 법령과 판례, <br />
                보기 쉽게 정리했어요
              </p>
            </div>
            <div>
              <Image
                src={'/images/landingDetail.png'}
                alt={'검색 상세 페이지 이미지'}
                width={806}
                height={530}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="h-screen center-col">
        <div className="flex gap-20">
          <div>
            <Image
              src={'/images/landingFilter.png'}
              alt="필터 모달 이미지"
              width={644}
              height={700}
            />
          </div>
          <div className="text-[28px] font-semibold">
            <p>
              꼭 필요한 내용만 깔끔하게
              <br />
              검색과 필터로 원하는 법령과 판례를
              <br />
              빠르게 찾을 수 있어요
            </p>
          </div>
        </div>
      </section>
      <section className="h-screen center-col">
        <div className="flex gap-19">
          <div>
            <Image
              src={'/images/landingInline.png'}
              alt="인라인 용어 검색 이미지"
              width={681}
              height={629}
            />
          </div>
          <div className="flex flex-col gap-42">
            <div>
              <h2 className="text-4xl font-extrabold text-primary-white bg-brand-primary p-2 w-fit mb-5">
                인라인 용어 해설
              </h2>
              <p className="text-[44px] font-bold">
                읽다가 모르는 법률 용어,
                <br />
                드래그 한 번이면 끝
              </p>
            </div>
            <div className="text-[28px] font-semibold">
              <p>
                법령이나 판례 속 낯선 단어를
                <br />
                드래그하면 바로 해설을 볼 수 있어요
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="h-screen center-col">
        <div className="flex gap-[30px]">
          <div>
            <h2 className="text-4xl font-extrabold text-primary-white bg-brand-primary p-2 w-fit mb-5">
              배심원단 투표
            </h2>
            <p className="text-[44px] font-bold">
              다른 사람의 고민,
              <br />
              배심원단이 되어 판단해볼까요?
            </p>
          </div>
          <div>
            <Image src={'/images/landingVote.png'} alt="투표 이미지" width={640} height={653} />
          </div>
        </div>
      </section>
      <section className="center-col gap-78">
        <div className="flex gap-24">
          <div>
            <Image
              src={'/images/landingVoteDt.png'}
              alt="투표 상세 이미지"
              width={613}
              height={798}
            />
          </div>
          <div className="center-col">
            <p className="text-[28px] font-semibold">
              참여한 투표의 결과를 통해,
              <br />
              간단하고 빠르게 반응을 확인해보세요
              <br />
              다양한 차트로 여러 인사이트를 얻을 수 있어요
            </p>
          </div>
        </div>
        <div className="center-col mb-50">
          <p className="text-[44px] font-extrabold">본 서비스는 참고용 법률 정보만을 제공합니다.</p>
          <p className="text-4xl font-medium">
            법적 효력이나 책임은 없으며, 구체적인 사안은 반드시 전문가와 상담하시기 바랍니다.
          </p>
        </div>
      </section>
    </div>
  );
}
