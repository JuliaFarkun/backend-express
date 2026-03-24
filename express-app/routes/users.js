const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    items: [
      { id: 1, name: 'Чванов Фёдор' },
      { id: 2, name: 'Фаркун Юлия' }
    ]
  });
});

module.exports = router;
