exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', function (table) {
      table.integer('grocer_id');
      table.integer("charity_id");
      table.string("status")
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', function (table) {
      table.dropColumn('grocer_id')
      table.dropColumn('charity_id')
      table.dropColumn('status')
    })
  ])
};