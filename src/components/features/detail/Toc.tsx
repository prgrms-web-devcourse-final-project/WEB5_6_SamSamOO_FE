import { TableOfContent } from '@/types/detail';

function Toc({ toc }: { toc: TableOfContent }) {
  console.log(toc);
  return (
    <nav>
      <ul className="min-w-[366px] w-full flex flex-col gap-y-4">
        {toc.map(({ id, text, children }) => {
          if (children && children.length > 1) {
            return (
              <details key={`${id}${text}`}>
                <summary className="font-medium text-xl pb-4">{text}</summary>
                <p className="flex flex-col gap-2">
                  <a href={id} className="pl-6 text-[18px]">
                    {text}
                  </a>
                  {children?.map(({ id, text }) => (
                    <a href={id} key={`${id}${text}`} className="pl-6 text-[18px]">
                      {text}
                    </a>
                  ))}
                </p>
              </details>
            );
          } else
            return (
              <a href={id} key={`${id}${text}`} className="font-medium text-xl pb-4">
                {text}
              </a>
            );
        })}
      </ul>
    </nav>
  );
}
export default Toc;

// function TocRegacy({ toc }: { toc: TableOfContent }) {
//   console.log(toc);
//   return (
//     <nav>
//       <ul className="w-full flex flex-col gap-y-4">
//         {toc.map(({ id, text, level }) => (
//           <a
//             href={id}
//             key={`${id}${text}`}
//             className={tw(level === 1 ? 'font-medium text-2xl' : 'pl-4 text-xl')}
//           >
//             {text}
//           </a>
//         ))}
//       </ul>
//     </nav>
//   );
// }
