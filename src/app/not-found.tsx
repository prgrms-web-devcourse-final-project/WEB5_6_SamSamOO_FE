import Image from 'next/image';
import Link from 'next/link';

function NotFound() {
  return (
    <article className="w-full m-auto min-h-[calc(100vh-120px)] center-col">
      <h1 className="a11y">404 - 페이지를 찾을 수 없습니다</h1>
      <section className="max-w-[1200px] w-full py-15 center-col gap-15">
        <div className="center-col">
          <Image
            src={'/images/dikeNotFound.png'}
            alt="404 디케 마스코트 이미지"
            width={250}
            height={250}
            loading="lazy"
          />
          <h2 className="lg:text-5xl md:text-4xl text-3xl font-extrabold text-brand-primary dark:text-brand-accent">
            404 Not Found
          </h2>
        </div>
        <div className="center-col gap-10">
          <div className="center-col text-primary-black dark:text-primary-white lg:text-2xl md:text-xl text-base font-light px-3">
            <p>찾을 수 없는 페이지입니다.</p>
            <p className="break-words">요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요</p>
          </div>
          <div className="px-3 py-1 rounded-xl font-extrabold text-primary-white dark:text-primary-black bg-brand-primary dark:bg-primary-white">
            <Link href={'/'}>홈으로 가기</Link>
          </div>
        </div>
      </section>
    </article>
  );
}
export default NotFound;
