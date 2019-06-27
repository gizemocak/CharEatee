import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SearchForm () {
 
  return (
    <>
      <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Control type="text" placeholder="Food Item" y />
        </Form.Group>

        <input variant="primary" type="text" className="search-button"/>
      </Form>
    </>
  );
};
