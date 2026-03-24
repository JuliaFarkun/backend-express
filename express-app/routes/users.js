const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('mydb.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name text
)`);

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.all('SELECT id, name FROM users', [], (err, rows) => {
    if (err) {
      return next(err);
    }

    res.send(rows);
  });
});

/* GET user by id. */
router.get('/:id', function(req, res, next) {
  const userId = Number(req.params.id);

  db.get('SELECT id, name FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) {
      return next(err);
    }

    if (!row) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(row);
  });
});

/* POST create user. */
router.post('/', function(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const insert = 'INSERT INTO users (name) VALUES (?)';
  db.run(insert, [name], function(err) {
    if (err) {
      return next(err);
    }

    const newUser = {
      id: this.lastID,
      name
    };

    res.status(201).json(newUser);
  });
});

module.exports = router;