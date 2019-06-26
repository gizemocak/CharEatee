
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema
    .createTable('users', function (table) {
    table.increments('id');
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.string('email').notNullable();
    table.string('address').notNullable();
    table.string('imgurl');
    table.string('type').notNullable();
    table.json('profile');
    table.float('latitude');
    table.float('longitude');
   }),


   knex.schema.createTable('products', (table) => {
     table.increments('id');
     table.string('name').notNullable();
     table.string('imgurl');
     table.integer('quantity').notNullable();
     table.string('unit').notNullable();
     table.date('expiry_date').notNullable();
     table.integer('user_id').references('id').inTable('users');
     table.timestamps();
   }),

   knex.schema.createTable('orders', (table)=>{
    table.increments('id');
     table.integer('quantity').notNullable();
     table.string('unit');
     table.integer('user_id').references('id').inTable('users');
     table.timestamps();
   }),

   knex.schema.createTable('line_items', (table)=>{
    table.increments('id');
     table.integer('quantity');
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
                .dropTable('users')


                
  ])
};



