exports.up = function (knex, Promise) {
  return knex.schema.alterTable('users', function (table) {
    table.renameColumn("name", "username")
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('users', function (table) {
    table.renameColumn("username", "name")
  })
};
