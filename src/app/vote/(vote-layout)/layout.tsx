import VoteLayoutClient from '@/components/features/vote/VoteLayoutClient';

export const metadata = {
  title: '바로 | 온라인 유저 배심원단',
  description:
    '온라인 배심원단이 되어 다양한 분쟁에 참여하고, 다른 사람들의 고민을 함께 판단해보세요.',
  keywords: ['바로', 'BaLaw', '투표', '배심원단', '법률', '온라인 투표'],
};

export default function VoteLayout({ children }: { children: React.ReactNode }) {
  return <VoteLayoutClient>{children}</VoteLayoutClient>;
}
