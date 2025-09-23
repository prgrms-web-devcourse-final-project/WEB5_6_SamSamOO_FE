'use client';

import { useTheme } from 'next-themes';

function ToggleThemeButton() {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  return (
    <>
      <button type="button" onClick={() => setTheme('light')}>
        낮
      </button>
      <button type="button" onClick={() => setTheme('dark')}>
        밤
      </button>
    </>
  );
}
export default ToggleThemeButton;
