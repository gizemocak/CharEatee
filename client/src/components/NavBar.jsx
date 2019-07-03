import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/NavBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faChessQueen } from "@fortawesome/free-solid-svg-icons";


export default class NavBar extends Component {
   clear = (e) => {
     e.preventDefault();
    localStorage.clear();
  }
  
  render() {
    let user = JSON.parse(localStorage.getItem("user"));
    return (
      <Navbar fixed="top" className="nav">
        <div className="menu">
            <FontAwesomeIcon icon={faChessQueen}/>
        </div>
        <Link to="/">
          <div className="logo">CharEatee</div>
        </Link>

        {user && 
        <div className="menu" onClick={this.clear}>
          <Link to="/">
          Sign out <FontAwesomeIcon icon={faSignOutAlt} />
          </Link>
        </div>}

        {!user && <div className="menu">
          <FontAwesomeIcon icon={faChessQueen} />
        </div>}

      </Navbar>
    );
  }
}
