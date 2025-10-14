export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-[calc(100dvh-50px-70px)] items-center justify-center overflow-hidden bg-background-white dark:bg-background-black1">
      {children}
    </section>
  );
}
