exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE users, products, orders, line_items RESTART IDENTITY CASCADE')
}