export const parseMarkdown = (text: string) => {
  const lines = text.split('\n');

  return lines.map((line, lineIndex) => {
    // 헤딩 체크 추가
    if (line.startsWith('###')) {
      return (
        <h3 key={lineIndex} className="text-lg font-bold my-2">
          {line.slice(4)}
        </h3>
      );
    }
    if (line.startsWith('##')) {
      return (
        <h2 key={lineIndex} className="text-xl font-bold my-2">
          {line.slice(3)}
        </h2>
      );
    }
    if (line.startsWith('#')) {
      return (
        <h1 key={lineIndex} className="text-2xl font-bold my-2">
          {line.slice(2)}
        </h1>
      );
    }

    // 원본 로직
    const parts = line.split(/(`[^`]+`)/g);

    return (
      <span key={lineIndex}>
        {parts.map((part, i) => {
          // 굵은 글씨
          if (part.includes('**')) {
            const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
            return boldParts.map((bp, j) => {
              if (bp.startsWith('**') && bp.endsWith('**')) {
                return <strong key={`${i}-${j}`}>{bp.slice(2, -2)}</strong>;
              }
              return bp;
            });
          }

          return part;
        })}
        {lineIndex < lines.length - 1 && <br />}
      </span>
    );
  });
};
