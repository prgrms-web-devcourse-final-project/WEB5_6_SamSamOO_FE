export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-[calc(100vh-50px-70px)] flex items-center justify-center bg-background-white dark:bg-background-black1">
      {children}
    </section>
  );
}
