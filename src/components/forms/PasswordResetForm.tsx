'use client';

import { useState } from 'react';
import AccountInput from '@/components/features/account/AccountInput';
import AccountButton from '@/components/features/account/AccountButton';
import FormErrorMessage from '@/components/features/account/FormErrorMessage';
import { passwordReset } from '@/api/account/passwordResetApi';

interface Props {
  email: string;
  onSuccess: () => void;
}

export default function PasswordResetForm({ email, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.password.trim()) return '비밀번호를 입력해주세요.';
    if (formData.password.length < 4 || formData.password.length > 16) {
      return '비밀번호는 4자 이상 16자 이하로 입력해주세요.';
    }
    if (formData.password !== formData.confirmPassword) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      console.log('메시', email);
      console.log('메시', formData.password);

      const res = await passwordReset({
        email,
        newPassword: formData.password,
        success: true,
      });

      if (res.success) {
        setError(null);
        alert('비밀번호가 성공적으로 재설정되었습니다.');
        onSuccess();
      } else {
        setError('비밀번호 재설정에 실패했습니다.');
      }
    } catch {
      setError('비밀번호 재설정 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <form className="center-col mb-10 w-[420px] gap-7" onSubmit={handleSubmit}>
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

      <div className="w-full center-col">
        <FormErrorMessage message={error} />
        <AccountButton type="submit">비밀번호 재설정</AccountButton>
      </div>
    </form>
  );
}
