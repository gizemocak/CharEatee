import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel'

export default class CarouselView extends Component {
  render() {
    return(
      <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require("../docs/Discover-hope.jpg")}
      alt="First slide"
    />
    {/* <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption> */}
  </Carousel.Item>
  
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require("../docs/give-charity.jpg")}
      alt="Third slide"
    />

    {/* <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption> */}
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require("../docs/170627-better-grocery-store-main-se-539p_80a9ba9c8d466788799ca27568ee0d43.jpg")}
      alt="Third slide"
    />

    {/* <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption> */}
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={require("../docs/k8a5tqokpaexpktdb9j263jigzm1jmfmpr9vcsmtv1ek94ujifzdwyb2cyjxsspx-.jpg")}
      alt="Third slide"
    />

    {/* <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption> */}
  </Carousel.Item>
</Carousel>
    )
  }
}