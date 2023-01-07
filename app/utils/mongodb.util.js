const { MongoClient } = require("mongodb");
const uri = require("../config/index").db;
let _db;

module.exports = {
  connectToServer: async () => {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      console.log("Kết nối thành công");
      _db = client.db("contactbook");
    } catch (e) {
      console.error(e);
    }
  },
  getDbContact: () => {
    return _db.collection("contact");
  },
  close: () => {
    client.close();
  },
};
