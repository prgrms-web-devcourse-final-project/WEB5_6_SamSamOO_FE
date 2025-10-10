import { TableOfContent } from '@/types/detail';
import tw from '@/utils/tw';
import { useState } from 'react';

function Toc({ toc }: { toc: TableOfContent }) {
  const [target, setTarget] = useState<string>('');

  return (
    <nav>
      <ul className="min-w-[290px] sm:w-[366px] flex flex-col gap-y-4 px-8">
        {toc.map(({ id, text, children }) => {
          if (children && children.length > 1) {
            return (
              <details key={`${id}${text}`}>
                <summary className="font-medium text-xl pb-4">{text}</summary>
                <p className="flex flex-col gap-2">
                  <a
                    href={id}
                    className={tw('pl-6 text-[18px] ', id === target && 'text-brand-accent')}
                    onClick={() => setTarget(id)}
                  >
                    {text}
                  </a>
                  {children?.map(({ id, text }) => (
                    <a
                      href={id}
                      key={`${id}${text}`}
                      className={tw('pl-6 text-[18px]', id === target && 'text-brand-accent')}
                      onClick={() => setTarget(id)}
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
                onClick={() => setTarget(id)}
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
