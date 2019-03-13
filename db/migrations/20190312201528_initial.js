
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('sets', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('code');
      table.integer('set_size');
      table.date('release_date');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('cards', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('mana_cost');
      table.integer('cmc');
      table.boolean('colorless');
      table.boolean('white');
      table.boolean('blue');
      table.boolean('black');
      table.boolean('red');
      table.boolean('green');
      table.string('type');
      table.string('rarity');
      table.text('rules_text');
      table.string('loyalty');
      table.string('power');
      table.string('toughness');
      table.string('collector_number');
      table.string('artist');
      table.string('layout');
      table.integer('set_id').unsigned();
      table.foreign('set_id').references('sets.id');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('cards'),
    knex.schema.dropTable('sets')
  ]);
};
