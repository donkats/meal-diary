import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  FormGroup,
  FormControl
} from "react-bootstrap";
import { useAppContext } from "./context";
import "./Signup.css";


export default function Signup() {
  // const [fields, handleFieldChange] = useState({
  //   email: "la",
  //   password: "",
  //   username: "",
  //   name: "",
  //   height: "",
  //   diet: "",
  //   dailyGoal: ""
  // });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  //const [username, setUsername] = useState("");
  const [height, setHeight] = useState("");
  const [diet, setDiet] = useState("");
  const [goal, setGoal] = useState("");
  const username = 'test';
  const history = useHistory();
  //const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  //const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 
      // fields.password === fields.confirmPassword
    )
  }

  // function validateConfirmationForm() {
  //   return fields.confirmationCode.length > 0;
  // }

  function handleSubmit(event) {
    event.preventDefault();
    const obj = {
      email, 
      password,
      username, 
      name, 
      height, 
      diet,
      goal
    }
    const fetchObj = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(obj)
    }
    fetch('/newusers', fetchObj)
      .then((data) => data.json())
      .then((data) => console.log(data))

    // fetch(`/users/${email}/${password}`)
    //   .then((data) => data.json())
    //   .then((data) => console.log(data))  
    // setIsLoading(true);

    // setNewUser("test");

    // setIsLoading(false);
  }

  // async function handleConfirmationSubmit(event) {
  //   event.preventDefault();

  //   setIsLoading(true);
  // }

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
          type="submit"

        >
          Signup
        </Button>
      </form>
    </div>
    );
}