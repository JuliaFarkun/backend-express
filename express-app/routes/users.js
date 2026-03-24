const express = require('express');
const router = express.Router();

const users = [
  { id: 1, name: 'Чванов Фёдор' },
  { id: 2, name: 'Фаркун Юлия' }
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    items: users
  });
});

/* GET user by id. */
router.get('/:id', function(req, res, next) {
  const userId = Number(req.params.id);
  const user = users.find((item) => item.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

/* POST create user. */
router.post('/', function(req, res, next) {
  const { name } = req.body;
  const newUser = {
    id: users.length + 1,
    name
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = router;
