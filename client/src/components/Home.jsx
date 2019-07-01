import React, { Component } from "react";
import Navbar from "./NavBar";
import { Link } from "react-router-dom";
import "../style/Home.scss";
import CarouselView from "./Carousel";
import posed from 'react-pose';

import styled, { keyframes } from "styled-components";
import {flipInX} from 'react-animations';
const FlipInXAnimation = keyframes`${flipInX}`;
const FlipInXDiv = styled.div`
animation: 3s ${FlipInXAnimation};
`;

const Box = posed.div({
  draggable: true
});
const Slogan1 = () => <Box className="box1" />;
const Slogan2 = () => <Box className="box2" />;
const Slogan3 = () => <Box className="box3" />;
const Slogan4 = () => <Box className="box4" />;

export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <FlipInXDiv>
        <div className="body">
        <CarouselView />
        </div>
      <Slogan1 />
      <Slogan2 />
      <Slogan3 />
      <Slogan4 />
      </ FlipInXDiv>

      </div>
    );
  }
}
