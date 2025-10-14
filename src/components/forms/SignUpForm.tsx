'use client';

import { useState } from 'react';
import AccountInput from '@/components/features/account/AccountInput';
import AccountButton from '@/components/features/account/AccountButton';
import SelectGender from '@/components/features/account/SelectGender';
import BirthdayInput from '@/components/features/account/BirthdayInput';
import FormErrorMessage from '@/components/features/account/FormErrorMessage';
import calAge from '@/utils/calAge';
import { signUp } from '@/api/account/signUp';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'next/navigation';
import { showSuccessToast } from '@/utils/showToast';

export default function SignupForm() {
  const router = useRouter();
  const setSession = useUserStore((state) => state.setSession);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    gender: '' as '' | 'MALE' | 'FEMALE',
    birthday: '',
    name: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (gender: 'MALE' | 'FEMALE') => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handleBirthdayChange = (birthday: string) => {
    setFormData((prev) => ({ ...prev, birthday }));
  };

  const validateSignup = () => {
    if (!formData.email.trim()) return '이메일을 입력해주세요.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return '유효한 이메일을 입력해주세요.';

    if (!formData.password.trim()) return '비밀번호를 입력해주세요.';
    if (formData.password.length < 4 || formData.password.length > 16) {
      return '비밀번호는 4자 이상 16자 이하로 입력해주세요.';
    }

    if (formData.password !== formData.confirmPassword) {
      return '비밀번호가 일치하지 않습니다.';
    }

    if (!formData.gender) return '성별을 선택해주세요.';

    if (!formData.birthday) return '생년월일을 입력해주세요.';
    const birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthdayRegex.test(formData.birthday)) {
      return '생년월일은 YYYY-MM-DD 형식이어야 합니다.';
    }

    if (!formData.name.trim()) return '이름을 입력해주세요.';

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateSignup();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const age = calAge(formData.birthday); // 추후에 백엔드와 상의 후 제거.

      const payload = {
        email: formData.email,
        password: formData.password,
        age,
        gender: formData.gender as 'MALE' | 'FEMALE',
        name: formData.name,
      };

      const response = await signUp(payload);
      setSession({ isAuthenticated: true, user: response });
      showSuccessToast('환영합니다! 지금부터 서비스를 자유롭게 이용하실 수 있어요.');
      router.replace('/');
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        center-col
        mb-10
        w-full max-w-[420px]
        px-6 sm:px-0
        gap-5 sm:gap-7
      "
    >
      <AccountInput
        name="email"
        type="text"
        placeholder="이메일을 입력해주세요"
        value={formData.email}
        onChange={handleInputChange}
      />
      <AccountInput
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={formData.password}
        onChange={handleInputChange}
      />
      <AccountInput
        name="confirmPassword"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />
      <AccountInput
        name="name"
        type="text"
        placeholder="이름을 입력해주세요"
        value={formData.name}
        onChange={handleInputChange}
      />

      <div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-7">
        <SelectGender
          className="w-full sm:flex-1"
          value={formData.gender || undefined}
          onChange={handleGenderChange}
        />
        <BirthdayInput
          className="w-full sm:flex-1"
          value={formData.birthday}
          onChange={handleBirthdayChange}
        />
      </div>

      <div className="w-full center-col">
        <FormErrorMessage message={error} />
        <AccountButton type="submit" className="w-full">
          회원가입
        </AccountButton>
      </div>
    </form>
  );
}
