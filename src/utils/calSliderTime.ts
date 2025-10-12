/**
 * 슬라이더 시간(단위: 시간)을 받아 'X일 Y시간 (Z시간)' 형태의 문자열로 변환합니다.
 *
 * @param hours - 슬라이더 값 (시간 단위)
 * @returns 변환된 표시 문자열
 *
 * @example
 * calSliderTime(100)
 * // "4일 4시간 (100시간)"
 */
export function calSliderTime(hours: number): string {
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  return `${days > 0 ? `${days}일 ` : ''}${remainingHours}시간 (${hours}시간)`;
}
