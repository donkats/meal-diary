import React, { useState, useEffect } from 'react';
const moment = require('moment');

function UserInfo(props) {
  const [users,setUsers] = useState([])
  const id = props.id;
  // id added on line 6 and 9
  useEffect(() => {
    fetch(`/user/${id}`)
      .then(res => res.json())
      .then((users) => {
        setUsers(users)
      })
      .catch(console.log)
  },[])

    return (
      <div className="userInfo">
        <h1>Meal Diary</h1>
        {users.map((user, index) => (
          <div className="userWrapper">
            <p className="userName">Name: {user.name}</p>
            <p className="userWeight">Weight: {user.kilograms} kg</p>
            <p className="userGoal">BMI: 22.3 kcal</p>
            <p className="userDate">Date: {moment(user.date).format('DD-MM-YYYY')}</p>
            <p className="userGoal">Daily Goal: {user.daily_goal} kcal</p>
          </div>
        ))}
      </div>
    );
}

export default UserInfo;
