export const appConfig = () => ({
  port: Number(process.env.PORT || 3005),
  appName: process.env.APP_NAME || 'url-shortner',
  appLink: process.env.APP_LINK || 'https://localhost:3001',
  resendApiKey: process.env.RESEND_API_KEY,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtRefreshSecretKey: process.env.JWT_REFRESH_SECRET_KEY,
  accessTokenExpires: 12 * 60 * 60, // 12 hours
  refreshTokenExpires: 3 * 24 * 60 * 60, // 3 days
});
