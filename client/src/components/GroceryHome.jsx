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
    let found = false;
    console.log('submitting', items)
    e.preventDefault();

    if (formData.product.length === 0 || formData.quantity === 0) {
      if (formData.product.length === 0) {
        alert('Please fill in product you want to donate')
      }
      if (formData.quantity === 0) {
        alert('quantity cannot be 0')
      }
      return;
    }
    items.forEach(i => {
      if (i.product === formData.product) {
        alert('you have same product in your list');
        found = true;
        return;
      }
    })
    if (!found)
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

        {items.length > 0 && 
        <div>
          Your donations
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

        </div>}
           

      {/* this button is to make a post request/ to add the donated items in the database. Call handleDonation at onClick and make a fetch request to backend*/}
      <Link to={"/"}>
        <Button variant="outline-success">Donate!</Button>
      </Link>
    </>
  );
}
