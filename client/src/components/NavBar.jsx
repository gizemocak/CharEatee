import React, {Component} from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/NavBar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faChessQueen } from '@fortawesome/free-solid-svg-icons';
import { TransitionGroup, CSSTransition } from "react-transition-group";


export default class NavBar extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
        <Navbar fixed="top" className="nav">
        <div className="menu"><FontAwesomeIcon icon={ faChessQueen} /></div>
            <Link to="/"><div className="logo">CharEatee</div></Link>
  
          <div className="menu">
            <Link to={'/account'}><FontAwesomeIcon icon={faEllipsisH} className="transition-item list-page"/></Link>
          </div>
        </Navbar>
      );
  }
}
