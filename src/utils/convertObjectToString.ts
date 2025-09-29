export default function convertObjectToString(
  items: Record<string, unknown>,
  wordSeparator = ': ',
  pairSeparator = ' > ',
): string {
  const parameter = Object.entries(items)
    .filter(([key, value]) => value != null && value !== '')
    .map((param) => {
      const key = String(param[0]);
      const value = String(param[1]);
      return `${key}${wordSeparator}${value}`;
    });
  const convertString = parameter.join(pairSeparator);
  return convertString;
}
