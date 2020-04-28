import React, { useState } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import './Login.css';

function Login(props) {
  const { setAuth } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const passw = event.target.password.value;

    fetch(`/users/${email}/${passw}`)
      .then((data) => data.json())
      .then((data) => setAuth({ isAuth: data.isAuthenticated, id: data.id}));
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <label>Email</label>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <label>Password</label>
          <FormControl
            value={password}
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