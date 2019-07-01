import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./NavBar";
import { TransitionGroup, CSSTransition } from "react-transition-group";
// import "../style/transition.scss";
import "../style/HomeSub.scss"

import styled, { keyframes } from "styled-components";
import {fadeInLeft} from 'react-animations';
const FadeInLeftAnimation = keyframes`${fadeInLeft}`;
const FadeInLeftYDiv = styled.div`
  animation: 2s ${FadeInLeftAnimation};
`;

export default class HomeSub extends Component {
  render() {
    return(
      <div className="body">
        <Navbar />
        <FadeInLeftYDiv>
        <div className="login">
        <Link to={"/login"}>Sign In</Link>
        <hr/>
        if you have alreday signed up
        </div>

        <div className="register">
        <Link to={"/signup"}>Sign Up</Link>
        if you are ready to sign in
        </div>
        </FadeInLeftYDiv>
      </div>
    )
  }
}