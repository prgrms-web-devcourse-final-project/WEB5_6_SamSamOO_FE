import VoteCard from '@/components/features/vote/VoteCard';

function Page() {
  return (
    <div className="center-col gap-15">
      {/* 1️⃣ 임대료 인상 거부 후 퇴거 요구 */}
      <VoteCard
        category="임대차 분쟁"
        participants={810}
        remainingTime="2일 4시간 32분 남음"
        status="ongoing"
        title="임대차 계약 중 월세 인상 거부 시 퇴거 요구의 정당성"
        content="임대인이 계약 기간 중 일방적으로 월세를 30% 인상하겠다고 통보하자, 임차인은 법적으로 정해진 상한(5%)을 초과한 인상이라며 이를 거부했습니다. 이에 임대인은 계약 해지를 통보하며 퇴거를 요구했습니다. 그러나 임대차보호법 제6조는 임대료 증액을 ‘계약 갱신 시점’에 한정하고 있으며, 임차인의 거부를 이유로 한 해지는 정당하지 않다는 의견도 있습니다. 임대인의 조치가 법적으로 타당할까요?"
        options={[
          { label: '임대인의 행위가 정당하다.', isSelected: true, currentVotes: 182 },
          { label: '임차인의 권리가 침해되었다.', isSelected: false, currentVotes: 630 },
        ]}
      />

      {/* 2️⃣ 보증금 반환 지연 */}
      <VoteCard
        category="보증금 분쟁"
        participants={540}
        remainingTime="1일 8시간 12분 남음"
        status="ongoing"
        title="계약 만료 후 보증금 반환 지연, 임대인의 책임인가?"
        content="계약이 만료된 후에도 임대인이 보증금을 돌려주지 않아 임차인이 생활비를 마련하지 못하는 상황이 이어지고 있습니다. 임대인은 ‘시설 복구비와 관리비 미정산’을 이유로 반환을 미루고 있으나, 법원은 통상적으로 보증금 반환의무를 우선으로 본다는 입장입니다. 다만, 실제 손해가 발생했다면 상계할 수도 있다는 의견도 제기됩니다. 이 경우 임대인의 보증금 보류는 정당할까요?"
        options={[
          { label: '정산 완료 후 반환이 정당하다.', isSelected: false, currentVotes: 211 },
          { label: '보증금은 즉시 반환되어야 한다.', isSelected: true, currentVotes: 329 },
        ]}
      />

      {/* 3️⃣ 계약 해지 위약금 과다 청구 */}
      <VoteCard
        category="계약 해지 분쟁"
        participants={1240}
        remainingTime="마감"
        status="closed"
        title="계약 중도 해지 시 과도한 위약금, 적법한가?"
        content="소비자가 헬스장 1년 회원권을 3개월만 이용하고 중도 해지를 요청하자, 업주는 계약금의 70%를 위약금으로 청구했습니다. 업주는 ‘장기 할인 혜택을 받은 만큼 손실이 크다’고 주장하지만, 공정거래위원회 표준약관은 이용 기간에 따라 합리적인 위약금 비율을 명시하고 있습니다. 소비자의 해지 요구를 제한하는 이 조항은 부당한 약관일까요?"
        options={[
          { label: '계약 조항상 위약금은 정당하다.', isSelected: false, currentVotes: 520 },
          { label: '과도한 위약금으로 부당하다.', isSelected: true, currentVotes: 720 },
        ]}
      />

      {/* 4️⃣ 시설 수리비 부담 */}
      <VoteCard
        category="시설 유지 분쟁"
        participants={390}
        remainingTime="3일 2시간 18분 남음"
        status="ongoing"
        title="임대차 중 수도관 파손, 수리비 부담 주체는 누구인가?"
        content="임차인이 거주 중 수도관이 터져 누수가 발생했습니다. 임대인은 ‘입주자가 세게 물을 틀어 손상시킨 것’이라 주장하며 수리비를 요구했고, 임차인은 ‘노후 배관으로 인한 자연 파손’이라며 책임이 없다고 맞서고 있습니다. 민법 제623조에 따르면 임대인은 사용·수익에 필요한 상태를 유지할 의무가 있지만, 임차인의 과실이 있다면 책임이 달라질 수 있습니다. 수리비는 누가 부담해야 할까요?"
        options={[
          { label: '임차인의 관리 소홀 책임이다.', isSelected: false, currentVotes: 121 },
          { label: '시설 노후로 인한 임대인의 책임이다.', isSelected: true, currentVotes: 269 },
        ]}
      />

      {/* 5️⃣ 계약 갱신 거부 통보 */}
      <VoteCard
        category="계약 갱신 분쟁"
        participants={975}
        remainingTime="5시간 41분 남음"
        status="ongoing"
        title="임대인의 계약 갱신 거부 통보, 적법한가?"
        content="임대차 계약 만료 두 달 전, 임대인이 ‘직접 입주 예정’을 사유로 갱신 거부 의사를 통보했습니다. 임차인은 갱신 요구권을 행사했지만, 임대인은 가족의 실거주 필요성을 내세우고 있습니다. 주택임대차보호법 제6조의3에 따르면 실거주 목적이 명확한 경우 갱신 거부가 가능하지만, 이를 악용한 사례도 적지 않습니다. 이번 경우, 임대인의 통보는 정당할까요?"
        options={[
          { label: '임대인의 직접 입주는 정당한 사유다.', isSelected: true, currentVotes: 540 },
          {
            label: '임차인의 거주권이 우선 보호되어야 한다.',
            isSelected: false,
            currentVotes: 435,
          },
        ]}
      />
    </div>
  );
}
export default Page;
