import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from 'axios';
import { NONAME } from "dns";
import uuid from "uuid";

export default class GroceryHome extends Component {

  state = {
    selectedFile: null,
    imagePreviewUrl: null
  }

  fileSelectHandler = event => {
    console.log(event.target.files[0]);
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    // file.name = 'apple';

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
    formData.append('image', this.state.selectedFile, `${this.state.selectedFile.name}-${uuid.v4()}.jpg`)
    axios.post('https://us-central1-chareatee-a86d8.cloudfunctions.net/uploadFile', formData, {
      onUploadProgress: progressEvent => {
        console.log('Upload progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
      }
    })
    .then(res => {
      console.log(res);
    });
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
              rows="3"
              onChange={e => {
                this.props.handleChange(e, "product");
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
                  this.props.handleChange(e, "quantity");
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
                  this.props.handleChange(e, "unit");
                }}
                value={formData.unit}
              >
                <option>lb</option>
                <option>piece</option>
              </Form.Control>
            </Form.Group>
          </div>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Date"
              onChange={e => {
                this.props.handleChange(e, "expiryDate");
              }}
              value={formData.expiryDate}
            />
          </Form.Group>
            <div className="imageUpload">
              <input 
              // style={{display: 'none'}}
              type="file" 
              id="file"
              onChange={this.fileSelectHandler}
              ref={fileInput => this.fileInput = fileInput}
              multiple/>
             <Button style={{backgroundColor: '#F8F9FA', border: 'none'}} onClick={() => this.fileInput.click()}>
               <img src="/images/camera.png" width="50" height="50" />
              </Button>
              <button onClick={this.fileUploadHandler}>Upload images</button>
            </div>
            <Button variant="link" type="file" className="donate-button">
            <img src="/images/add.png" width="60" height="60" />
          </Button>
        </Form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    );
  }
}
