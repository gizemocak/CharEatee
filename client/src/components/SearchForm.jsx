import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SearchForm () {
  const [list, setList] = useState([]);

  useEffect(() => {
    handleFetchStore()
  },[])

  const handleFetchStore = () => {
    fetch('http://localhost:8080/api/stores', {
      method: 'get',
      headers: {'Content-Type':'application/json'},
     })
     .then(res => res.json())
     .then(res => {
      console.log("res for userjoinproduct", res)

      setList(res)
      }
    )
  }


  return (
    <>
      <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Control type="text" placeholder="Food Item"  />
        </Form.Group>

        
      </Form>
    </>
  );
};
