export const appConfig = () => ({
  port: Number(process.env.PORT || 3005),
  appName: process.env.APP_NAME || 'url-shortner',
});
