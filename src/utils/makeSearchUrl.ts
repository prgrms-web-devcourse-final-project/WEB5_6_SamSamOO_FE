import { ReadonlyURLSearchParams } from 'next/navigation';

export default function makeSearchUrl(
  pathname: string,
  params: ReadonlyURLSearchParams,
  updates: Record<string, string | null>,
) {
  const newParams = new URLSearchParams(params.toString());
  Object.entries(updates).forEach(([k, v]) => {
    if (v === null || v === '') newParams.delete(k);
    else newParams.set(k, v);
  });
  return `${pathname}?${newParams.toString()}`;
}
