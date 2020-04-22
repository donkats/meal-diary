import React, { useState } from 'react';

function expandItem(element) {
  const foodName = element.textContent;
  console.log(foodName);
  // fetch(`/common/${foodName}`)

  const siblingEl = element.nextElementSibling;
  siblingEl.classList.toggle('active');
}

function ResultList(props) {
  const [content, updateContent] = useState(null);

  console.log(props.type, 'list:', props.list);
  return (
    <div className="result-column">
      {props.list.map((item) => (
        <div className="result-item" key={item.foodName}>
          <button type="button" className="item-btn" key={item.foodName} onClick={(e) => expandItem(e.target, updateContent)}>{item.foodName}</button>
          <div className="item-content">
            <input type="text" placeholder="0" ></input> x {item.servingQty} {item.servingUnit}
          </div>
        </div>
        )
      )}
    </div>
  )
}

export default ResultList;