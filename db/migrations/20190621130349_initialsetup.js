
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema
    .createTable('grocers', function (table) {
    table.increments('id');
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.string('address').notNullable();
    table.json('profile');
    table.decimal('latitude', 9, 6).notNullable();
    table.decimal('longitude', 9, 6).notNullable();
   }),

   knex.schema
   .createTable('charities', function (table) {
    table.increments('id');
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.string('address').notNullable();
    table.json('profile');
    table.decimal('latitude', 9, 6).notNullable();
    table.decimal('longitude', 9, 6).notNullable();
   }),

   knex.schema.createTable('donations', (table) => {
     table.increments('id');
     table.string('product').notNullable();
     table.string('image');
     table.integer('quantity').notNullable();
     table.integer('unit').notNullable();
     table.date('expiredate').notNullable();
     table.decimal('latitude', 9, 6).notNullable();
     table.decimal('longitude', 9, 6).notNullable();
     table.integer('grocer_id').references('id').inTable('grocers');
     table.timestamps();
   }),

   knex.schema.createTable('orders', (table)=>{
    table.increments('id');
     table.integer('quantity').notNullable();
     table.integer('unit');
     table.integer('charity_id').references('id').inTable('charities');
     table.timestamps();
   }),

   knex.schema.createTable('line_items', (table)=>{
    table.increments('id');
     table.integer('quantity').notNullable();
     table.integer('unit');
     table.integer('order_id').references('id').inTable('orders');
     table.integer('donation_id').references('id').inTable('donations');
     table.timestamps();
   })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('grocers', function (table) {
        table.dropColumn('password');
    }),
    knex.schema.table('charities', function (table) {
      table.dropColumn('password');
  }),
    knex.schema.dropTable('donations')
                .dropTable('orders')
                .dropTable('line_items')
  ])
};
