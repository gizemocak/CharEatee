import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useStoreActions, useStoreState } from "easy-peasy";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import "../style/SignupForm.scss";
import styled, { keyframes } from "styled-components";
import { fadeInRight } from 'react-animations';

const FadeInRightAnimation = keyframes`${fadeInRight}`;
const FadeInRightYDiv = styled.div`
  animation: 1s ${FadeInRightAnimation};
`;

export default function SignUpForm(props) {
  const formData = useStoreState(state => state.formData);
  const fetchFormData = useStoreActions(actions => actions.fetchFormData);
  const updateFormData = useStoreActions(actions => actions.updateFormData);

  const [registered, setRegistered] = useState({});
  // const [formData, updateFormData] = useState({
  //   type: "",
  //   username: "",
  //   address: "",
  //   email: "",
  //   city: "",
  //   province: "",
  //   postalcode: "",
  //   password: ""
  // });

  useEffect(() => {
    window.scrollTo(0, 0)
  });
  
  const formSubmit = e => {
    e.preventDefault();
    handleRegister();
  };

  const handleRegister = () => {
    fetchFormData({ formData, endpoint: 'register' }).then(res => {
      setRegistered(res);
      if (res.type === "Grocer/Restaurant") {
        props.history.push(`/grocery/home/${res.user_id}`);
      } else {
        props.history.push(`/charity/home/${res.user_id}`);
      }
    });

    // console.log("form data", formData);
    // fetch("http://localhost:8080/api/register", {
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData)
    // }).then(res => {
    //   console.log("response", res);
    //   if (res.type === "Grocer/Restaurant") {
    //     props.history.push(`/grocery/home/${res.user_id}`);
    //   } else {
    //     props.history.push(`/charity/home/${res.user_id}`);
    //   }
    // });
  };

  const handleChange = (e, propertyName) => {
    const newFormData = { ...formData };
    newFormData[propertyName] = e.target.value;
    updateFormData(newFormData);
  };

  return (
    <div className="signupBox">
      <NavBar />
      <FadeInRightYDiv>
        <h1>Register your account</h1>
        <Form onSubmit={formSubmit}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control
              as="select"
              value={formData.type}
              onChange={e => {
                handleChange(e, "type");
              }}
            >
              <option>What type of user are you?</option>
              <option>Grocer/Restaurant</option>
              <option>Charity</option>
            </Form.Control>
          </Form.Group>

          <Form.Control
            type="text"
            placeholder="Your Business Name"
            value={formData.username}
            onChange={e => {
              handleChange(e, "username");
            }}
          />

          <br />

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={formData.address}
              onChange={e => {
                handleChange(e, "address");
              }}
              placeholder="Ex: 1234 Main St"
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                value={formData.city}
                onChange={e => {
                  handleChange(e, "city");
                }}
                placeholder="Toronto"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Province</Form.Label>
              <Form.Control
                as="select"
                value={formData.province}
                onChange={e => {
                  handleChange(e, "province");
                }}
              >
                <option>Choose...</option>
                <option>Alberta</option>
                <option>British Columbia</option>
                <option>Manitoba</option>
                <option>Newfoundland and Labrador</option>
                <option>New Brunswick</option>
                <option>Nova Scotia</option>
                <option>Ontario</option>
                <option>Prince Edward Island</option>
                <option>Quebec</option>
                <option>Saskatchewan</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                value={formData.postalcode}
                onChange={e => {
                  handleChange(e, "postalcode");
                }}
                placeholder="A1A B1B"
              />
            </Form.Group>
          </Form.Row>

          <br />

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={e => {
                handleChange(e, "email");
              }}
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
          </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={formData.password}
              onChange={e => {
                handleChange(e, "password");
              }}
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="info" type="submit">
            Submit
      </Button>
        </Form>
        <br />
        Already had an account?
    <br />
        <Link to={"/login"}>Sign In</Link>

        <footer className="footRg">
          <span>Opening minds, changing lives.</span>
        </footer>
      </FadeInRightYDiv>
    </div>
  );
}
