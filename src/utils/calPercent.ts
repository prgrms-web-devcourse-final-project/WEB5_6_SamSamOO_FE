/**
 * 투표 비율을 계산합니다.
 *
 * @param current 현재 항목의 투표 수
 * @param total 전체 투표 수
 * @returns 소수점 한 자리까지 반올림된 퍼센트 (0~100)
 *
 * @example
 * calculatePercent(30, 120) // 25
 */
export function calPercent(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
}
