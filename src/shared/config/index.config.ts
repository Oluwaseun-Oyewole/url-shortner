export const appConfig = () => ({
  port: Number(process.env.PORT || 3005),
  appName: process.env.APP_NAME || 'url-shortner',
  appLink: process.env.APP_LINK || 'https://localhost:3001',
  resendApiKey: process.env.RESEND_API_KEY,
});
