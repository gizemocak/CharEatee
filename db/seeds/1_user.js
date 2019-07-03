exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').insert({
      id: 1,
      username: 'Sobeys',
      email: "a@a.com",
      password: '$2b$10$tBtWNOsg1zjzGSkd3pzOVuiU78ebBDoWk2ZR3Itzlxa88LjB7JmJW',
      address: '777 Bay Street Toronto ON M5G 2C8',
      latitude: 43.660750,
      longitude: -79.384424,
      type: 'Grocer/Restaurant'
    }),
    knex('users').insert({
      id: 2,
      username: 'Canadian Foundation for Health and Prosperity',
      email: 'b@b.com',
      password: '$2b$10$tBtWNOsg1zjzGSkd3pzOVuiU78ebBDoWk2ZR3Itzlxa88LjB7JmJW',
      address: '285 MUTUAL STREET TORONTO	ON',
      latitude: 43.663788, 
      longitude: -79.378200,
      type: 'Charity'
    }),
    knex('users').insert({
      id: 3,
      username: 'Loblaws',
      email: "zz@z.com",
      password: '$2b$10$tBtWNOsg1zjzGSkd3pzOVuiU78ebBDoWk2ZR3Itzlxa88LjB7JmJW',
      address: '585 Queen St W, Toronto, ON M5V 2B7',
      latitude: 43.647401,
      longitude: -79.401831,
      type: 'Grocer/Restaurant'
    }),
  ]);
};
