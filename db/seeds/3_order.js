
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('orders').insert({
      id: 1,
      quantity: 6,
      unit: 'lb',
      user_id: 2
    })
  ]);
};



