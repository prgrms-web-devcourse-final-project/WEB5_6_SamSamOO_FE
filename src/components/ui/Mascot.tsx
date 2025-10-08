import Image from 'next/image';
import dike from '@/assets/images/dike.png';

function Mascot() {
  return (
    <div className="center-row w-fit gap-1">
      <div className="w-9 h-9 bg-[#DBDBDB] dark:bg-[#1F1F1F] rounded-sm center-row">
        <Image src={dike} width={24} height={24} alt="마스코트 디케 이미지" />
      </div>
      <span className="font-semibold">디케</span>
    </div>
  );
}
export default Mascot;
