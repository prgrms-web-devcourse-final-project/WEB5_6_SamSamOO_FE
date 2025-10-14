import { TableOfContent } from '@/types/detail';
import { LawJangContents } from '@/types/law';

export default function extractLawHeadings(content: LawJangContents[]) {
  const headings: TableOfContent = [];
  let count = 0;

  if (content.length === 1) {
    content.map(({ joList }) =>
      joList.map(({ content }) => {
        if (content.includes('조 삭제')) return '';
        headings.push({
          id: String(count++),
          text: content.slice(0, content.indexOf(')', 0) + 1),
          level: 1,
        });
      }),
    );
  } else {
    content.map(
      (jang) => (
        headings.push({
          id: String(count++),
          text: jang.content,
          level: 1,
          children: [],
        }),
        jang.joList.map(({ content }) => {
          if (content.includes('조 삭제')) return '';
          headings[headings.length - 1].children?.push({
            id: String(count++),
            text: content.slice(0, content.indexOf(')', 0) + 1),
            level: 2,
          });
        })
      ),
    );
  }
  // console.log(headings);

  return headings;
}
