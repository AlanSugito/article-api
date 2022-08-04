const { validationResult } = require("express-validator");
const Articles = require("../models/article");

const timeFormat = () => {
  const time = new Date().toUTCString().split(" ");
  time.splice(4, 2);
  const formattedTime = time.join(" ");

  return formattedTime;
};

const postArticle = (req, res, next) => {
  const { headline, content } = req.body;
  const imgSrc = req.file.path;
  const postedAt = timeFormat()
  const err = validationResult(req);

  if (!err.isEmpty()) {
    const error = new Error("Invalid input");
    error.errosStatus = 400;
    error.data = err.array();
    throw error;
  }

  if (!req.file) {
    const error = new Error("Please insert an image");
    error.errorStatus = 422;
    throw error;
  }

  const Post = new Articles({ headline, imgSrc, content, postedAt });
  Post.save()
    .then(() => {
      res.status(201).json({
        message: "Article succesfully Created",
        data: {
          articleId: "1",
        },
      });
    })
    .catch(() => next(err));
};

const getAllArticle = (req, res, next) => {
  const { page = 1, perPage = 5 } = req.query;
  let totalItems;

  Articles.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Articles.find()
        .skip((page - 1) * perPage)
        .limit(perPage);
    })
    .then((result) => {
      res.status(200).json({
        status: "success",
        message: "Get all articles success",
        data: result,
        current_page: page,
        total_items: totalItems,
        items_per_page: perPage,
      });
    })
    .catch((err) => next(err));
};

const getArticleById = (req, res, next) => {
  const { articleId } = req.params;

  Articles.findById(articleId)
    .then((result) => {
      if (!result) {
        const error = new Error("Article not found");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        status: "succes",
        message: "succesfully get an article",
        data: result,
      });
    })
    .catch((err) => next(err));
};

const updateArticle = (req, res, next) => {
  const { headline, imgSrc, content } = req.body;
  const { articleId } = req.params;

  const err = validationResult(req);

  if (!err.isEmpty()) {
    const error = new Error("Invalid input");
    error.errosStatus = 400;
    error.data = err.array();
    throw error;
  }

  Articles.findByIdAndUpdate(articleId, { headline, imgSrc, content })
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Update article success",
      });
    })
    .catch((err) => next(err));
};

const deleteDataById = (req, res, next) => {
  const { articleId } = req.params;

  Articles.findByIdAndDelete(articleId)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Article deleted",
      });
    })
    .catch((err) => next(err));
};

module.exports = {
  postArticle,
  getAllArticle,
  getArticleById,
  updateArticle,
  deleteDataById,
};
