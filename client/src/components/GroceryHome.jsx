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
    unit: "lbs",
    expiryDate: "",
    imgUrl: ""
  });

  const onSubmit = e => {
    console.log('submitting', items)
    e.preventDefault();
    updateItems([...items, formData]);
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
      <ul className="donation-list">
        {items.length > 0 && <div>Your donations</div>}
        {items.map((item, index) => {
          console.log('queiiywqyueywqueyqieywqueywqeywiey', item)
          return (
            <li key={item.product + index}>
              {index + 1}. {item.product}, Quantity: {item.quantity} {item.unit}, Expiry Date: {item.expiryDate}, Image: <img src={item.imgUrl} style={{height: '5em'}}/>
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
