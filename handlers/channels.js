const conn = require("../utils/mariadb");

const getAllChannel = (req, res) => {
  const { userId } = req.body;
  const sql = `SELECT * FROM channels WHERE user_id='${userId}'`;

  try {
    conn.query(sql, (err, results) => {
      if (err)
        return res
          .status(400)
          .json({ message: "sql 구문이 정확하지 않습니다" });

      if (!results.length || results.length === 0)
        return res
          .status(400)
          .json({ message: "channels이 존재하지 않습니다!!" });

      return res.status(200).json(results);
    });
  } catch (error) {
    return res.status(500).json({ message: "DB 연결에 실패했습니다!!" });
  }
};

const makeNewChannel = (req, res) => {
  const { name, email } = req.body;
  const getUserIdSql = `SELECT id FROM users WHERE email="${email}"`;

  try {
    conn.query(getUserIdSql, (err, results) => {
      if (err)
        return res.status(400).json({
          message: "query 문이 잘못되었습니다!!",
        });

      if (!results.length)
        return res
          .status(400)
          .json({ message: "해당 email 유저정보가 없습니다." });

      const userId = results[0].id;

      if (userId) {
        const makeChannelSql = `INSERT INTO channels (name, user_id) VALUES ('${name}','${userId}')`;

        conn.query(makeChannelSql, (err, results) => {
          if (err)
            return res.status(400).json({
              message: "query문이 잘못되었습니다!!",
            });

          return res.status(201).json(results);
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "DB 연결에 실패했습니다!!" });
  }
};

const deleteAllChannel = (req, res) => {
  const sql = `DELETE FROM channels`;

  try {
    conn.query(sql, (err, results) => {
      if (err)
        return res
          .status(400)
          .json({ message: "sql 구문이 정확하지 않습니다" });

      return res.status(200).json(results);
    });
  } catch (error) {
    return res.status(500).json({ message: "DB 연결에 실패했습니다!!" });
  }
};

const editChannelById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const sql = `UPDATE channels SET name='${name}' WHERE id='${id}'`;

  try {
    conn.query(sql, (err, results) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "sql 구문이 정확하지 않습니다" });
      }
      // 이건 주의해야할 점
      if (results.affectedRows === 0) {
        return res
          .status(400)
          .json({ message: "업데이트할 channel을 찾을 수가 없습니다" });
        // 이건 주의해야할 점
      } else {
        return res.status(200).json(results);
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "DB 연결에 실패했습니다!!" });
  }
};

const getChannelById = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM channels WHERE id='${id}'`;

  try {
    conn.query(sql, (err, results) => {
      if (err)
        return res
          .status(400)
          .json({ message: "sql 구문이 정확하지 않습니다" });

      if (!results.length || results.length === 0)
        return res
          .status(400)
          .json({ message: "channels이 존재하지 않습니다!!" });

      results = results[0];
      return res.status(200).json(results);
    });
  } catch (error) {
    return res.status(500).json({ message: "DB 연결에 실패했습니다!!" });
  }
};

const deleteChannelById = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM channels WHERE id='${id}'`;

  try {
    conn.query(sql, (err, results) => {
      if (err) {
        return res.status(400).json({
          message: "sql 구문이 잘못되었습니다!!",
        });
      }

      // 이건 주의해야할 점
      if (results.affectedRows === 0) {
        return res
          .status(400)
          .json({ message: "삭제할 channel을 찾을 수가 없습니다" });
        // 이건 주의해야할 점
      } else {
        return res.status(200).json(results);
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "DB 연결에 실패했습니다!!" });
  }
};

module.exports = {
  getAllChannel,
  makeNewChannel,
  deleteAllChannel,
  editChannelById,
  getChannelById,
  deleteChannelById,
};
