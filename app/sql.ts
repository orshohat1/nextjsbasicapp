import { Request, Response } from "express";
import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test_db",
});

export function insecureQuery(req: Request, res: Response) {
  const userId = req.query.id;
  // 🚨 This is vulnerable to SQL Injection
  connection.query(`SELECT * FROM users WHERE id = '${userId}'`, (err, results) => {
    if (err) {
      res.status(500).send("Error");
    } else {
      res.json(results);
    }
  });
}
