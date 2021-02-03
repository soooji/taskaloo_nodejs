"use strict";
var dbConn = require("./../../config/db.config");
// var utils = require("../../utils/main.utils");
// var mysql = require("mysql");

var Tag = function (tag) {
  this.name = tag.name;
};

Tag.create = function (data, result) {
  dbConn.query("INSERT INTO tags set ?", data, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

Tag.get = function (result) {
  dbConn.query("Select id, name from tags", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Tag.findByName = function (tagName, result) {
  dbConn.query(
    "Select id, name from tags WHERE name = ?",
    tagName,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Tag.addTagsToTask = function (taskTags, result) {
  dbConn.query(
    "INSERT INTO tags (task_id, tag_id) VALUES ?",
    taskTags,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res.insertId);
      }
    }
  );
};

module.exports = Tag;
