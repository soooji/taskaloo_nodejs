"use strict";
const mysql = require("mysql");
//local mysql db connection
const dbConn = mysql.createConnection({
  host: process.env.IP,
  user: process.env.DB_USER,
  port: "8889",
  password: process.env.DB_PASS,
  database: "taskaloo",
});
dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;
