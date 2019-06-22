import React, { useState } from "react";
import NavBar from "./NavBar";
import DonationForm from "./DonationForm";

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

  return (
    <>
      <NavBar camera={camera} />
      <div>Donation List</div>
      <DonationForm
        items={items}
        formData={formData}
        onSubmit={onSubmit}
        handleChange={handleChange}
      />
      {items.map(item => {
        return <li key={item.product}>{item.product}</li>;
      })}
    </>
  );
}
