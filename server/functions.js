const { pool } = require('./config');

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const addUser = (request, response) => {
  const { username, password, email, height, daily_goal, name, diet  } = request.body;
  console.log(username, password);
  // const info = [ 'newuser', 'newpass'];
  pool.query('INSERT INTO users (username, password, email, height, daily_goal, name, diet) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
  [username, password, email, height, daily_goal, name, diet], error => {
    if (error) {
      throw error
    }
    response.status(201).json({ status: 'success', message: 'User added.' })
  })
};

const addMeals = (request, response) => {
  const { foodName, kcal, amount, userId, meal, grams, kcalIntake, date } = request.body;

  pool.query('INSERT INTO ingredients (food_name, kcal, amount) VALUES ($1, $2, $3) ON CONFLICT ON CONSTRAINT constraintname DO NOTHING', [foodName, kcal, amount], error => {

    pool.query('INSERT INTO meals (meal, grams, kcal_intake, date, users_id, ingredients_id) VALUES ($1, $2, $3, $4, $5, (select id from ingredients where food_name = $6))', 
    [meal, grams, kcalIntake, date, userId, foodName], error => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'Ingredient and meal added'})
    });
  });
};

module.exports = {
  getUsers,
  addUser,
  addMeals
}