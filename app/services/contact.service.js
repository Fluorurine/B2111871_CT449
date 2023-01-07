const MongoUtil = require("../utils/mongodb.util");
const { ObjectId } = require("mongodb");

let extractContactData = (payload) => {
  const contact = {
    name: payload.name,
    email: payload.email,
    address: payload.address,
    phone: payload.phone,
    favourite: payload.favourite,
  };
  Object.keys(contact).forEach(
    (key) => contact[key] === undefined && delete contact[key]
  );
  return contact;
};
exports.create = async (payload) => {
  const contact = extractContactData(payload);
  const result = await MongoUtil.getDbContact().findOneAndUpdate(
    contact,
    { $set: { favourite: contact.favourite === true } },
    {
      returnNewDocument: true,
      upsert: true,
    }
  );
  return result.value;
};
exports.find = async (filter) => {
  const cursor = await MongoUtil.getDbContact().find(filter);
  return await cursor.toArray();
};
exports.findByName = async (name) => {
  console.log(new RegExp(name));
  return await MongoUtil.getDbContact()
    .find({
      name: {
        $regex: new RegExp(name),
        $options: "i",
      },
    })
    .next();
};
exports.update = async (id, payload) => {
  const filter = {
    _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
  };
  const update = extractContactData(payload);
  return (result = await MongoUtil.getDbContact().findOneAndUpdate(
    filter,
    { $set: update },
    {
      returnNewDocument: true,
    }
  ));
};
exports.findById = async (id) => {
  return await MongoUtil.getDbContact().findOne({
    _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
  });
};
exports.delete = async (id) => {
  const result = await MongoUtil.getDbContact().findOneAndDelete({
    _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
  });
  return result.value;
};
exports.findAllFavourite = async () => {
  const cursor2 = await MongoUtil.getDbContact().find({ favourite: true });
  console.log(cursor2);
  return cursor2.toArray();
};
exports.deleteAll = async () => {
  const result = await MongoUtil.getDbContact().deleteMany({});
  return result.deletedCount;
};
