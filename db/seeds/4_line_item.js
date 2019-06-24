
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('line_items').insert({
      id: 1,
      quantity: 6,
      unit: 'lb',
      order_id: 1,
      product_id: 1
    })
  ]);
};
