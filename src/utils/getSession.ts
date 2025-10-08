import 'server-only';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { jwtVerify, type JWTPayload } from 'jose';
import { SessionSnapshot } from '@/types/session';

const UNVERIFIED_SESSION: SessionSnapshot = {
  isAuthenticated: false,
  user: null,
};

function createSecretCandidates(rawSecret: string): Uint8Array[] {
  const trimmed = rawSecret.trim();
  const candidates: Uint8Array[] = [];

  if (/^[A-Za-z0-9+/]+={0,2}$/.test(trimmed)) {
    const decoded = Buffer.from(trimmed, 'base64');
    if (decoded.length > 0) {
      candidates.push(new Uint8Array(decoded));
    }
  }

  candidates.push(new TextEncoder().encode(trimmed));

  return candidates;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function extractUserFromPayload(_payload: JWTPayload) {
  return null;
}

export const getSession = cache(async (): Promise<SessionSnapshot> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');

  if (!accessToken) {
    return UNVERIFIED_SESSION;
  }

  const rawSecret =
    process.env.AUTH_JWT_SECRET ??
    process.env.NEXT_PUBLIC_AUTH_JWT_SECRET ??
    process.env.JWT_SECRET ??
    '';

  if (!rawSecret) {
    console.warn('[getSession] Missing AUTH_JWT_SECRET. Treating as unauthenticated.');
    return UNVERIFIED_SESSION;
  }

  try {
    const secretCandidates = createSecretCandidates(rawSecret);
    let payload: JWTPayload | null = null;

    for (const secretKey of secretCandidates) {
      try {
        const verified = await jwtVerify(accessToken.value, secretKey, {
          algorithms: ['HS256'],
        });
        payload = verified.payload;
        break;
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'JWSSignatureVerificationFailed') {
            continue;
          }

          if (
            error.name === 'JWTExpired' ||
            error.name === 'JWTInvalid' ||
            error.name === 'JWTClaimValidationFailed'
          ) {
            console.warn('[getSession] JWT verification rejected token:', error.message);
            return UNVERIFIED_SESSION;
          }
        }

        throw error;
      }
    }

    if (!payload) {
      return UNVERIFIED_SESSION;
    }

    return {
      isAuthenticated: true,
      user: extractUserFromPayload(payload),
    };
  } catch (error) {
    console.warn('[getSession] JWT verification failed:', error);
    return UNVERIFIED_SESSION;
  }
});
