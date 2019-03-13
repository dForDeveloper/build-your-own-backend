const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

const getAllSets = async (req, res) => {
  try {
    const sets = await db('sets').select();
    res.status(200).json(sets);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getAllCards = async (req, res) => {
  try {
    const sets = await db('cards').select();
    res.status(200).json(sets);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getCardsByQuery = async (req, res) => {
  try {
    const cards = await db('cards').select().where(req.query);
    res.status(200).json(cardsg);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getAllSets,
  getAllCards,
  getCardsByQuery
}