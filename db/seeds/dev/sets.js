const sets = require('../../../Vintage');

exports.seed = async (knex, Promise) => {
  await knex('cards').del();
  await knex('sets').del();
  const setPromises = [];
  await Object.keys(sets).forEach(set => {
    setPromises.push(createSet(knex, sets[set]));
  });
  return Promise.all(setPromises);
};

const createSet = async (knex, set) => {
  const id = await knex('sets').insert({
    name: set.name,
    code: set.code,
    set_size: set.totalSetSize,
    release_date: set.releaseDate
  }, 'id');
  const cardPromises = [];
  await set.cards.forEach(card => {
    cardPromises.push(
      createCard(
        knex,
        {
          name: card.name,
          mana_cost: card.manaCost,
          cmc: card.convertedManaCost,
          colorless: card.colors.length === 0,
          white: card.colors.includes('W'),
          blue: card.colors.includes('U'),
          black: card.colors.includes('B'),
          red: card.colors.includes('R'),
          green: card.colors.includes('G'),
          supertype: card.supertypes[0],
          artifact: card.types.includes('Artifact'),
          creature: card.types.includes('Creature'),
          enchantment: card.types.includes('Enchantment'),
          instant: card.types.includes('Instant'),
          land: card.types.includes('Land'),
          planeswalker: card.types.includes('Planeswalker'),
          sorcery: card.types.includes('Sorcery'),
          tribal: card.types.includes('Tribal'),
          subtype: card.subtypes.join(' '),
          set_name: set.name,
          set_code: set.code,
          rarity: card.rarity,
          rules_text: card.text,
          loyalty: card.loyalty,
          power: card.power,
          toughness: card.toughness,
          collector_number: card.number,
          artist: card.artist,
          layout: card.layout,
          commander: card.legalities.commander,
          legacy: card.legalities.legacy,
          modern: card.legalities.modern,
          standard: card.legalities.standard,
          vintage: card.legalities.vintage,
          set_id: id[0]
        }
      )
    );
  });
  return Promise.all(cardPromises);
}

const createCard = async (knex, card) => {
  return knex('cards').insert(card);
}
