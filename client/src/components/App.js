import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Home from './Home';
import Sidebar from './Sidebar';

function App() {
  const stored = JSON.parse(localStorage.getItem('auth'));
  const [auth, setAuth] = useState(stored || { isAuth: false, userId: 0, goal: 0 });

  function handleLogout() {
    setAuth({ isAuth: false, userId: 0, goal: 0 });
    localStorage.clear()
  }

  useEffect(() => {
    if (auth.isAuth) {
      localStorage.setItem('auth', JSON.stringify(auth));
    }
  }, [auth])

  return (
  <Router>
    <div className="app">
      {auth.isAuth
        ? <>
          <Redirect to="/dashboard" />
          <Sidebar userId={auth.userId} handleLogout={handleLogout} />
          </>
        : <>
          <Redirect to="/" />
          <Home auth={auth} setAuth={setAuth} />
          </>
        }
      <Switch>
        <Route exact path="/" />
        <Route path="/analytics/calories">
          <Analytics userId={auth.userId} />
        </Route>
        <Route path="/dashboard">
          <Dashboard userId={auth.userId} isAuth={auth.isAuth} goal={auth.goal} />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;