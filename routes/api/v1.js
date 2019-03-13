const express = require('express');
const router = express.Router();
const db = require('../../db/queries');

router.get('/sets', db.getAllSets);
router.get('/cards', db.getAllCards);

module.exports = router;