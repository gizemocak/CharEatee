import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import "../style/NavBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { faChessQueen } from "@fortawesome/free-solid-svg-icons";



export default class NavBar extends Component {
  shouldComponentUpdate() {
    return false;
  }

  handlelogout = (props) => {
    console.log("props", props)
    
      localStorage.clear()
      // props.history.push("/")
  };

  render() {
    let user = JSON.parse(localStorage.getItem("user"));
    // console.log("user in navbar", user)

    if (!user) {
      return (
        <Navbar fixed="top" className="nav">
          <div className="menu">
            <FontAwesomeIcon icon={faChessQueen} />
          </div>
          <Link to="/">
            <div className="logo">CharEatee</div>
          </Link>

          <div className="menu">
            <Link to={"/account"}>
              <FontAwesomeIcon
                icon={faEllipsisH}
                className="transition-item list-page"
              />
            </Link>
          </div>
        </Navbar>
      );
    } else {

      return (

        <Navbar fixed="top" className="nav">
          <div className="menu">
            <FontAwesomeIcon icon={faChessQueen} />
          </div>
          <Link to="/">
            <div className="logo">CharEatee</div>
          </Link>

          <div className="menu">
            <button type="submit" onClick={
              this.handlelogout
            }>
              LOGOUT
            </button>
          </div>
        </Navbar >

      )

    }
  }
}
