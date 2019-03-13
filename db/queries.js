const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

const cardsSchema = [
  'id',
  'name',
  'mana_cost',
  'cmc',
  'colorless',
  'white',
  'blue',
  'black',
  'red',
  'green',
  'supertype',
  'artifact',
  'creature',
  'enchantment',
  'instant',
  'land',
  'planeswalker',
  'sorcery',
  'tribal',
  'subtype',
  'set_name',
  'set_code',
  'rarity',
  'rules_text',
  'loyalty',
  'power',
  'toughness',
  'collector_number',
  'artist',
  'layout',
  'commander',
  'legacy',
  'modern',
  'standard',
  'vintage'
];

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
  if (Object.keys(req.query).some(param => !cardsSchema.includes(param))) {
    return res.status(422).json(
      `Bad request. Valid query parameters are ${cardsSchema}`
    );
  }
  try {
    const cards = await db('cards').select().where(req.query);
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getAllSets,
  getAllCards,
  getCardsByQuery
}