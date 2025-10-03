// types/auth.ts
export interface JwtPayload {
  nameid: string;
  email: string;
  role: string;
  balance?: string | number; // souvent string dans les claims
  exp: number;
  iat: number;
}

