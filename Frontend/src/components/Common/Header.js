import React, { useState } from "react";
import "../../styles/Home.css";
import Modal from "react-modal";
import Signup from "../Signup/Signup";
import LogIn from "../LogIn/LogIn";

Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "40px",
    border: "0.5px solid gray",
  },
};

export default function Header() {

  const [showlog,setShowlog]=useState(false)
  const [show,setShow]=useState(false)

  return (
    <div className="header">      
      <div className="icon">
        <div className="text">e!</div>
      </div>

      <div className="log">
        <button className="login-p" onClick={() =>  setShowlog(true)}>
          Login
        </button>
        <button className="createAcc-p" onClick={() => setShow(true)}>
          Create an account
        </button>
      </div>

     <LogIn onClose={() => setShowlog(false)} show={showlog}/>

     <Signup onClose={() => setShow(false)} show={show}/>

    </div>
  );
}
