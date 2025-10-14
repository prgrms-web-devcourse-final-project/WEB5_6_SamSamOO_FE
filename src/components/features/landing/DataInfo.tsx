import DataCountArea from './components/DataCountArea';

function DataInfo() {
  return (
    <section className="min-h-[50vh] center-col text-primary-black dark:text-primary-white bg-[#f4f4f4] dark:bg-background-black1">
      <h2 className="a11y">데이터 정보 섹션</h2>
      <DataCountArea />
    </section>
  );
}
export default DataInfo;
