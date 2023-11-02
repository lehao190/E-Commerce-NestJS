export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  tokens: {
    refreshToken: {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expires: process.env.REFRESH_TOKEN_EXPIRES,
    },
    accessToken: {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expires: process.env.ACCESS_TOKEN_EXPIRES,
    }
  },
});
