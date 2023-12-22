const conn = require("../utils/mariadb");

const login = (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email="${email}" AND password="${password}"`;

  try {
    conn.query(sql, (err, users) => {
      if (err)
        return res
          .status(400)
          .json({ message: "sql 구문이 정확하지 않습니다!!" });

      if (!users.length)
        return res
          .status(400)
          .json({ message: "email 또는 password가 일치하지 않습니다!!" });

      return res.status(200).json(users[0]);
    });
  } catch (error) {
    return res.status(500).json({ message: "DB 연결에 실패했습니다!!" });
  }
};

const signUp = (req, res) => {
  const { email, name, password, contact } = req.body;
  const sql = `INSERT INTO users (email, name, password, contact) VALUES ('${email}','${name}','${password}','${contact}')`;

  try {
    conn.query(
      // `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`,
      // [email, name, password, contact],
      sql,
      (err, results) => {
        if (err)
          return res.status(400).json({
            message: "sql 구문이 정확하지 않습니다!!",
          });

        return res.status(201).json(results);
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "DB 연결에 실패했습니다!!" });
  }
};

const getUserByEmail = (req, res) => {
  const { email } = req.body;
  const sql = `SELECT * FROM users WHERE email="${email}"`;

  try {
    conn.query(sql, (err, users) => {
      if (err)
        return res
          .status(400)
          .json({ message: "sql 구문이 정확하지 않습니다!!" });

      if (!users.length)
        return res.status(400).json({ message: "해당 유저정보가 없습니다." });

      return res.status(200).json(users[0]);
    });
  } catch (error) {
    return res.status(500).json({ message: "DB 연결에 실패했습니다!!" });
  }
};

const deleteUserById = (req, res) => {
  const { email } = req.body;
  const sql = `DELETE FROM users WHERE email='${email}'`;

  try {
    conn.query(sql, (err, results) => {
      if (err)
        return res.status(400).json({
          message: "sql 구문이 정확하지 않습니다!!",
        });

      return res.status(200).json(results);
    });
  } catch (error) {
    return res.status(500).json({ message: "DB 연결에 실패했습니다!!" });
  }
};

module.exports = { login, signUp, getUserByEmail, deleteUserById };
