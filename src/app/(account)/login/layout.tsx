export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex-1 flex items-center justify-center bg-background-white">
      {children}
    </section>
  );
}
