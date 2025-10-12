// src/utils/voteTheme.ts

interface GetVoteColorsParams {
  status: 'ongoing' | 'closed';
  index?: number; // 0 = 첫 번째, 1 = 두 번째
  isDarkMode?: boolean;
}

/**
 * 🎨 투표 색상 테마 유틸
 * - 상태(status), 인덱스(index), 다크모드 여부에 따라
 *   ProgressBar 및 그래프 색상을 일관되게 지정
 */
export function getVoteColors({ status, index = 0, isDarkMode = false }: GetVoteColorsParams) {
  const isClosed = status === 'closed';
  const isSecond = index === 1;

  // ✅ 온고잉
  if (!isClosed) {
    return {
      barBg: isDarkMode ? 'bg-brand-accent' : 'bg-brand-primary',
      text: 'text-white dark:text-primary-white',
      outerText: 'text-zinc-900 dark:text-primary-white',
      icon: 'text-primary-white fill-primary-white',
    };
  }

  // ✅ 마감 (첫 번째 선택지)
  if (isClosed && !isSecond) {
    return {
      barBg: isDarkMode ? 'bg-brand-accent' : 'bg-brand-primary',
      text: 'text-white dark:text-primary-white',
      outerText: 'text-zinc-900 dark:text-primary-white',
      icon: 'text-primary-white fill-primary-white',
    };
  }

  // ✅ 마감 (두 번째 선택지)
  return {
    barBg: isDarkMode ? 'bg-[#DBD3D3]' : 'bg-[#AFCFFF]',
    text: isDarkMode ? 'text-primary-black' : 'text-brand-primary',
    outerText: isDarkMode ? 'text-primary-black' : 'text-brand-primary',
    icon: isDarkMode
      ? 'text-primary-black fill-primary-black'
      : 'text-brand-primary fill-brand-primary',
  };
}
