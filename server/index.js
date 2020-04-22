import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
const fetch = require('node-fetch');

require('dotenv').config();

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

const searchUrl = 'https://trackapi.nutritionix.com/v2/search/instant';
const appId = process.env.APP_ID;
const appKey = process.env.APP_KEY;

function parseData(data) {
  const common = data.common.map((food) => {
    return {
      foodName: food['food_name'],
      servingUnit: food['serving_unit'],
      servingQty: food['serving_qty'],
      photo: food.photo,
    }
  });

  const branded = data.branded.map((food) => {
    return {
      nixItemId: food['nix_item_id'],
      foodName: food['food_name'],
      brandName: food['brand_name'],
      servingUnit: food['serving_unit'],
      servingQty: food['serving_qty'],
      calories: food['nf_calories'],
      photo: food.photo,
    }
  });

  return { common, branded };
}

function fetchSearch(req, res) {
  const query = req.params.query;
  const queryUrl = searchUrl + '?query=' + query;

  const fetchObj = {
    method: 'GET',
    headers: {
      'x-app-id': appId,
      'x-app-key': appKey
    }
  };
  
  fetch(queryUrl, fetchObj)
    .then((data) => data.json())
    .then((data) => res.json(parseData(data)));
}

app
  .route('/search/:query')
  .get(fetchSearch);

function fetchItem(req, res) {
  const type = req.params.type;
  const query = req.params.name;

  const commonObj = {
    method: 'POST',
    headers: {
      'x-app-id': appId,
      'x-app-key': appKey,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ query })
  };

  const brandedObj = {
    method: 'GET',
    headers: {
      'x-app-id': appId,
      'x-app-key': appKey
    }
  }

  const commonUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
  const brandedUrl = 'https://trackapi.nutritionix.com/v2/search/item';

  if (type === 'common') {
    fetch(commonUrl, commonObj)
      .then((data) => data.json())
      .then((data) => res.json(data));
  } else {
    const idUrl = brandedUrl + '?nix_item_id=' + query;
    console.log(idUrl);
    fetch(idUrl, brandedObj)
      .then((data) => data.json())
      .then((data) => res.json(data));
  }
}

app
  .route('/:type/:name')
  .get(fetchItem);

// Start server
app.listen(process.env.PORT || 3001, () => {
  console.log(`server listening`)
});
