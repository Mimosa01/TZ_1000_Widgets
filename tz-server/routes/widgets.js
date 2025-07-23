const express = require('express');
const router = express.Router();

const widgets = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `${i + 1}`,
  value: Math.floor(Math.random() * 201) - 100,
}));

router.get('/', (req, res) => {
  res.json(widgets);
});

module.exports = { router, widgets };
