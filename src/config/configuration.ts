export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  dbUsername: process.env.DB_USERNAME || 'root',
  dbPassword: process.env.DB_PASSWORD || '',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiryTime: process.env.JWT_EXPIRY_TIME || '30m',
});
