import React from "react";
import Navbar from "./NavBar";

export default function OrderHistory(props) {
  return (
    <>
      <Navbar />
      {JSON.parse(localStorage.getItem("user")).type === "Charity" ? (
        <div>Order History</div>
      ) : (
        <div>My Donations History</div>
      )}
    </>
  );
}
