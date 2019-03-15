const express = require('express');
const router = express.Router();
const db = require('../../db/queries');

router.get('/sets', db.getAllSets);
router.get('/sets/:id', db.getSetByID);
router.get('/cards?', db.getCardsByQuery);
router.get('/cards', db.getAllCards);
router.post('/cards', db.postToCards);
router.post('/sets', db.postToSets);

module.exports = router;