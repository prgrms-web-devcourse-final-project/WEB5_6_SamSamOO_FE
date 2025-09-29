interface Props {
  fileName: string;
  label: string;
  alt?: string;
  onClick: () => void;
}

function IconButton({ fileName, label, alt, onClick }: Props) {
  return (
    <li className="group w-16 h-18 hover:bg-primary hover:text-primary-white dark:hover:bg-accent text-primary-black dark:text-primary-white rounded-lg">
      <button
        className="flex flex-col justify-around items-center w-full h-full text-sm"
        onClick={onClick}
      >
        <div className="relative w-6 h-6">
          {/* 기본 아이콘들 */}
          <img
            src={`/icons/${fileName}Light.svg`}
            className="absolute inset-0 dark:hidden group-hover:opacity-0 transition-opacity duration-200"
            alt={`${alt} 아이콘`}
          />
          <img
            src={`/icons/${fileName}Dark.svg`}
            className="absolute inset-0 hidden dark:block group-hover:opacity-0 transition-opacity duration-200"
            alt={`${alt} 아이콘`}
          />
          {/* 호버 시 보여질 아이콘 */}
          <img
            src={`/icons/${fileName}Active.svg`}
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            alt={`${alt} 아이콘 활성`}
          />
        </div>
        <span>{label}</span>
      </button>
    </li>
  );
}
export default IconButton;
