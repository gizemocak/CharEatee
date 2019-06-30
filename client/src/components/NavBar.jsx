import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Style/NavBar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faChessQueen } from '@fortawesome/free-solid-svg-icons';


export default function Home() {
    return (
      <Navbar fixed="top" className="nav">
      <div className="menu"><FontAwesomeIcon icon={ faChessQueen} /></div>
          <Link to="/"><div className="logo">CharEatee</div></Link>

        <div className="menu"><FontAwesomeIcon icon={ faEllipsisH} /></div>
          

          {/* <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link> */}
      </Navbar>
    );
}
