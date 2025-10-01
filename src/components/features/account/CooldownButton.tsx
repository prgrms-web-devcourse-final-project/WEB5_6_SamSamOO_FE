'use client';

import { useState, useEffect } from 'react';

interface CooldownButtonProps {
  onClick: () => Promise<void> | void;
  cooldown?: number;
}

export default function CooldownButton({ onClick, cooldown = 30 }: CooldownButtonProps) {
  const [remaining, setRemaining] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setInterval(() => setRemaining((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [remaining]);

  const handleClick = async () => {
    if (loading || remaining > 0) return;

    setLoading(true);
    try {
      await onClick();
      setRemaining(cooldown);
    } catch (err) {
      console.error('쿨다운 버튼 에러:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading || remaining > 0}
      className="h-13 w-full rounded-full bg-brand-primary text-xl text-primary-white font-bold disabled:bg-gray-400 dark:bg-brand-accent"
    >
      {loading ? '발송 중...' : remaining > 0 ? `${remaining}초 후 재발송` : '인증 메일 발송'}
    </button>
  );
}
