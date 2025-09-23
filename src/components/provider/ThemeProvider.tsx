'use client';
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" {...props}>
      {children}
    </NextThemesProvider>
  );
}
export default ThemeProvider;
