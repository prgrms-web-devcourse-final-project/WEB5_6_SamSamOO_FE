'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/api/account/login';
import { useUserStore } from '@/store/useUserStore';
import AccountInput from '@/components/features/account/AccountInput';
import AccountButton from '@/components/features/account/AccountButton';
import FormErrorMessage from '@/components/features/account/FormErrorMessage';
import { showErrorToast, showSuccessToast } from '@/utils/showToast';

interface Props {
  params: { message?: string; from?: string };
}

export default function LoginForm({ params }: Props) {
  const router = useRouter();
  const setSession = useUserStore((state) => state.setSession);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.message === 'login-required') {
      showErrorToast('로그인이 필요한 페이지입니다.');
    }
  }, [params.message]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateLogin = () => {
    if (!formData.email.trim()) return '이메일을 입력해주세요.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return '유효한 이메일을 입력해주세요.';
    if (!formData.password.trim()) return '비밀번호를 입력해주세요.';
    if (formData.password.length < 4 || formData.password.length > 16)
      return '비밀번호는 4자 이상 16자 이하로 입력해주세요.';
    return null;
  };

  const submitLoginForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateLogin();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await login(formData);
      setSession({ isAuthenticated: true, user: response });
      showSuccessToast('로그인 성공! 환영합니다♥️');
      console.log('Params.from', params.from);
      if (params.from) {
        router.replace(params.from);
      } else {
        router.replace('/');
      }
    } catch {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <form
      onSubmit={submitLoginForm}
      className="w-full center-col gap-6 sm:gap-8 mb-[24px] sm:mb-[30px]"
    >
      <div className="w-full flex flex-col gap-6">
        <AccountInput
          name="email"
          placeholder="이메일 주소"
          type="text"
          value={formData.email}
          onChange={handleInputChange}
        />
        <AccountInput
          name="password"
          placeholder="비밀번호"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>

      <div className="w-full center-col">
        <FormErrorMessage message={error} />
        <AccountButton type="submit">로그인</AccountButton>
      </div>
    </form>
  );
}
