import React, { Component } from "react";
import Navbar from "./NavBar";
import { Link } from "react-router-dom";
import "../style/Home.scss";
import CarouselView from "./Carousel";
import posed from "react-pose";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";


import styled, { keyframes } from "styled-components";
import { flipInX } from "react-animations";
const FlipInXAnimation = keyframes`${flipInX}`;
const FlipInXDiv = styled.div`
  animation: 2s ${FlipInXAnimation};
`;

const Box = posed.div({
  hoverable: true,
  pressable: true,
  draggable: true,
  init: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)"
  },
  hover: {
    scale: 1.2,
    boxShadow: "0px 5px 10px rgba(0,0,0,0.2)"
  },
  press: {
    scale: 1.1,
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
  }
});
const Slogan1 = () => (
  <Box className="box1">
    <img
      src={require("../docs/1.png")}
      style={{ width: "120px", height: "120px" }}
    />
  </Box>
);
const Slogan2 = () => (
  <Box className="box2">
    <img
      src={require("../docs/2.png")}
      style={{ width: "120px", height: "120px" }}
    />
  </Box>
);
const Slogan3 = () => (
  <Box className="box3">
    <img
      src={require("../docs/3.png")}
      style={{ width: "120px", height: "120px" }}
    />
  </Box>
);
const Slogan4 = () => (
  <Box className="box4">
    <img
      src={require("../docs/4.png")}
      style={{ width: "120px", height: "120px" }}
    />
  </Box>
);
const Slogan5 = () => (
  <Box className="box5">
    <img
      src={require("../docs/5.png")}
      style={{ width: "120px", height: "120px" }}
    />
  </Box>
);

const clear = () => {
  localStorage.clear();
}

let user = JSON.parse(localStorage.getItem("user"));

export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <FlipInXDiv>
          <div className="mainBox">
            <CarouselView />
          </div>
          <div className="slogans">
            <Slogan5 />
            <Slogan4 />
            <Slogan3 />
            <Slogan2 />
            <Slogan1 />
          </div>
          <div className="playAround">
            <span>
              <FontAwesomeIcon icon={faArrowCircleUp} />
            </span>
            <p>Play Around with Me</p>
            
            {!user && 
            <div className="sign">
            <span>
              <FontAwesomeIcon icon={faArrowCircleDown} />
            </span>
            <p><Link to={"/login"}>Sign In</Link> | <Link to={"/signup"}>Sign Up</Link></p>
            </div>}
          </div>

          <footer>
            <span>People live when people give.</span>
          </footer>
        </FlipInXDiv>
      </div>
    );
  }
}
