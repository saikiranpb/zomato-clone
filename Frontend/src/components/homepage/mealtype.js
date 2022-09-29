
import React from 'react'
import '../../styles/Header.css'
export default function mealtype(props) {
  return (
    
    
           <div className="row">
               <div className="col-6 px-0 mx-0">
                   <img src={require('../../'+props.item.image)} className="card-img" />
               </div>
               <div className="col-6 px-3 py-3">
                   <div className="card-title">{props.item.name}</div>
                   <div className="card-description">{props.item.content}</div>
               </div>
           </div>
      
 
  )
}

