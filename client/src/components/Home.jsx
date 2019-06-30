import React, { Component } from "react";
import Navbar from "./NavBar";
import { Link } from "react-router-dom";
import "../style/Home.scss";


import styled, { keyframes } from "styled-components";
import {flipInY} from 'react-animations';
const FlipInYAnimation = keyframes`${flipInY}`;
const FlipInYDiv = styled.div`
  animation: infinite 5s ${FlipInYAnimation};
`;

export default class Home extends Component {
  render() {
    const { isOpen, onClose, message } = this.props;
    return (
      <div className="App">
        <Navbar />
      
      </div>
    );
  }
}
