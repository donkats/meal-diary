import React, { useState } from 'react';

function expandItem(element, type, updateContent) {
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

  document.querySelectorAll('.active').forEach((el) => el.classList.toggle('active'));
  const siblingEl = element.nextElementSibling;
  siblingEl.classList.toggle('active');
}

function addItemToDb(item, id, type, meal) {
  console.log(item)
  const { foodName, kcal, servingQ, servingUnit, gramsUnit } = item;
  const units = document.getElementById(id+type).value;

  const itemObject = { 
    foodName,
    kcal,
    servingQ,
    servingUnit,
    gramsUnit,
    userId: '3',
    meal,
    units,
    kcalIntake: units * kcal,
    date: '23-04-2020'
   }
  const fetchObj = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(itemObject)
  }
  fetch('/meals', fetchObj);
}



function ResultList(props) {
  const [content, updateContent] = useState(null);
  let grams = '';
  let kcal = '';
  if (content) {
    if (content.gramsUnit) grams = `(${content.gramsUnit}g)`;
    kcal = `(${content.kcal}kcal)`;
  }

  return (
    <div className="result-column">
      {props.list.map((item, index) => (
        <div className="result-item" key={item.foodName}>
          <button type="button" className="item-btn" key={item.foodName} id={item.nixItemId}
          onClick={(e) => expandItem(e.target, props.type, updateContent)}>{item.foodName}</button>
          <div className="item-content">
            <input type="text" id={`${index}${props.type}`} className="qty-input" placeholder="0" />
            <label> x {item.servingQ} {item.servingUnit} {content ? `${grams} ${kcal}` : '' }</label>
            <button type="button" className="add-item-btn" onClick={() => addItemToDb(content, index, props.type, props.meal)}>add</button>
          </div>
        </div>
        )
      )}
    </div>
  )
}

export default ResultList;