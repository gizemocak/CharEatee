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
      <div className="container">
        <Navbar />
        <FadeInLeftYDiv>
        <div className="login">
        <p className="pl"><Link to={"/login"}>Sign In</Link></p>
        <br/>
        <p>if you have alreday signed up</p>
        </div>

        <div className="register">
        <p className="pr"><Link to={"/signup"}>Sign Up</Link></p>
        <br/>
        <p>if you haven't ready to sign in</p>
        </div>
        </FadeInLeftYDiv>
      </div>
    )
  }
}