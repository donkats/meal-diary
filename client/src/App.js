import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { users: [] }

  async componentDidMount() {
    const response = await fetch('/users')
    const users = await response.json()

    this.setState({ users: users })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.users.map(user => {
            return <li key={user.id}> <b>{user.username}</b><b>{user.password}</b></li>
          })}
        </ul>
      </div>
    );
  }
}

export default App;