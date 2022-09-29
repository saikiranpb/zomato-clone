import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../../styles/Header.css'
import LogIn from "../LogIn/LogIn";
import Signup from "../Signup/Signup";

export default class Header extends Component {

    constructor(){
        super();
        this.state={
            location:[],
            restaurants:[],
            show:false,
            showSign:false
        }
    }

    fetchRestaurants=(event)=>{
        console.log(event.target.value)
        fetch(`https://zomato-sk-edureka.herokuapp.com/restaurant/${event.target.value}`,{method:'GET'})
        .then(response=>response.json())
        .then(data=>this.setState({restaurants:data.data}))
    }
    componentDidMount(){
        fetch('https://zomato-sk-edureka.herokuapp.com/location',{method:'GET'})
        .then(response=>response.json())
        .then(data=>this.setState({location:data.data}))
    }

  render() {
    console.log(this.state.location)
    const locationList= this.state.location.length && this.state.location.map(item=><option  key={item._id} value={item.city_id}>{item.name}</option>)
    const restaurantList= this.state.restaurants.length && <ul>{
                                                               this.state.restaurants.map(item=>
                                                                                        //   console.log(item.name);
                                                                                        <li key={item.name}>
                                                                                              <Link className='link' style={{textDecoration: 'none'}} to={`/details/${item.name}`}>
                                                                                                 {item.name}
                                                                                              </Link>
                                                                                              </li>
                                                                                         )
                                                               }
                                                          </ul>
    
    return (
        <div>
        <div className="container-fluid back-img">
        <div className="row text-end pt-4 login-signup-row">
            <div className="col-1 col-sm-2 col-md-4 col-lg-5 col-xl-7"></div>                
            <div className="col-4  col-sm-5 col-md-3 col-lg-3 col-xl-2 pe-4 text-end">
                <a className="login" href="#" onClick={() => this.setState({show:true})}>Login</a>
            </div>
            <div className="col-7  col-sm-5 col-md-4 col-lg-4 col-xl-3 text-start">
                <a className="createacc px-2 py-2" href="#" onClick={() => this.setState({showSign:true})}>Create an account</a>
            </div>
        </div>
        <div className="pt-4 row mx-auto text-center logo-row">                
            <div className="col-12">
                <div className="px-4 py-2 px-md-4 py-md-2 logo">e!</div>
            </div>  
        </div>
        <div className="row mx-auto text-center restaurant-title-row">
            <div className="col-12">
                <p className="restaurant-title" >Find the best restaurants, cafés, and bars</p>
            </div>
        </div>
            
        <div className="row pt-4 mx-auto text-center search-bar-row">
            <div className="col-12 col-sm-12 col-md-1 col-lg-2 col-xl-2"></div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-4">
                <div className="locationSelector">
                    <select className="locationDropdown dropdown-toggle px-2 py-3" onChange={this.fetchRestaurants}>
                        <option value="0">Select</option>
                        {locationList}
                    </select>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-5 col-xl-5">
                <div className="restaurantSelector">
                    <input className="restaurantsinput ps-5 py-3" type="text" placeholder="Search for restaurants" />
                   
                    <div className="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search "
                            viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </div>
                 </div>
                 <div id="rList">{restaurantList}</div>
            </div>
            <div className="col-12 col-sm-12 col-md-1 col-lg-2 col-xl-2"></div>
        </div>
    </div>
  
    <LogIn onClose={() => this.setState({show:false})} show={this.state.show}/>
    <Signup onClose={() =>this.setState({showSign:false})} show={this.state.showSign}/>
    </div>       
    )
  }
}


