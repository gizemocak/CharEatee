exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE TABLE charities, grocers, products, orders, line_items RESTART IDENTITY CASCADE')
}