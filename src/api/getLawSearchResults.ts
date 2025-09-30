import { LawRequest, LawResponse } from '@/types/law';
import api from './axiosInstance';

export const getLawSearchResults = async (body: LawRequest) => {
  try {
    const response = await api.post<LawResponse>('/api/law/search', {
      ...body,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// export const getLawSearchResults = async (body: LawRequest) => {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/law/search`, {
//       method: 'POST',
//       cache: 'no-cache',
//       body: JSON.stringify(body),
//     });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };
