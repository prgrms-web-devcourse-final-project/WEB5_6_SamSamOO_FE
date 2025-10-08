import { TableOfContent } from '@/types/detail';
import { LawJangContents } from '@/types/law';

export default function extractLawHeadings(content: LawJangContents[]) {
  /*
  jangList를 toc가 될 항목만 추출할 함수에 넣어서
  리턴값을 toc에 전달해서 렌더링하는 방식?
  jangList의 content, joList의 content가 네비게이션될 대상

  렌더링시 필요한거, id, text, level

  장이 없는경우는 첫 depth의 길이가 1임 그리고 content도 null이다
  */
  const headings: TableOfContent = [];
  let count = 0;

  if (content.length === 1) {
    content.map(({ joList }) =>
      joList.map(({ content }) => {
        if (content.includes('조 삭제')) return '';
        headings.push({
          id: `#${count++}`,
          text: content.slice(0, content.indexOf(')', 0) + 1),
          level: 1,
        });
      }),
    );
  } else {
    content.map(
      (jang) => (
        headings.push({
          id: `#${count++}`,
          text: jang.content,
          level: 1,
          children: [],
        }),
        jang.joList.map(({ content }) => {
          if (content.includes('조 삭제')) return '';
          headings[headings.length - 1].children?.push({
            id: `#${count++}`,
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
// import { TableOfContent } from '@/types/detail';
// import { LawJangContents } from '@/types/law';

// export default function extractLawHeadings(content: LawJangContents[]) {
//   /*
//   jangList를 toc가 될 항목만 추출할 함수에 넣어서
//   리턴값을 toc에 전달해서 렌더링하는 방식?
//   jangList의 content, joList의 content가 네비게이션될 대상

//   렌더링시 필요한거, id, text, level

//   장이 없는경우는 첫 depth의 길이가 1임 그리고 content도 null이다
//   */
//   const headings: TableOfContent = [];
//   let count = 0;

//   if (content.length === 1) {
//     content.map(({ joList }) =>
//       joList.map(({ content }) => {
//         if (content.includes('조 삭제')) return '';
//         headings.push({
//           id: `#${count++}`,
//           text: content.slice(0, content.indexOf(')', 0) + 1),
//           level: 1,
//         });
//       }),
//     );
//   } else {
//     content.map(
//       (jang) => (
//         headings.push({
//           id: `#${count++}`,
//           text: jang.content,
//           level: 1,
//         }),
//         jang.joList.map(({ content }) => {
//           if (content.includes('조 삭제')) return '';
//           headings.push({
//             id: `#${count++}`,
//             text: content.slice(0, content.indexOf(')', 0) + 1),
//             level: 2,
//           });
//         }),
//       ),
//     );
//   }
//   console.log(headings);

//   return headings;
// }
