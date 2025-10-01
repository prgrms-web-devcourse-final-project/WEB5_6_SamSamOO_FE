import Image from 'next/image';

function AppliedFilter({ appliedFilterText }: { appliedFilterText: string }) {
  return (
    <div className="px-4 text-brand-accent items-start justify-center flex gap-2 text-sm pb-4 ">
      <Image src="/icons/filter.png" width={20} height={20} alt="필터" />
      <p>{appliedFilterText}</p>
    </div>
  );
}
export default AppliedFilter;
