// get the client
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  //   timezone: "Asia/Seoul",
  password: "root",
  database: "Youtube",
  dateStrings: true,
});

module.exports = connection;
