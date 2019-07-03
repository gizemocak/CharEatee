exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('products').insert([
      {
      id: 1,
      name: 'Apple',
      imgurl: '/client/public/images/apple.png',
      quantity: 6,
      unit: 'lb',
      expiry_date: 'Sat, 06 Jul 2019',
      user_id: 1
    },
    {
      id: 2,
      name: 'Bread',
      imgurl: '/client/public/images/bread.png',
      quantity: 8,
      unit: 'lb',
      expiry_date: 'Sat, 06 Jul 2019',
      user_id: 1
    },

    {
      id: 3,
      name: 'Pasta',
      imgurl: '/client/public/images/pasta.png',
      quantity: 10,
      unit: 'lb',
      expiry_date: 'Sat, 07 Jul 2019',
      user_id: 3
    },
    {
      id: 4,
      name: 'Canned Soup',
      imgurl: '/client/public/images/canned-food.png',
      quantity: 20,
      unit: 'lb',
      expiry_date: 'Sat, 07 Jul 2019',
      user_id: 3
    }
  ])
  ]);
};
