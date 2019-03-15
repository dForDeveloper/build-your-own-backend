const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

const cardsSchema = {
  name: '<string>',
  mana_cost: '<string>',
  cmc: '<integer>',
  colorless: '<boolean>',
  white: '<boolean>',
  blue: '<boolean>',
  black: '<boolean>',
  red: '<boolean>',
  green: '<boolean>',
  supertype: '<string>',
  artifact: '<boolean>',
  creature: '<boolean>',
  enchantment: '<boolean>',
  instant: '<boolean>',
  land: '<boolean>',
  planeswalker: '<boolean>',
  sorcery: '<boolean>',
  tribal: '<boolean>',
  subtype: '<string>',
  set_name: '<string>',
  set_code: '<string>',
  rarity: '<string>',
  rules_text: '<string>',
  loyalty: '<string>',
  power: '<string>',
  toughness: '<string>',
  collector_number: '<string>',
  artist: '<string>',
  layout: '<string>',
  commander: '<string>',
  legacy: '<string>',
  modern: '<string>',
  standard: '<string>',
  vintage: '<string>',
  set_id: '<integer>'
};

const setsSchema = {
  name: '<string>',
  code: '<string>',
  set_size: '<integer>',
  release_date: '<string>'
}

const stringify = (schema) => {
  return Object.keys(schema).reduce((result, key, index, array) => {
    result += ` ${key}: ${schema[key]}`;
    if (index !== array.length - 1) result += ','
    return result;
  }, '');
}

const getAllSets = async (req, res) => {
  try {
    const sets = await db('sets').select();
    res.status(200).json(sets);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getSetByID = async (req, res) => {
  const { id } = req.params;
  try {
    const sets = await db('sets').select().where({ id });
    return sets.length > 0 ? res.status(200).json(sets) : res.sendStatus(404);
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

const getCardByID = async (req, res) => {
  const { id } = req.params;
  try {
    const cards = await db('cards').select().where({ id });
    return cards.length > 0 ? res.status(200).json(cards) : res.sendStatus(404);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getCardsByQuery = async (req, res) => {
  const queryParams = Object.keys(req.query);
  const validParams = Object.keys(cardsSchema);
  if (queryParams.some(param => !validParams.includes(param))) {
    return res.status(422).send({
      error: `Bad request. Valid parameters are {${stringify(cardsSchema)} }`
    });
  }
  try {
    const cards = await db('cards').select().where(req.query);
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json(error);
  }
}

const postToSets = async (req, res) => {
  const set = req.body;
  for(let param of Object.keys(setsSchema)) {
    if (!set[param]) {
      return res.status(422).send({
        error: `Expected format: {${stringify(setsSchema)} }. Missing ${param}`
      });
    }
  }
  try {
    const [id] = await db('sets').insert(set, 'id');
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json(error);
  }
}

const postToCards = async (req, res) => {
  const card = req.body;
  for(let param of Object.keys(cardsSchema)) {
    if (!card[param]) {
      return res.status(422).send({
        error: `Expected format: {${stringify(cardsSchema)} }. Missing ${param}`
      });
    }
  }
  const sets = await db('sets').select();
  if (parseInt(card.set_id) < 1 || parseInt(card.set_id) > sets.length) {
    return res.status(422).send({
      error: `set_id must be between 1 and ${sets.length} inclusive`
    });
  }
  try {
    const [id] = await db('cards').insert(card, 'id');
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getAllSets,
  getSetByID,
  getAllCards,
  getCardByID,
  getCardsByQuery,
  postToCards,
  postToSets
}