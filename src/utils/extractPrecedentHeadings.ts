import { TableOfContent } from '@/types/detail';

export default function extractPrecedentHeadings(
  notice: string,
  summaryOfTheJudgment: string,
  precedentContent: string,
) {
  const headings: TableOfContent = [];
  let id = 0;
  const regex = /^\s{0,2}(?:\d+\.|[가-힣]+\.|[가-힣]+\)|\([가-힣]+\)|\d+\)|\(\d+\))\s?/;
  if (notice) headings.push({ id: String(id++), text: '판시사항', level: 1 });
  if (summaryOfTheJudgment) headings.push({ id: String(id++), text: '판결요지', level: 1 });
  if (precedentContent)
    headings.push({ id: String(id++), text: '판례내용', level: 1, children: [] });

  precedentContent.split('<br/>').map((row) => {
    if (row.includes('【') && row[1] !== '주') return '';
    if (row.includes('【') && row[1] === '주')
      headings[headings.length - 1].children?.push({
        id: String(id++),
        text: row.slice(1, row.length - 1),
        level: 2,
      });
    if (regex.test(row) && row.length <= 100)
      headings[headings.length - 1].children?.push({ id: String(id++), text: row, level: 2 });
  });
  return headings;
}
