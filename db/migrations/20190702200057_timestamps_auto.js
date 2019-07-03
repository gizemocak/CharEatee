exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', function (table) {
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at')
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', function (table) {
      table.dropTimestamps()
    })
  ])
};
