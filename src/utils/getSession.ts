import 'server-only';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { jwtVerify, type JWTPayload } from 'jose';
import {
  JWSSignatureVerificationFailed,
  JWTClaimValidationFailed,
  JWTExpired,
  JWTInvalid,
} from 'jose/errors';
import { SessionSnapshot } from '@/types/session';

const UNVERIFIED_SESSION: SessionSnapshot = {
  isAuthenticated: false,
  user: null,
};

interface JoseErrorLike extends Error {
  code?: string;
}

function hasJoseErrorCode(error: unknown, ...codes: string[]): error is JoseErrorLike {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const candidate = error as JoseErrorLike;
  return typeof candidate.code === 'string' && codes.includes(candidate.code);
}

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
        if (
          error instanceof JWSSignatureVerificationFailed ||
          hasJoseErrorCode(error, 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED')
        ) {
          continue;
        }

        if (
          error instanceof JWTExpired ||
          error instanceof JWTInvalid ||
          error instanceof JWTClaimValidationFailed ||
          hasJoseErrorCode(
            error,
            'ERR_JWT_EXPIRED',
            'ERR_JWT_INVALID',
            'ERR_JWT_CLAIM_VALIDATION_FAILED',
          )
        ) {
          const message = error instanceof Error ? error.message : 'Unknown JWT verification error';
          console.warn('[getSession] JWT verification rejected token:', message);
          return UNVERIFIED_SESSION;
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
