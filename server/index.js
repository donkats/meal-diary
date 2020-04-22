import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

const db = require ('./db-functions');
const api = require('./api-functions')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

app
  .route('/users')
  .get(db.getUsers)
  .post(db.addUser)
// database - post - posts in ingredients, then in meals
// get - all meals per date per user
app
  .route('/meals')
  .post(db.addMeals)
  .get(db.getAllMeals)
// database - get breakfast rows per date per user
app
  .route('/breakfast')
  .get(db.getBreakfast)
// database - get lunch rows per date per user
app
  .route('/lunch')
  .get(db.getLunch)
// database - get dinner rows per date per user
app
  .route('/dinner')
  .get(db.getDinner)
// database - get amount of calories per date per user
app
  .route('/calories')
  .get(db.getDailyCalories)
// api - get list of products
app
  .route('/search/:query')
  .get(api.fetchSearch);
// api - get details for one product
app
  .route('/:type/:name')
  .get(api.fetchItem);

// Start server
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening`)
});
