import api from './axiosInstance';
import { PrecedentRequest, PrecedentResponse } from '@/types/precedent';

export const getPrecedentSearchResults = async (body: PrecedentRequest) => {
  try {
    const response = await api.post<PrecedentResponse>('/api/precedent/search', {
      ...body,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
