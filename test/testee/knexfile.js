require('dotenv').config()
 
module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'testee'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
 
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      database: 'testee',
      user:     process.env.DB_USER,
      password: process.env.DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};