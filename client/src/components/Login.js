import React, { useState } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import '../styles/Login.css';

function Login(props) {
  const { setAuth } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch(`/users/${email}/${password}`)
      .then((data) => data.json())
      .then((data) => setAuth({ isAuth: data.isAuthenticated, id: data.id, goal: data.goal}));
  }
  
  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <label>Email</label>
          <FormControl
            autoFocus
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <label>Password</label>
          <FormControl
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
