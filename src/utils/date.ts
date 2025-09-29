/**
 * 특정 연도와 월의 마지막 날짜(일 수)를 반환합니다.
 *
 * @param {number} year - 연도 (예: 2025)
 * @param {number} month - 월 (1~12)
 * @returns {number} 해당 월의 마지막 날짜 (28~31)
 *
 * @example
 * daysInMonth(2024, 2); // 29 (윤년)
 * daysInMonth(2025, 2); // 28
 */
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/**
 * 숫자를 주어진 범위 내로 강제로 맞춥니다.
 *
 * @param {number} n - 입력 숫자
 * @param {number} lo - 하한값
 * @param {number} hi - 상한값
 * @returns {number} 범위를 벗어나지 않는 값
 *
 * @example
 * clamp(5, 1, 10); // 5
 * clamp(-3, 1, 10); // 1
 * clamp(15, 1, 10); // 10
 */
export function clamp(n: number, lo: number, hi: number): number {
  return Math.min(Math.max(n, lo), hi);
}

/**
 * 숫자 문자열(YYYYMMDD)을 YYYY-MM-DD 형식으로 변환합니다.
 * - 연도는 그대로 사용
 * - 월은 01~12 사이로 보정
 * - 일은 해당 월의 마지막 날을 기준으로 보정
 *
 * @param {string} digits - 숫자 문자열 (예: "20250115")
 * @returns {string} 포맷팅된 날짜 문자열 (예: "2025-01-15")
 *
 * @example
 * formatDate("20250115"); // "2025-01-15"
 * formatDate("20251340"); // "2025-12-31" (보정됨)
 * formatDate("2025");     // "2025"
 */
export function formatDate(digits: string): string {
  digits = digits.slice(0, 8);
  let result = '';

  if (digits.length > 0) {
    result = digits.slice(0, 4);
  }

  if (digits.length > 4) {
    let month = digits.slice(4, 6);
    if (month.length === 2) {
      const monthNum = clamp(parseInt(month, 10), 1, 12);
      month = monthNum.toString().padStart(2, '0');
    }
    result += '-' + month;
  }

  if (digits.length > 6) {
    let day = digits.slice(6, 8);
    if (day.length === 2) {
      const year = parseInt(digits.slice(0, 4), 10);
      const month = parseInt(digits.slice(4, 6), 10);

      if (!isNaN(year) && !isNaN(month) && month >= 1 && month <= 12) {
        const maxDays = daysInMonth(year, month);
        const dayNum = parseInt(day, 10);
        const dayNumClamped = clamp(dayNum, 1, maxDays);
        day = dayNumClamped.toString().padStart(2, '0');
      }
    }
    result += '-' + day;
  }

  return result;
}
