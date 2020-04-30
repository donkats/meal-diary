import React from 'react';
import { NavLink } from 'react-router-dom';
import UserInfo from './UserInfo';
import '../styles/Sidebar.css';

function Sidebar(props) {
  const { userId, handleLogout } = props;
  return (
    <div className="sidebar">
      <h1 className="title">MealDiary</h1>
      <UserInfo userId={userId} />
      <NavLink to="/dashboard" activeClassName="selected">
        <img className="icon" src="https://img.icons8.com/ios/50/000000/food.png" alt="dashboard"/>
        Dashboard
      </NavLink>
      <NavLink to="/analytics/calories" activeClassName="selected">
        <img className="icon" src="https://img.icons8.com/ios/50/000000/line-chart.png" alt="analytics"/>
        Analytics
      </NavLink>
      <NavLink exact to="/" activeClassName="selected" onClick={handleLogout}>
        <img className="icon" src="https://img.icons8.com/ios/50/000000/logout-rounded.png" alt="logout"/>
        Logout
      </NavLink>
    </div>
  )
}

export default Sidebar;