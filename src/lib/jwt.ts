import jwt from 'jsonwebtoken';

const {
  JWT_SECRET: secret = 'bcb6cf84-25d6-4179-84ea-4a428d1bd911',
  JWT_ISSUER: issuer = 'share-it-extension',
  JWT_EXPIRES_IN: expiresIn = '30d',
} = process.env;

const config: jwt.SignOptions = {
  algorithm: 'HS256',
  issuer,
  expiresIn,
};

export class JWT {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static sign(payload: any): string {
    return jwt.sign(payload, secret, config);
  }

  static verify(token: string) {
    return jwt.verify(token, secret);
  }
}
