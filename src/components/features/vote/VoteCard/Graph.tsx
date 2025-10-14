'use client';

export default function Graph({
  status,
  children,
}: {
  status: 'ongoing' | 'closed';
  children: React.ReactNode;
}) {
  if (status !== 'closed') return null;

  return <div className="flex flex-col items-center w-full px-2 sm:px-4">{children}</div>;
}
