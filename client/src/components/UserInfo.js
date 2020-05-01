import React, { useState, useEffect, useCallback } from 'react';
import '../styles/UserInfo.css';

function UserInfo(props) {
  const { userId } = props;
  const [user, setUser] = useState([]);
  const [showWeightField, setFieldVisible] = useState(false);

  const fetchUserInfo = useCallback(() => {
    fetch(`/user/${userId}`)
      .then(res => res.json())
      .then((users) => setUser(users[0]))
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo])

  function addWeightToDb(event) {
    event.preventDefault();

    const kilograms = document.getElementById("weight").value;
    if (kilograms < 0 || isNaN(kilograms) || kilograms.length === 0 || kilograms % 1 !==0) {
      document.querySelector('.weight-msg').style.display = 'inline';
    } else {
      document.querySelector('.weight-msg').style.display = 'none';
      const itemObject = {
        userId,
        date: new Date(),
        kilograms
      };
  
      const fetchObj = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(itemObject)
      };
      
      fetch('/weight', fetchObj)
        .then(() => fetchUserInfo());
      setFieldVisible(false);
    }
  }

  return (
    <div className="user">
      <img src="https://i.imgur.com/O0jWLRN.png" alt="profile" />
      <p className="welcome">
        Hello, <span className="name">{user.name}</span>
      </p>
      <div className="userinfo">
        <div className="user-item">
          <strong>Height:</strong> {user.height}cm
        </div>
        <div className="user-item">
          <strong>Weight: </strong>
          { showWeightField ?
            <div id="weight-field">
              <input type="number" step="1" min="1" id="weight" className="weight-input" placeholder="0" /> kg
              <input type="button" className="add-weight-btn" onClick={(e) => addWeightToDb(e)} value="update" />
            </div>
          :
          `${user.kilograms}kg`
          }
          <input type="image" className="adjust-btn" onClick={() => setFieldVisible(!showWeightField)} // showInputField()
            src="https://img.icons8.com/ios/50/000000/pencil-tip.png" alt="edit weight" />
        </div>
        <p className="weight-msg slide-in">Please enter a whole number.</p>
        <div className="user-item">
          <strong>BMI:</strong> {((user.kilograms) / (((user.height / 100)) * (user.height / 100))).toFixed(1)}
        </div>
        <div className="user-item">
          <strong>Daily Goal:</strong> {user.daily_goal} kcal
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
