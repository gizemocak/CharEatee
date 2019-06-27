import React, { useState } from "react";
import NavBar from "./NavBar";
import DonationForm from "./DonationForm";
import UpdateDonationForm from "./UpdateDonationForm";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal'
import Form from "react-bootstrap/Form";

export default function GroceryHome() {
  // Setup state for this page
  const [camera, updateCamera] = useState(true);
  const [items, updateItems] = useState([]);
  const [formData, updateFormData] = useState({
    product: "",
    quantity: 0,
    unit: "lbs",
    expiryDate: "",
    imgUrl: ""
  });

  
  // Handle Bootstrap Modal for editing entries
  const [formItem, handleFormItem] = useState({});
  const [formItemIndex, handleFormItemIndex] = useState(0);

  const [show, updateShow] = useState(false);

  const handleClose = () => {
    updateShow(false);
  }
  
  const setFormItem = e => {
    handleFormItem(e)
  }

  const updateFormItemInItems = () => {
    console.log('formItem', formItem);
    console.log('items', items);

    const currentItems = [...items];
    currentItems[formItemIndex] = formItem;
    updateItems(currentItems);
  }

  const handleShow = (evt) => {
    setFormItem(items.find( e => e.product === evt.target.value))
    handleFormItemIndex(items.findIndex(e => e.product === evt.target.value))
    updateShow(true);
  }

  const handleUpdateFormChange = (value, propertyName) => {
    const newFormItem = {...formItem};
    newFormItem[propertyName] = value;
    handleFormItem(newFormItem);
  }

  const onSubmit = e => {
    const newFormData = { ...formData };
    let found = false;
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
      <th></th>
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
          <td><Button variant="info"  value={item.product} onClick={evt=> handleShow(evt)}>Edit</Button></td>
          </tr>
  );
})}
  </tbody>
</Table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{formItem.product}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <UpdateDonationForm 
                items={items}
                formData={formData}
                onSubmit={onSubmit}
                handleImage={handleImage}
                formItem={formItem}
                handleShow={handleShow}
                handleUpdateFormChange={handleUpdateFormChange}/>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={() => {handleClose(); updateFormItemInItems();}}>
              Save Changes
            </Button>
              </Modal.Footer>
            </Modal>

        </div>}
           

      {/* this button is to make a post request/ to add the donated items in the database. Call handleDonation at onClick and make a fetch request to backend*/}
      <Link to={"/"}>
        <Button variant="outline-success">Donate!</Button>
      </Link>
    </>
  );
}
