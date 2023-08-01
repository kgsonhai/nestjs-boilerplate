import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const ApplicationConfig = {
  serverPort: parseInt(process.env.SERVER_PORT) ?? 8080,

  auth: {
    tokenSecretKey: process.env.TOKEN_SECRET_KEY,
    accessTokenExpired:
      parseInt(process.env.ACCESS_TOKEN_EXPIRED_IN_SECOND) ?? 3600, // 1h
    refreshTokenExpired:
      parseInt(process.env.REFRESH_TOKEN_EXPIRED_IN_SECOND) ?? 604800, // 7d
  },

  S3: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SERCRET_ACCESS_KEY,
    publicBucketName: process.env.AWS_PUBLIC_BUCKET_KEY,
  },

  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parseInt(process.env.REDIS_PORT),
  },
};
