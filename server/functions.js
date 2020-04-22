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
  const { foodName, kcal, servingQ, servingUnit, gramsUnit, userId, meal, units, kcalIntake, date } = request.body;

  pool.query('INSERT INTO ingredients (food_name, kcal, serving_q, serving_unit, grams_unit) VALUES ($1, $2, $3, $4, $5) ON CONFLICT ON CONSTRAINT constraintname DO NOTHING', [foodName, kcal, servingQ, servingUnit, gramsUnit], error => {

    pool.query('INSERT INTO meals (meal, units, kcal_intake, date, users_id, ingredients_id) VALUES ($1, $2, $3, $4, $5, (select id from ingredients where food_name = $6))', 
    [meal, units, kcalIntake, date, userId, foodName], error => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'Ingredient and meal added'})
    });
  });
};

const getBreakfast = (request, response) => {
  const { userId, date } = request.body;
  pool.query('SELECT * from meals INNER JOIN ingredients on meals.ingredients_id = ingredients.id WHERE meals.users_id = $1 AND meals.date = $2 AND meals.meal = $3', [userId, date, 'breakfast'], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getLunch = (request, response) => {
  const { userId, date } = request.body;
  pool.query('SELECT * from meals INNER JOIN ingredients on meals.ingredients_id = ingredients.id WHERE meals.users_id = $1 AND meals.date = $2 AND meals.meal = $3', [userId, date, 'lunch'], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getDinner = (request, response) => {
  const { userId, date } = request.body;
  pool.query('SELECT * from meals INNER JOIN ingredients on meals.ingredients_id = ingredients.id WHERE meals.users_id = $1 AND meals.date = $2 AND meals.meal = $3', [userId, date, 'dinner'], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getAllMeals = (request, response) => {
  const { userId, date } = request.body;
  pool.query('SELECT * from meals INNER JOIN ingredients on meals.ingredients_id = ingredients.id WHERE meals.users_id = $1 AND meals.date = $2', [userId, date], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const getDailyCalories = (request, response) => {
  const { userId, date } = request.body;
  pool.query('SELECT * from meals INNER JOIN ingredients on meals.ingredients_id = ingredients.id WHERE meals.users_id = $1 AND meals.date = $2', [userId, date], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(calculateCalories(results.rows))
  })
};

function calculateCalories(array) {
  let result = 0;
  for (let i=0; i<array.length; i+=1) {
    result = result + array[i].kcal_intake;
  }
  return result;
}

module.exports = {
  getUsers,
  addUser,
  addMeals, 
  getBreakfast, 
  getLunch,
  getDinner,
  getAllMeals, 
  getDailyCalories
}

// 'SELECT * from meals INNER JOIN ingredients on meals.ingredients_id = ingredients.id WHERE meals.users_id = $1 AND meals.date = $2 AND meals.meal = $3';