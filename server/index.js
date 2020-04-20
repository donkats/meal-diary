import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import path from 'path'

const { pool } = require('./config');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addUser = (request, response) => {
  const { username, password } = request.body

  pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password], error => {
    if (error) {
      throw error
    }
    response.status(201).json({ status: 'success', message: 'User added.' })
  })
}

app
  .route('/users')
  // GET endpoint
  .get(getUsers)
  // POST endpoint
  .post(addUser)

// Start server
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening`)
})
