const express = require("express");
const route = express.Router();
const {
  postArticle,
  getAllArticle,
  getArticleById,
  updateArticle,
  deleteDataById,
} = require("../controller/articles");
const reqValidator = require("../validator/article");

route.post("/article/create", reqValidator, postArticle);

route.get("/articles", getAllArticle);
route.get("/article/:articleId", getArticleById);

route.put("/article/:articleId", updateArticle);

route.delete("/article/:articleId", deleteDataById);

module.exports = route;
