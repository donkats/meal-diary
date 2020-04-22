import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import path from 'path'

const db = require ('./functions');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

app
  .route('/users')
  .get(db.getUsers)
  .post(db.addUser)

app
  .route('/meals')
  .post(db.addMeals)
  .get(db.getAllMeals)
app
  .route('/breakfast')
  .get(db.getBreakfast)
app
  .route('/lunch')
  .get(db.getLunch)
app
  .route('/dinner')
  .get(db.getDinner)
app
  .route('/calories')
  .get(db.getDailyCalories)

// Start server
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening`)
});
