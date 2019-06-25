exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').insert({
      id: 1,
      name: 'Sobeys',
      email: "a@a.com",
      password: '123456',
      address: '777 Bay Street Toronto ON M5G 2C8',
      latitude: 43.660750,
      longitude: -79.384424,
      type: 'Grocer/Restaurant'
    }),
    knex('users').insert({
      id: 2,
      name: 'Canadian Foundation for Health and Prosperity',
      email: 'b@b.com',
      password: '123456',
      address: '285 MUTUAL STREET TORONTO	ON',
      latitude: 43.663788, 
      longitude: -79.378200,
      type: 'Charity'
    })
  ]);
};
