const app = require("./app.js");
const config = require("./app/config");
const PORT = config.app.port;
const MongoUtil = require("./app/utils/mongodb.util");

async function startServer() {
  try {
    await MongoUtil.connectToServer();
    console.log("Connected to the Database");

    app.listen(PORT, () => {
      console.log(`Server is Running on port ${PORT}`);
    });
  } catch (err) {
    console.log("Lỗi");
    process.exit(1);
  }
}
startServer();
