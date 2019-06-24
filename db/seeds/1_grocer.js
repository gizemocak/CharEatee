
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('grocers').insert({
      id: 1,
      name: 'Sobeys',
      email: "a@a.com",
      password: '123456',
      address: '777 Bay Street Toronto ON M5G 2C8',
      latitude: 43.660750,
      longitude: -79.384424
    })
  ]);
};



