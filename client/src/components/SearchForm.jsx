import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SearchForm () {
  return (
    <>
      <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Control type="text" placeholder="Food Item" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
