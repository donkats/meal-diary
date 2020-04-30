import React, { useState } from 'react';

function ResultList(props) {
  const { date, list, meal, type, userId } = props;

  const [content, updateContent] = useState(null);
  const [message, setMessage] = useState('');

  let grams = '';
  let kcal = '';
  if (content) {
    if (content.gramsUnit) grams = `(${content.gramsUnit}g)`;
    kcal = `(${content.kcal}kcal)`;
  }

  function expandItem(element, index) {
    setMessage('');
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
    const expanded = document.querySelector('.expanded');
    if (expanded && expanded.id !== elementId) {
      expanded.classList.remove('expanded')
    };
    document.getElementById(elementId).classList.toggle('expanded');
  }

  function addItemToDb(item, id, type, meal, date, userId) {
    const { foodName, kcal, servingQ, servingUnit, gramsUnit, carbs, fat, proteins } = item;
    const units = document.getElementById(id+type).value;

    if (!/(^[0-9]+\.?[0-9]?$)/.test(units) || units === 0) {
      setMessage('Please enter a valid number.');
    } else {
      setMessage('Added!');

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
    }

    setTimeout(() => setMessage(''), 2000);
  }

  return (
    <div className="result-column">
      {list.map((item, index) => (
        <div key={item.foodName}>
          <button type="button" className="item-btn" key={item.foodName} id={item.nixItemId}
          onClick={(e) => expandItem(e.target, index)}>{item.foodName}</button>
          <div className="item-content" id={`${type}-${index}-content`}>
            <input type="text" id={`${index}${type}`} className="qty-input" placeholder="0"/>
            <label> x {item.servingQ} {item.servingUnit} {content ? `${grams} ${kcal}` : '' }</label>
            <button type="button" className="add-item-btn" onClick={() => addItemToDb(content, index, type, meal, date, userId)}>add</button>
            {message.length > 0 && <span className="added-msg faded">{message}</span>}
          </div>
        </div>
        )
      )}
    </div>
  )
}

export default ResultList;