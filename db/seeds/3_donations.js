exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('donations').insert({
      id: 1,
      product: 'Apple',
      image: 'https://www.google.com/search?biw=1440&bih=765&tbm=isch&sa=1&ei=OokOXdSkNoSutQbKhoLwBw&q=bags+of+apples&oq=apples+bags+&gs_l=img.1.0.0i8i30l2.8488.11525..13644...1.0..0.285.627.5j0j1......0....1..gws-wiz-img.......0j0i24.gtSoOHczEok#imgrc=-cb8M_md6osX4M:',
      quantity: 6,
      unit: 'lb',
      expiredate: 'Sat, 06 Jul 2019',
      latitude: 43.660750,
      longitude: -79.384424,
      grocer_id: 1
    })
  ]);
};


