import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavBar from './NavBar';



export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [items, updateItems] = useState([])
  const [formData, updateFormData] = useState({
    email: "",
    password: ""
  });

  const formSubmit = (e) => {
    console.log("submit")
   e.preventDefault();
   updateItems([...items, formData]);
   console.log(items)
  }

  const handleChange = (e, propertyName) => {
    console.log("e,", e)
    console.log("value",  e.target.value)
    console.log("oroperty name", propertyName)
    console.log("formdata",formData)
    const newFormData = { ...formData };
    newFormData[propertyName] = e.target.value;
    updateFormData(newFormData);
  }

    return (
      <>
      <h1>Login</h1>
      <NavBar/>
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
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
    );
}