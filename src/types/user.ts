export interface User {
  memberId: number;
  loginId: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  role: 'USER' | 'ADMIN';
  name: string;
  createdAt: string;
  updatedAt: string;
}
