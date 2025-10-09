export function mapFilterToLabel<
  T extends Record<string, unknown>, // 필터 객체 타입
  L extends Record<keyof T, string>, // 라벨 객체 타입
>(filter: T, labels: L): Record<L[keyof T], string> {
  return Object.entries(filter)
    .filter(([_, value]) => value != null && value !== '')
    .reduce(
      (acc, [key, value]) => {
        const label = labels[key as keyof T];
        if (label) {
          acc[label] = String(value);
        }
        return acc;
      },
      {} as Record<L[keyof T], string>,
    );
}
