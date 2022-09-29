import React,{useState,useEffect} from 'react'
import Header from '../Common/Header'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import '../../styles/Home.css'
import { useParams } from 'react-router-dom';
import '../../styles/Details.css'
import Modal from 'react-modal'

let t=0;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function RestaurantDetails() {

  const [menuModal,setMenuModal]=useState(false)
  const [restaurant,setRestaurant]=useState({})
  const [menu,setMenu]=useState([])
  const [totalPrice,setTotalPrice]=useState(0)
 
  let {rName}=useParams();
  useEffect(()=>{
    fetch(`https://zomato-sk-edureka.herokuapp.com/restaurant/details/${rName}`,{method:'GET'})
    .then(response=>response.json())
     .then(data=>setRestaurant(data.data[0]))
  },[])


  let fetchMenu= ()=>{
    fetch(`https://zomato-sk-edureka.herokuapp.com/menu/${rName}`,{method:'GET'})
    .then(response=>response.json())
     .then(data=>setMenu(data.data))
  }

let setPrice=(item,t)=>{
  let price=0;
  if(t===0) price=totalPrice+item.itemPrice;
  else if(t==1 && totalPrice>=item.itemPrice)  price=totalPrice-item.itemPrice;
 
  setTotalPrice(price)

}
const loadScript=(rpScript)=>{
 return new Promise((resolve)=>{
    const script=document.createElement("script");
    script.src=rpScript;
    script.onload=()=>{
        resolve(true)
    }
    script.onerror=()=>{
        resolve(false)
    }
    document.body.appendChild(script)
  }
  
 )}
const openRazorpay=async()=>{
 try{

   let orderData;
  
  orderData= await fetch('https://zomato-sk-edureka.herokuapp.com/payment',{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify({amount:totalPrice})
  }).then(response=>response.json())
  console.log(orderData)
   const options={
     key:"rzp_test_gh3YEGlTp3ItUt",
     amount :orderData.amount,
     order_id: orderData.id,
     currency: orderData.currency,
     name:"Zomato",
     prefill:{
      email:"Saikiran07144@gmail.com",
      contact:"+91 92478234"
     },
     handler: function(response){
      console.log(response)
      fetch('https://zomato-sk-edureka.herokuapp.com/payment/save',{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify({
      razorpay_orderid:response.razorpay_order_id,
      razorpay_paymentid:response.razorpay_payment_id,
      razorpay_signature:response.razorpay_signature,
      razorpay_amount:orderData.amount
   })
  }).then(response=>response.json())

     }

   }
     const paymentWindow=new window.Razorpay(options)
     paymentWindow.open()
 }catch(error){
  console.log(error)
 }



}

  

  let{name,thumb,address,cost,Cuisine,contact_number}=restaurant;
  
  if(!contact_number){
    contact_number="not available"
  }
  const CuisineList=!(Cuisine===undefined) && Cuisine.length && <div>{Cuisine.map(item=><div className="cuisineName" key={item.name}>{item.name}.</div>)}</div>

  return (
    <div>
        <Header/>
                
        <div className='details'>
          <div className='tab img'>
            <img src={thumb} width="100%" height="350px"/>
          </div>
          <div className='tab'>
              <h2 className='Rname'>{name}
              <button className='btn btn-danger'style={{float:'right'}} onClick={()=>{fetchMenu(); setMenuModal(true)}}>Place an  Order</button>
              </h2>
          </div>
          <div className='tab'>
              <Tabs>
                      <TabList className='tabName'>
                              <Tab>Overview</Tab>
                              <Tab>Contact</Tab>
                      </TabList>

                      <TabPanel className="tabPanel">
                          <div className="about">About the place</div>
                          <div className="head">Cuisine</div>
                          <div className="value"> {CuisineList}</div>
                          <div className="head">Average Cost</div>
                          <div className="value">&#8377; {cost}</div>
                      </TabPanel>
                      <TabPanel className="tabPanel">
                          <div className="head">Phone Number</div>
                          <div className="value">{contact_number}</div>
                          <div className="head">{name} </div>
                          <div className="value">{address}</div>
                      </TabPanel>
              </Tabs>
          </div> 
        </div>
        <Modal
          isOpen={menuModal}
          style={customStyles}
        > 
          
          <div>
            <h2>Menu
            <button className='btn btn-danger' style={{float:'right'}} onClick={()=>setMenuModal(false)}>X</button>
            </h2>
            <hr/>
            <div style={{fontSize:"14px"}}>
              <ul>
               { menu.length &&
                menu.map((item,index)=>
                                          <li key={index}>
                                          <div className='fw-bold'>
                                           { item.isVeg ? <span className='text-success'>{item.itemName}</span>:<span className='text-danger'>{item.itemName}</span>} 
                                           <button className='btn btn-primary' style={{float:"right"}} onClick={()=>{t=1; setPrice(item,t)}}>-</button>
                                           <span style={{float:"right"}}></span>
                                           <button className='btn btn-primary' style={{float:"right"}} onClick={()=>{t=0; setPrice(item,t)}}>+</button>
                                            </div>
                                          <div className='fw-bold'>&#8377; {item.itemPrice}</div>
                                          <div >{item.itemDescription}</div>
                                             <br/>                                 
                                        </li>)
               }

              </ul>
            </div>
            <hr/>
            <div>
              <h3>Total Price : {totalPrice} 
              <button className='btn btn-danger' style={{float:'right'}} onClick={()=>{setMenuModal(false);loadScript('https://checkout.razorpay.com/v1/checkout.js');openRazorpay()}}>Pay now</button></h3>
            </div>
          </div>
        </Modal>

    </div>
  )
}
