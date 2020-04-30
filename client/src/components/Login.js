import React, { useState } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

function Login(props) {
  const { auth, setAuth } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch(`/users/${email}/${password}`)
      .then((data) => data.json())
      .then((data) => setAuth({ isAuth: data.isAuthenticated, userId: data.id, goal: data.goal}))
      .then(() => {
        if (!auth.isAuth) setError('Email or password was entered incorrectly, please try again.');
      });
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <label>Email</label>
          <FormControl autoFocus type="email" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup controlId="password">
          <label>Password</label>
          <FormControl onChange={e => setPassword(e.target.value)} type="password" />
        </FormGroup>
        <Button block disabled={!validateForm()} type="submit">Login</Button>
        <p className="error">{error}</p>
      </form>
    </div>
  );
}

export default Login;
