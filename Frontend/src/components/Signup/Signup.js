import React, { useState }  from 'react'
import "../../styles/Home.css";
import Modal from "react-modal";

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
export default function (props) {
    if(!props.show){return null}
    
    
    
    const [inputval,setInputval]=useState({
        emailId:"",
        password: "",
        passwordCheck:""
      })
      const [data,setData]=useState([]);

      const getData = (e) => {
        const {value,name}=e.target;
        setInputval(()=>{
                          return {...inputval,[name]:value}
                        })
      
      };
    
      const addData=(e)=>{
        e.preventDefault();
       
        const {emailId,password,passwordCheck}=inputval;
        if(emailId=='') alert("Email id is required")
        else if(password=='') alert("Enter the password")
        else if(!emailId.includes('@')) alert("Please enter valid email address")
        else if(password!==passwordCheck) alert('Please enter the same password')
        else{
          console.log("signup successful")
          localStorage.setItem("zomatoUser",JSON.stringify([...data,inputval]))
        }
        }
        // 
  return ( 
    <div>     
        <Modal isOpen={props.show} style={customStyles}>
        <div>
          <span className="logIn">Create An Account</span>
          <button className="ms-5 btn closeBtn" onClick={props.onClose}>
                &times;
          </button>
        </div>
        <hr />
        <div className="logInForm">
          <form>
            <input placeholder="Enter an email Id" className="inputCred" name="emailId" onChange={getData} style={{width:"270px"}}/>
            <br />
            <br />
            <input placeholder="Enter a password" className="inputCred" type={"password"} name="password" onChange={getData} style={{width:"270px"}} autocomplete="off"/>
            <br />
            <br />
            <input placeholder="Enter password again"  className="inputCred" type={"password"} name="passwordCheck" onChange={getData}  style={{width:"270px"}} autocomplete="off"/>
            <br />
            <br />
            <button className="logButton"  onClick={addData} style={{ marginLeft: "28%",width: "105px",height: "40px" }}>
              Sign Up
            </button>
            <br />
          </form>
          <br />
        </div>
      </Modal>

    </div>
  )
}
