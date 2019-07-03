
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', function (table) {
      table.dropTimestamps()
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', function (table) {
      table.timestamps();
    })
  ])
};
