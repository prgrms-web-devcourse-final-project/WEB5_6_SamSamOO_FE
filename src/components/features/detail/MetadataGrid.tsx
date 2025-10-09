import { Metadata } from '@/types/detail';

interface Props {
  metadata: Metadata;
}

function MetadataGrid({ metadata }: Props) {
  return (
    <table className="border grid border-filter-outline2 font-medium rounded-2xl divide-y border-collapse">
      {Object.entries(metadata).map(([key, value], index) => (
        <tbody key={index}>
          <tr className="grid grid-cols-[2fr_3fr] items-center divide-x">
            <td className="px-4 py-2">{key}</td>
            <td className="px-4">{value}</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}
export default MetadataGrid;
