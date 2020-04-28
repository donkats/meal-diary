import React, { useState } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import '../styles/Signup.css';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [diet, setDiet] = useState("");
  const [goal, setGoal] = useState("");
  const username = 'test';

  function validateForm() {
    return (email.length > 0 && password.length > 0);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const obj = {
      email, 
      password,
      username, 
      name, 
      height, 
      diet,
      weight,
      goal
    }

    const fetchObj = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(obj)
    }

    fetch('/newusers', fetchObj)
      .then((data) => data.json())
      .then((data) => console.log(data));
  }

  return (
    <div className='Signup'>
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
          <label>Weight</label>
          <FormControl
            type="weight"
            onChange={e => setWeight(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="height">
          <label>Height</label>
          <FormControl
            type="height"
            onChange={e => setHeight(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="diet">
          <label>Diet</label>
          <FormControl
            type="diet"
            onChange={e => setDiet(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="goal">
          <label>Daily calorie goal</label>
          <FormControl
            type="goal"
            onChange={e => setGoal(e.target.value)}
          />
        </FormGroup>
        <Button
          block disabled={!validateForm()}
          type="submit">
          Signup
        </Button>
      </form>
    </div>
    );
}

export default Signup;