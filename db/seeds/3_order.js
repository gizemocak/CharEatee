exports.seed = function (knex, Promise) {
  return Promise.all([
    knex('orders').insert({
      id: 1,
      unit: 'lb',
      user_id: 2
    })
  ]);
};