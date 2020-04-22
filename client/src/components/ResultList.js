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
      {props.list.map((item) => (
        <div className="result-item" key={item.foodName}>
          <button type="button" className="item-btn" key={item.foodName} id={item.nixItemId}
          onClick={(e) => expandItem(e.target, props.type, updateContent)}>{item.foodName}</button>
          <div className="item-content">
            <input type="text" className="qty-input" placeholder="0" />
            <label> x {item.servingQty} {item.servingUnit} {content ? `${grams} ${kcal}` : '' }</label>
            <button type="button" className="add-item-btn">add</button>
          </div>
        </div>
        )
      )}
    </div>
  )
}

export default ResultList;