
exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('charities').insert({
      id: 1,
      name: 'Canadian Foundation for Health and Prosperity',
      email: 'b@b.com',
      password: '123456',
      address: '285 MUTUAL STREET TORONTO	ON',
      latitude: 43.663788, 
      longitude: -79.378200,
    })
  ]);
};
