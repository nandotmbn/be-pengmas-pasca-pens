/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';

function extractToken(token: string | undefined, isId: boolean) {
  if (!token) {
    return { error: isId ? 'Token tidak ada!' : "Token doesn't exist!" };
  }
  if (token?.startsWith('Bearer ')) {
    try {
      token = token?.substring(7, token?.length);
      dotEnv.config();
      const result: any = jwt.verify(token!, process.env.JWTPRIVATEKEY!) as any;
      return { result };
    } catch (error) {
      return { error: isId ? 'Token tidak valid!' : 'Token is not valid!' };
    }
  } else {
    return { error: isId ? 'Token bukan bearer type!' : 'Token is not Bearer type' };
  }
}

export { extractToken };
