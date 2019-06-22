import React, { useState } from "react";
import NavBar from "./NavBar";
import DonationForm from "./DonationForm";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function GroceryHome() {
  const [camera, updateCamera] = useState(true);
  const [items, updateItems] = useState([]);
  const [formData, updateFormData] = useState({
    product: "",
    quantity: 0,
    unit: "",
    expiryDate: ""
  });

  const onSubmit = e => {
    e.preventDefault();
    updateItems([...items, formData]);
  };

  const handleChange = (e, propertyName) => {
    const newFormData = { ...formData };
    newFormData[propertyName] = e.target.value;
    updateFormData(newFormData);
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
      />
      <ul className="donation-list">
        {items.length > 0 && <div>Your donations</div>}
        {items.map(item => {
          return (
            <li key={item.product}>
              {item.product} - {item.quantity}
              {item.unit} - {item.expiryDate}
            </li>
          );
        })}
      </ul>
      {/* this button is to make a post request/ to add the donated items in the database. Call handleDonation at onClick and make a fetch request to backend*/}
      <Link to={"/"}>
        <Button variant="outline-success">Donate!</Button>
      </Link>
    </>
  );
}
