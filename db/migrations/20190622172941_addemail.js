
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('grocers', function (table) {
        table.string('email');
    }),

    knex.schema.table('charities', function (table) {
      table.string('email');
  }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('grocers', function (table) {
        table.dropColumn('password');
    }),
    knex.schema.table('charities', function (table) {
      table.dropColumn('password');
  }),
  ])
};
