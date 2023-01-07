const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name cannot be empty"));
  }
  try {
    const document = await ContactService.create(req.body);
    return res.send(document);
  } catch (e) {
    return next(
      new ApiError(400, "An error occurred while creating the contact")
    );
  }
};
exports.findAll = async (req, res, next) => {
  const { name } = req.query;
  let documents = [];
  try {
    if (name) {
      documents = await ContactService.findByName(name);
    } else {
      documents = await ContactService.find({});
    }
  } catch (err) {
    next(new ApiError(500, "An error occurred while creating the contact"));
  }

  return res.send(documents);
};
exports.findOne = async (req, res, next) => {
  try {
    const document = await ContactService.findById(req.params.id);
    return res.send(document);
  } catch (err) {
    next(new ApiError(500, "An error occurred while finding the contact"));
  }
};
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).lenght === 0) {
    return next(new ApiError(500, "Data to update cannot be empty"));
  }
  try {
    const document = await ContactService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(400, "Contact not found"));
    }
    return res.send({ message: "Contact was update successfully" });
  } catch (err) {
    return next(new ApiError(500, `Error updating with id=${req.params.id}`));
  }
};
exports.delete = async (req, res, next) => {
  try {
    const document = await ContactService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(400, "Contact not found"));
    }
    return res.send({ message: "Contact was delete successfully" });
  } catch (err) {
    return next(new ApiError(500, `Error delete with id=${req.params.id}`));
  }
};
exports.deleteAll = async (req, res) => {
  try {
    const deletedCount = await ContactService.deleteAll();
    return res.send({
      message: `${deletedCount} contacts was deleted`,
    });
  } catch (error) {
    return next(new ApiError(500, `Error delete all contents`));
  }
};
exports.findAllFavourite = async (req, res, next) => {
  try {
    const documents = await ContactService.findAllFavourite();
    console.log(documents);
    res.send(documents);
  } catch (error) {
    return next(new ApiError(500, `Error get all favourite`));
  }
};
