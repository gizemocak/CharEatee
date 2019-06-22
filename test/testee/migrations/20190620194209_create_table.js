
exports.up = function(knex, Promise) {
return Promise.all([
    knex.schema.createTable('articles', function(table) {
        table.increments('id').primary();
        table.integer('remote_id').unique();
        table.text('title');
        table.text('body');
        table.timestamps();
    })
    ])
};

exports.down = function(knex, Promise) {
return Promise.all([
    knex.schema.dropTable('articles')
    ])
};
