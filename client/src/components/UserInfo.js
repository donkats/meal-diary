import React, { useState, useEffect } from 'react';
const moment = require('moment');

function showNotification() {
  document.querySelector('.added').style.display = 'inline';
  document.querySelector('.added').classList.add('slide-in');
  setTimeout(() => {
    document.querySelector('.added').classList.remove('slide-in');
    document.querySelector('.added').style.display = 'none';
  }, 2000);
}

function showInputField() {
  let userInputField = document.getElementById("userInputField");
  if (userInputField.style.display === "none") {
    userInputField.style.display = "block";
  } else {
    userInputField.style.display = "none";
  }
}

function addWeightToDb(id) {
  const kilograms = document.getElementById("weight").value;
  const itemObject = {
    userId: id,
    date: new Date(),
    kilograms
  }
  const fetchObj = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(itemObject)
  }

  fetch('/weight', fetchObj);
  showNotification();
}

function UserInfo(props) {
  const [users, setUsers] = useState([])
  const id = props.id;
  // id added on line 6 and 9
  useEffect(() => {
    fetch(`/user/${id}`)
      .then(res => res.json())
      .then((users) => {
        setUsers(users)
      })
      .catch(console.log)
  }, [])

  return (
    <div className="userInfo">
      <h1>Meal Diary</h1>
      {users.map((user, index) => (
        <div className="userWrapper">
          <p className="userName">Name: {user.name}</p>
          <p className="userWeight">Weight: {user.kilograms} kg <button type="button" onClick={() => showInputField()}>Adjust weight</button></p>

          <div id="userInputField" style={{ display: "none" }}><input type="text" id="weight" className="weight-input" placeholder="0" /><button type="button" className="add-weight-btn" onClick={() => addWeightToDb(id)}>Submit</button><span className="added slide-in">Added!</span></div>

          <p className="userGoal">BMI: {((user.kilograms) / (((user.height / 100)) * (user.height / 100))).toFixed(1)}</p>
          <p className="userDate">Date: {moment(user.date).format('DD-MM-YYYY')}</p>
          <p className="userGoal">Daily Goal: {user.daily_goal} kcal</p>
        </div>
      ))}
    </div>
  );
}


export default UserInfo;
