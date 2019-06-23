
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema
    .createTable('grocers', function (table) {
    table.increments('id');
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.string('email');
    table.string('address').notNullable();
    table.string('imgurl');
    table.json('profile');
    table.float('latitude').notNullable();
    table.float('longitude').notNullable();
   }),

   knex.schema
   .createTable('charities', function (table) {
    table.increments('id');
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.string('email');
    table.string('address').notNullable();
    table.string('imgurl');
    table.json('profile');
    table.float('latitude').notNullable();
    table.float('longitude').notNullable();
   }),

   knex.schema.createTable('products', (table) => {
     table.increments('id');
     table.string('name').notNullable();
     table.string('imgurl');
     table.integer('quantity').notNullable();
     table.string('unit').notNullable();
     table.date('expiry_date').notNullable();
     table.integer('grocer_id').references('id').inTable('grocers');
     table.timestamps();
   }),

   knex.schema.createTable('orders', (table)=>{
    table.increments('id');
     table.integer('quantity').notNullable();
     table.string('unit');
     table.integer('charity_id').references('id').inTable('charities');
     table.timestamps();
   }),

   knex.schema.createTable('line_items', (table)=>{
    table.increments('id');
     table.integer('quantity').notNullable();
     table.string('unit');
     table.integer('order_id').references('id').inTable('orders');
     table.integer('product_id').references('id').inTable('products');
     table.timestamps();
   })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema .dropTable('line_items')
                .dropTable('products')
                .dropTable('orders')
                .dropTable('grocers')
                .dropTable('charities')

                
  ])
};


