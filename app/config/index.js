const config = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017",
};
module.exports = config;
