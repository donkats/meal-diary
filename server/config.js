require('dotenv').config()

const { Pool } = require('pg')
const isProduction = true;

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? `postgres://mlqwcmydjqkpeb:caa92e81b72905e4cdb3a9731c3854026cbfac1c35e2f107725b47ad21c78672@ec2-54-75-229-28.eu-west-1.compute.amazonaws.com:5432/d3ettgngq3bba0`
  : connectionString,
  ssl: isProduction,
})

module.exports = { pool }

// connectionString = {
//   connectionString: process.env.DATABASE_URL,
//   ssl: true
//   };