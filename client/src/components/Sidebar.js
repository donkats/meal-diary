import React from 'react';

function Sidebar(props) {
  return (
    <aside className="sidebar">
      <a href="/profile">profile</a>
      <a href="/fridge">fridge</a>
      <a href="/recipes">recipes</a>
    </aside>
  )
}

export default Sidebar;