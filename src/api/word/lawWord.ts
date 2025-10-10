import api from '@/api/axiosInstance';

export async function getLawWordDefinition(word: string) {
  try {
    const res = await api.get(`/api/law-word/v2/${word}`);
    return res.data;
  } catch (err) {
    console.log(err, '용어 검색 실패.');
    return null;
  }
}

export async function getWordDefinition(word: string) {
  try {
    const res = await api.get(`/api/law-word/v1/${word}`);
    return res.data;
  } catch (err) {
    console.log(err, '용어 검색 실패.');
    return null;
  }
}
