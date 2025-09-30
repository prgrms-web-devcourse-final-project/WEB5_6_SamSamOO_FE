import { User } from '@/types/User';

export async function fetchUser(cookieString: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${apiUrl}/api/auth/me`, {
      headers: {
        Cookie: cookieString,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch user: ${res.status}`);
    }

    const data: User = await res.json();
    return data;
  } catch (err) {
    console.error('Fetch error:', err);
    return null;
  }
}
