import React, { useState } from "react";
import NavBar from "./NavBar";
import DonationForm from "./DonationForm";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

export default function GroceryHome() {
  const [camera, updateCamera] = useState(true);
  const [items, updateItems] = useState([]);
  const [formData, updateFormData] = useState({
    product: "",
    quantity: 0,
    unit: "lbs",
    expiryDate: "",
    imgUrl: ""
  });

  const onSubmit = e => {
    const newFormData = { ...formData };
    console.log('submitting', items)
    e.preventDefault();
    updateItems([...items, newFormData]);
  };


  const handleChange = (value, propertyName) => {
    const newFormData = { ...formData };
    newFormData[propertyName] = value;
    console.log('updating', newFormData);
    updateFormData(newFormData);
  };

  const handleImage = (value) => {
    items[items.length - 1].imgUrl = value;
    updateItems([...items]);
  };

  

  // const handleDonation = () => {
  //   fetch('')
  // }

  return (
    <>
      <NavBar camera={camera} />
      <div>Make a donation</div>
      <DonationForm
        items={items}
        formData={formData}
        onSubmit={onSubmit}
        handleChange={handleChange}
        handleImage={handleImage}
      />

        {items.length > 0 && <div>Your donations</div>}
           
            <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>#</th>
      <th>Product</th>
      <th>Quantity</th>
      <th>Unit</th>
      <th>Expiry Date</th>
      <th>Image</th>
    </tr>
  </thead>
  <tbody>
        {items.map((item, index) => {
          return (
    <tr key={item.product + index}>
      <td>{index + 1}</td>
      <td>{item.product}</td>
      <td>{item.quantity}</td>
      <td>{item.unit}</td>
      <td>{item.expiryDate}</td>
      <td><img src={item.imgUrl} style={{height: '5em'}}/></td>
    </tr>
  );
})}
  </tbody>
</Table>

      {/* this button is to make a post request/ to add the donated items in the database. Call handleDonation at onClick and make a fetch request to backend*/}
      <Link to={"/"}>
        <Button variant="outline-success">Donate!</Button>
      </Link>
    </>
  );
}
