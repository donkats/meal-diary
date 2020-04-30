import React, { useState } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

function Signup(props) {
  const { setAuth } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const [exists, setExists] = useState("");

  function validateForm() {
    return (email.length > 0 && password.length > 0 && height.length > 0 && weight.length > 0 && goal.length > 0);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const obj = {
      email, 
      password, 
      name, 
      height, 
      weight,
      goal
    }

    const fetchObj = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(obj)
    }
    function fetchUsers() {
      console.log('fetch users tried')
      fetch(`/users/${email}/${password}`)
        .then((data) => data.json())
        .then((data) => setAuth({ isAuth: data.isAuthenticated, userId: data.id, goal: data.goal}));
    }
    function createUser(data) {
      console.log('data', data)
      if (data.length === 0) {
        console.log('attempt made');
        fetch('/newusers', fetchObj)
      //.then((data) => data.json())
          
      } else {
        setExists(email);
        console.log(`user with email ${email} already exists`)
      }
    }
    fetch(`usersby/${email}`)
      .then((data) => data.json())
      .then((data) => createUser(data))
      .then(() => fetchUsers());
  }

  return (
    <div className='signup'>
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
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="name">
          <label>Name</label>
          <FormControl
            type="name"
            onChange={e => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="weight">
          <label>Weight (kg)</label>
          <FormControl
            type="number" min="1"
            onChange={e => setWeight(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="height">
          <label>Height (cm)</label>
          <FormControl
            type="number" min="1"
            onChange={e => setHeight(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="goal">
          <label>Daily calorie goal</label>
          <FormControl
            type="number" min="1"
            onChange={e => setGoal(e.target.value)}
          />
        </FormGroup>
        <Button
          block disabled={!validateForm()}
          type="submit">
          Signup
        </Button>
        {exists.length > 0 &&
        <p>
          User with email {exists} allready exists!
        </p>
        }
      </form>
      
    </div>
    );
}

export default Signup;