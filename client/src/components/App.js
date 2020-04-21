import React, { Component } from 'react';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';

class App extends Component {
  state = { users: [] }

  // async componentDidMount() {
  //   const response = await fetch('/users')
  //   const users = await response.json()

  //   this.setState({ users: users })
  // }

  render() {
    return (
      <>
        {/* <ul>
          {this.state.users.map(user => {
            return <li key={user.id}> <b>{user.username}</b><b>{user.password}</b></li>
          })}
        </ul> */}
        <Sidebar />
        <Dashboard />
      </>
    );
  }
}

export default App;