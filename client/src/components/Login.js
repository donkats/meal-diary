import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { useAppContext } from './context';
import { Redirect } from "react-router-dom";
import "./Login.css";

export default function Login(props) {
  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch(`/users/${email}/${password}`)
      .then((data) => data.json())
      //.then((data) => console.log(data.isAuthenticated))
      .then((data) => userHasAuthenticated({"authentication": data.isAuthenticated, "id": data.id}));
  }
  // const test = true;
  // console.log(isAuthenticated["authentication"]);
  return (
    <div className="Login">
      {!isAuthenticated["authentication"] 
      ? <form onSubmit={handleSubmit}>
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
      : <Redirect to='/dashboard'/>
      }
    </div>
  );
}
