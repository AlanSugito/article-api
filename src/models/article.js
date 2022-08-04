const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articles = new Schema(
  {
    headline: {
      type: String,
      required: true,
    },
    imgSrc: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    postedAt: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Articles", articles)
