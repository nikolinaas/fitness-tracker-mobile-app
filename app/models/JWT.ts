export interface JWTPayload {
  exp: number;
  jti: string;
  sub: string;
}

export const initialJWTPalyload: JWTPayload = {
  exp: 0,
  jti: '',
  sub: '',
};
