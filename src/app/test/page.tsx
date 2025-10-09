'use client';
import CalendarWithDateInputRange from '@/components/features/search/CalendarWithDateInputRange';
import Pagination from '@/components/features/search/Pagination';
import ScrollButton from '@/components/ui/ScrollButton';
import SelectMenu from '@/components/ui/SelectMenu';
import convertObjectToString from '@/utils/convertObjectToString';

const itemList = [
  { label: '전체' },
  { label: '고용노동부' },
  { label: '과학기술정보통신부' },
  { label: '국가보훈부' },
  { label: '고위공직자범죄수사처' },
  { label: '국방부' },
  { label: '국토교통부' },
  { label: '기획재정부' },
  { label: '전체1' },
  { label: '고용노동부1' },
  { label: '과학기술정보통신부1' },
  { label: '국가보훈부1' },
  { label: '고위공직자범죄수사처1' },
  { label: '국방부1' },
  { label: '국토교통부1' },
  { label: '기획재정부1' },
];

// 배포전에 꼭 지우기
function page() {
  {
    /* 변환 유틸 테스트 */
  }
  convertObjectToString({
    lawField: 'ㄱㄱ',
    authority: 'ㄱ',
    ministry: 'ㄱㄱㄱ',
    promulgationStart: 'ㄱㄱ',
    promulgationEnd: 'ㄱㄱ',
    enforcementStart: 'ㄱㄱㄱ',
    enforcementEnd: 'ㄱㄱㄱ',
  });
  return (
    <div className="px-8 py-2">
      <h2>TEST PAGE</h2>
      {/* 캘린더 테스트 */}
      <CalendarWithDateInputRange />

      {/* 셀렉터 테스트 */}
      <div className="flex gap-5">
        <SelectMenu
          itemList={itemList}
          aria="소관부처 상세"
          triggerStyle="w-[230]"
          // onValueChange={(value) => console.log('선택된 값 : ', value)}
        />
        <SelectMenu
          itemList={itemList}
          aria="소관부처 상세"
          triggerStyle="w-[230]"
          // onValueChange={(value) => console.log('선택된 값 : ', value)}
        />
      </div>

      {/* 헤더 푸터 글꼴 테스트 */}
      <br />
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <li key={index}>
            <p className="font-light">
              상담 법률 고민, 이제 AI 디케에게 바로 물어보세요 다양한 분야의 법과, 생활 속
              궁금증까지 디케가 함께할게요 판례,법령 복잡한 법령과 판례, 보기 쉽게 정리했어요 꼭
              필요한 내용만 깔끔하게 검색과 필터로 원하는 법령과 판례를 빠르게 찾을 수 있어요 용어
              해설 읽다가 모르는 법률 용어, 드래그 한 번이면 끝 판례나 법령 속 낯선 단어를
              드래그하면 바로 해설을 볼 수 있어요 상담 히스토리 내가 한 상담, 자동으로 정리되는
              나만의 기록, 필요할 때 언제든 다시 확인 할 수 있어요 우측 메신저에서 상담 기록을
              확인하고, 이를 바탕으로 판례, 법령을 더 편하게 검색해보세요 배심원단 투표 다른 사람의
              고민, 배심원단이 되어 판단해볼까요? 참여한 투표의 결과로 간단하고 빠르게 여론을
              확인해보세요 다양한 차트로 여러 인사이트를 얻을 수 있어요
            </p>
          </li>
        ))}
      <Pagination />

      <ScrollButton direction="bottom" />
    </div>
  );
}
export default page;
