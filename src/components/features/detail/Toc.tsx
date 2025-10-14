import { TableOfContent } from '@/types/detail';
import tw from '@/utils/tw';
import { useState } from 'react';

function Toc({ toc }: { toc: TableOfContent }) {
  const [target, setTarget] = useState<string>('');

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setTarget(id);
    console.log(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav>
      <ul className="min-w-[290px] md:w-[366px] flex flex-col gap-y-4 md:pl-8 pr-12 text-primary-gray2 dark:text-primary-white">
        {toc.map(({ id, text, children }) => {
          if (children && children.length > 1) {
            return (
              <details key={`${id}${text}`}>
                <summary className="font-medium text-xl pb-4">{text}</summary>
                <p className="flex flex-col gap-2">
                  <a
                    href={id}
                    className={tw('pl-6 text-[18px] ', id === target && 'text-brand-accent')}
                    onClick={(e) => handleScroll(e, id)}
                  >
                    {text}
                  </a>
                  {children?.map(({ id, text }) => (
                    <a
                      href={id}
                      key={`${id}${text}`}
                      className={tw('pl-6 text-[18px]', id === target && 'text-brand-accent')}
                      onClick={(e) => handleScroll(e, id)}
                    >
                      {text}
                    </a>
                  ))}
                </p>
              </details>
            );
          } else
            return (
              <a
                href={id}
                key={`${id}${text}`}
                className={tw('font-medium text-xl pb-4', id === target && 'text-brand-accent')}
                onClick={(e) => handleScroll(e, id)}
              >
                {text}
              </a>
            );
        })}
      </ul>
    </nav>
  );
}
export default Toc;
