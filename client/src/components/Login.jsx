import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavBar from "./NavBar";
import { useStoreActions, useStoreState } from "easy-peasy";
import "../style/Login.scss";
import { Link } from "react-router-dom";

import styled, { keyframes } from "styled-components";
import { rotateInUpLeft } from "react-animations";
const RotateInUpLeftAnimation = keyframes`${rotateInUpLeft}`;
const RotateInUpLeftYDiv = styled.div`
  animation: 2s ${RotateInUpLeftAnimation};
`;

export default function Login(props) {
  const formData = useStoreState(state => state.formData);
  const fetchFormData = useStoreActions(actions => actions.fetchFormData);
  const updateFormData = useStoreActions(actions => actions.updateFormData);

  const [isLoggedIn, setIsloggedIn] = useState({});

  const formSubmit = e => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogin = () => {
    fetchFormData({ formData, endpoint: 'login' }).then(res => {
      setIsloggedIn(res);
      console.log("res", res);
      if (res.type === "Grocer/Restaurant") {
        props.history.push(`/grocery/home/${res.user_id}`);
      } else {
        props.history.push(`/charity/home/${res.user_id}`);
      }
    });
  };

  const handleChange = (e, propertyName) => {
    const newFormData = { ...formData };
    newFormData[propertyName] = e.target.value;
    updateFormData(newFormData);
  };

  console.log(isLoggedIn);
  /*  if(isLoggedIn.type){
    let userType = (JSON.parse(localStorage.getItem('user'))).type
    if(userType === 'Grocer/Restaurant'){
      props.history.push("/grocery/home/:id")
    } else {
      props.history.push("/charity/home/:id")
    }
  } */

  return (
    <div className="loginBox">
      <NavBar />
      <RotateInUpLeftYDiv>

      <h1>Login</h1>
      <p>Click <Link to={"/signup"}>HERE</Link> if you are not a member yet</p>
      <Form onSubmit={formSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        type="email"
        placeholder="Enter email" 
        value={formData.email}
        onChange={e => {
          handleChange(e, 'email')
        }}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
    
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password" 
        value={formData.password}
        onChange={e => {
          handleChange(e, 'password')
        }}
        />
      </Form.Group>
      
      <Button variant="secondary" type="submit" >
        Submit
      </Button>
    </Form>

        <footer className="footLg">
          <span>Incredible donation, incredible you.</span>
        </footer>
      </RotateInUpLeftYDiv>
    </div>
  );
}
