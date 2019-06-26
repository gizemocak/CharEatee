exports.up = function (knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('city');
    table.string('province');
    table.string('postalcode');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('city')
    table.dropColumn('province')
    table.dropColumn('postalcode')
  })
};