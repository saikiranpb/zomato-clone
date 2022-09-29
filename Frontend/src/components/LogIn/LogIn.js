import React,{useState} from 'react'
import "../../styles/Home.css";
import Modal from "react-modal";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";


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

 
    const fbCallBack = (response) => {
        console.log(response);
      };

      const [inputval,setInputval]=useState({
        emailId:"",
        password: ""
      })
  

      const getUserArr=localStorage.getItem("zomatoUser")

      const getData = (e) => {
        const {value,name}=e.target;
        setInputval(()=>{
                          return {...inputval,[name]:value}
                        })
      
      };
    
      const addData=(e)=>{
        e.preventDefault();
        console.log(inputval)
        const {emailId,password,}=inputval;
        if(emailId=='') alert("email id is required")
        else if(password=='') alert("enter the password")
        else if(!emailId.includes('@')) alert("please enter valid email address")
        else{
          if(getUserArr && getUserArr.length){
            const userData=JSON.parse(getUserArr);
            const userLogin=userData.filter((item,index)=>{
                return item.emailId===emailId  && item.password===password
            });
            if(userLogin.length===0) alert("invalid details")
            else{
                console.log("user login successful")
               alert(`welcome ${emailId}`)
            }
          }
        }
        }

  return (
    <div>
 <Modal isOpen={props.show} style={customStyles}>
        <div style={{ display: "block" }}>
          <button
            className="ms-5 btn closeBtn"
            onClick={props.onClose}
          >
            &times;
          </button>
        </div>
        <div style={{ display: "block" }}>
          <span className="logIn">Login</span>
        </div>
        <hr />
        <div className="logInForm">
          <form>
            <input style={{width:"270px"}} className="inputCred" name="emailId" onChange={getData} placeholder="Enter email Id"/>
            <br />
            <br />
            <input  style={{width:"270px"}} className="inputCred" type={"password"} name="password" onChange={getData} placeholder="Enter password" autocomplete="off"/>
            <br />
            <br />
            <button className="logButton"  onClick={addData} style={{ marginLeft: "28%",width: "105px",height: "40px" }}>
              Log In
            </button>
          </form>
        </div>

        <hr />
        <div>
          <FacebookLogin
            appId="1501031263686762"
            callback={() => fbCallBack()}
            autoLoad={false}
            fields="name,email,picture"
            cssClass="btnFacebook"
            textButton="&nbsp;&nbsp;Sign In with Facebook"
          />
          <br />
          <GoogleLogin
            clientId="484420574183-81p4c90jtvd1ehp2irn1of95rbfsp8tj.apps.googleusercontent.com"
            buttonText="Continue with Google"
            isSignedIn={true}
            className="btnGoogle"
          ></GoogleLogin>  
        </div>
      </Modal>
    </div>
  )
}
