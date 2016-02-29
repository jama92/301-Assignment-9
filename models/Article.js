"use strict";

module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define("Article", {
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    author: DataTypes.STRING,
    authorUrl: DataTypes.STRING,
    publishedOn: DataTypes.STRING,
    body: DataTypes.TEXT
  })
  return Article;
}
