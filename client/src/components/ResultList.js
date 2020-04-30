import React, { useState } from 'react';

function showNotification() {
  document.querySelector('.added-item').style.display = 'inline';
  document.querySelector('.added-item').classList.add('slide-in');
  setTimeout(() => {
    if (document.querySelector('.added-item')) {
      document.querySelector('.added-item').classList.remove('slide-in');
      document.querySelector('.added-item').style.display = 'none';
    }
  }, 2000);
}

function expandItem(element, type, index, updateContent) {
  if (type === 'common') {
    const foodName = element.textContent;
    fetch(`/common/${foodName}`)
      .then((data) => data.json())
      .then((data) => updateContent(data));
  } else {
    fetch(`/branded/${element.id}`)
      .then((data) => data.json())
      .then((data) => updateContent(data));
  }

  const elementId = `${type}-${index}-content`;
  const expanded = document.querySelector('.active');
  if (expanded && expanded.id !== elementId) {
    expanded.classList.remove('active')
  };
  document.getElementById(elementId).classList.toggle('active');
}



function ResultList(props) {
  const { date, list, meal, type, userId } = props;
  const [content, updateContent] = useState(null);
  const [message, setMessage] = useState('Added');
  let grams = '';
  let kcal = '';
  if (content) {
    if (content.gramsUnit) grams = `(${content.gramsUnit}g)`;
    console.log(content);
    kcal = `(${content.kcal}kcal)`;
  }

  function addItemToDb(item, id, type, meal, date, userId) {
    const { foodName, kcal, servingQ, servingUnit, gramsUnit, carbs, fat, proteins } = item;
    const units = document.getElementById(id+type).value;
    if (!/(^[0-9]+\.?[0-9]?$)/.test(units) || units === 0) {
      setMessage('Not passing');
    } else {
      setMessage('Added');
      const itemObject = { 
        foodName,
        kcal,
        servingQ,
        servingUnit,
        gramsUnit,
        carbs,
        userId,
        meal,
        units,
        kcalIntake: units * kcal,
        date,
        carbIntake: units * carbs,
        fat,
        fatIntake: units * fat,
        proteins,
        proteinIntake: units * proteins
      }
  
      const fetchObj = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(itemObject)
      }
  
      fetch('/meals', fetchObj);
      showNotification();
    }
  }
  console.log('message', message);
  return (
    <div className="result-column">
      {list.map((item, index) => (
        <div className="result-item" key={item.foodName}>
          <button type="button" className="item-btn" key={item.foodName} id={item.nixItemId}
          onClick={(e) => expandItem(e.target, type, index, updateContent)}>{item.foodName}</button>
          <div className="item-content" id={`${type}-${index}-content`}>
            <input type="text" id={`${index}${type}`} className="qty-input" placeholder="0"/>
            <label> x {item.servingQ} {item.servingUnit} {content ? `${grams} ${kcal}` : '' }</label>
            <button type="button" className="add-item-btn" onClick={() => addItemToDb(content, index, type, meal, date, userId)}>add</button>
            <span className="added-item slide-in">{message}</span>
          </div>
        </div>
        )
      )}
    </div>
  )
}

export default ResultList;