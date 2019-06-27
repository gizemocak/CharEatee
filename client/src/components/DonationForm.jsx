import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from 'axios';
import { NONAME } from "dns";
import uuid from "uuid";
import {storage} from '../firebase';

export default class GroceryHome extends Component {

  state = {
    selectedFile: null,
    imagePreviewUrl: null,
    url: null
  }

  fileSelectHandler = event => {
    console.log(event.target.files[0]);
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
    this.setState({
      selectedFile: file,
      imagePreviewUrl: reader.result
    })
  }
  reader.readAsDataURL(file)
  }

  fileUploadHandler = () => {

    const formData = new FormData();
    const {selectedFile} = this.state;
    
    if (!selectedFile) {
      return;
    }
    const name = `${selectedFile.name}-${uuid.v4()}.jpg`;
    const uploadTask = storage.ref(name).put(selectedFile);
    uploadTask.on('state_changed', 
    (snapshot) => {
      //progress function
      console.log(snapshot);
    }, 
    (error) => {
      // error function
      console.log(error);
    }, 
    () => {
      // complete function
      storage.ref(name).getDownloadURL().then(url => {
        console.log(url);
        this.props.handleImage(url)
      })
    })
  }

  render() {
    const { formData } = this.props;
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} style={{height: '7em'}}/>);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="donation-form">
        <Form onSubmit={this.props.onSubmit}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Product</Form.Label>
            <Form.Control
              as="textarea"
              rows="2"
              onChange={e => {
                this.props.handleChange(e.target.value, "product");
              }}
              value={formData.product}
            />
          </Form.Group>

          <div className="donation-quantity">
            <Form.Group className="donation-unit">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantity"
                onChange={e => {
                  this.props.handleChange(e.target.value, "quantity");
                }}
                value={formData.quantity}
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              className="donation-unit"
            >
              <Form.Label>Unit</Form.Label>
              <Form.Control
                as="select"
                onChange={e => {
                  this.props.handleChange(e.target.value, "unit");
                }}
                value={formData.unit}
              >
                <option>lbs</option>
                <option>pieces</option>
              </Form.Control>
            </Form.Group>
          </div>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Date"
              onChange={e => {
                this.props.handleChange(e.target.value, "expiryDate");
              }}
              value={formData.expiryDate}
            />
          </Form.Group>
            <div className="imageUpload">
              <input 
              style={{display: 'none'}}
              type="file" 
              id="file"
              onChange={this.fileSelectHandler}
              ref={fileInput => this.fileInput = fileInput}
              multiple/>
             <Button style={{backgroundColor: '#F8F9FA', border: 'none'}} onClick={() => this.fileInput.click()}>
               <img src="/images/camera.png" width="50" height="50" />
              </Button>
              <Button type="button" onClick={this.fileUploadHandler}>Upload image</Button>
            </div>
            <div style={{float: 'right'}}>
            <Button variant="success" type="submit" className="donate-button" onClick={this.fileUploadHandler}>
              <strong>+</strong>
          </Button>
          </div>
        </Form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    );
  }
}
