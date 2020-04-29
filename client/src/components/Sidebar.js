import React from 'react';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';

function Sidebar(props) {
  const { userId, handleLogout } = props;
  return (
    <div className="sidebar">
      <h1 className="title">MealDiary</h1>
      <UserInfo userId={userId} />
      <Link to="/dashboard">
        <img src="https://img.icons8.com/ios/50/000000/food.png" alt="dashboard"/>
        Dashboard
      </Link>
      <Link to="/analytics">
        <img src="https://img.icons8.com/ios/50/000000/line-chart.png" alt="analytics"/>
        Analytics
      </Link>
      <Link onClick={handleLogout} to="/">
        <img src="https://img.icons8.com/ios/50/000000/logout-rounded.png" alt="logout"/>
        Logout
      </Link>
    </div>
  )
}

export default Sidebar;